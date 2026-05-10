"use server";

import { headers } from "next/headers";
import { prisma } from "@mrsign/db/src/client";

import { auth } from "@/lib/auth";

export type AdminLoginFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    email?: string;
  };
};

const neutralLoginMessage =
  "If that email belongs to an active admin, a login link has been sent.";
const rateLimitWindowMs = 15 * 60 * 1000;
const maxAttemptsByEmail = 5;
const maxAttemptsByIp = 20;
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function normalizeEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return requestHeaders.get("x-real-ip") ?? "unknown";
}

function incrementRateLimit(key: string, now = Date.now()) {
  const existing = loginAttempts.get(key);

  if (!existing || existing.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return 1;
  }

  existing.count += 1;
  return existing.count;
}

export async function requestAdminLoginLink(
  _previousState: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const email = normalizeEmail(formData.get("email"));

  if (!email || !isValidEmail(email)) {
    return {
      status: "error",
      message: "Enter a valid admin email address.",
      fieldErrors: { email: "Enter a valid email address." },
    };
  }

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);
  const emailAttempts = incrementRateLimit(`email:${email}`);
  const ipAttempts = incrementRateLimit(`ip:${ip}`);

  if (emailAttempts > maxAttemptsByEmail || ipAttempts > maxAttemptsByIp) {
    return { status: "success", message: neutralLoginMessage };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
    select: { isActive: true, name: true },
  });

  if (!admin?.isActive) {
    return { status: "success", message: neutralLoginMessage };
  }

  try {
    await auth.api.signInMagicLink({
      body: {
        email,
        name: admin.name ?? undefined,
        callbackURL: "/admin",
        errorCallbackURL: "/admin/login",
      },
      headers: requestHeaders,
    });
  } catch (error) {
    console.error("Admin magic-link request failed", error);
    return {
      status: "error",
      message: "The login link could not be sent. Please try again.",
    };
  }

  return { status: "success", message: neutralLoginMessage };
}
