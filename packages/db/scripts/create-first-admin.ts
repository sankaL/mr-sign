import { randomUUID } from "node:crypto";

import { prisma } from "../src/client.js";

function getArgValue(name: string) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));

  return arg?.slice(prefix.length);
}

async function main() {
  const email = getArgValue("email") ?? process.env.FIRST_ADMIN_EMAIL;
  const name = getArgValue("name") ?? process.env.FIRST_ADMIN_NAME ?? "Admin";

  if (!email) {
    throw new Error(
      "First admin email is required. Pass --email=admin@example.com or set FIRST_ADMIN_EMAIL.",
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    create: {
      id: randomUUID(),
      email: normalizedEmail,
      name,
      emailVerified: true,
    },
    update: {
      name,
      emailVerified: true,
    },
  });

  const adminUser = await prisma.adminUser.upsert({
    where: { email: normalizedEmail },
    create: {
      email: normalizedEmail,
      name,
      userId: user.id,
    },
    update: {
      name,
      userId: user.id,
      isActive: true,
    },
  });

  console.info(
    `${existingUser ? "Updated" : "Created"} first admin ${adminUser.email}.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
