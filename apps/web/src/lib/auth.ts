import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@mrsign/db/src/client";
import { sendAdminLoginEmail } from "@mrsign/email";

const fourteenDaysInSeconds = 60 * 60 * 24 * 14;
const fifteenMinutesInSeconds = 60 * 15;

function getAuthBaseUrl() {
  return (
    process.env.BETTER_AUTH_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

async function isActiveAdminEmail(email: string) {
  const admin = await prisma.adminUser.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { isActive: true },
  });

  return admin?.isActive === true;
}

export const auth = betterAuth({
  baseURL: getAuthBaseUrl(),
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: fourteenDaysInSeconds,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 5,
  },
  plugins: [
    magicLink({
      disableSignUp: true,
      expiresIn: fifteenMinutesInSeconds,
      storeToken: "hashed",
      sendMagicLink: async ({ email, url }) => {
        if (!(await isActiveAdminEmail(email))) {
          return;
        }

        await sendAdminLoginEmail({ email, url });
      },
    }),
    nextCookies(),
  ],
});

export type AuthSession = typeof auth.$Infer.Session;
