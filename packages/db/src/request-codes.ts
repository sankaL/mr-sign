import type { PrismaClient } from "./generated/prisma/client.js";

export type RequestCodeType = "QUOTE" | "ORDER" | "CONTACT";

export const requestCodePrefixByType = {
  QUOTE: "Q",
  ORDER: "O",
  CONTACT: "C",
} as const satisfies Record<RequestCodeType, string>;

export function formatRequestCode(
  type: RequestCodeType,
  year: number,
  sequence: number,
) {
  const prefix = requestCodePrefixByType[type];
  const paddedSequence = sequence.toString().padStart(6, "0");

  return `${prefix}-MSP-${year}-${paddedSequence}`;
}

export async function generateRequestCode(
  prisma: PrismaClient,
  type: RequestCodeType,
  now = new Date(),
) {
  const year = now.getFullYear();

  return prisma.$transaction(async (tx) => {
    const counter = await tx.requestCodeCounter.upsert({
      where: {
        requestType_year: {
          requestType: type,
          year,
        },
      },
      create: {
        requestType: type,
        year,
        lastNumber: 1,
      },
      update: {
        lastNumber: {
          increment: 1,
        },
      },
    });

    return formatRequestCode(type, year, counter.lastNumber);
  });
}
