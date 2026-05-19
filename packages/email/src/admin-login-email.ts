import { Resend } from "resend";

import { buildBrandedEmailHtml } from "./email-html";

export type AdminLoginEmailInput = {
  email: string;
  url: string;
};

export type AdminLoginEmailResult =
  | { status: "sent"; id: string | null }
  | { status: "logged"; reason: string };

type EmailConfig = {
  apiKey: string | undefined;
  fromEmail: string;
};

const defaultFromEmail = "Mr. Sign and Print <no-reply@mrsignandprint.net>";

function getEmailConfig(): EmailConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL ?? defaultFromEmail,
  };
}

export function buildAdminLoginEmail(input: AdminLoginEmailInput) {
  const subject = "Your Mr. Sign and Print admin login link";
  const text = [
    "Use this secure link to sign in to the Mr. Sign and Print admin portal:",
    "",
    input.url,
    "",
    "This link expires soon and can only be used once. If you did not request it, ignore this email.",
  ].join("\n");
  const html = buildBrandedEmailHtml({
    title: "Admin Login Link",
    intro:
      "Use this secure link to sign in to the admin portal. It expires soon and can only be used once.",
    badge: "Secure access",
    cta: {
      label: "Sign in to admin",
      href: input.url,
    },
    note: `If the button does not work, paste this URL into your browser: ${input.url}`,
  });

  return {
    to: input.email,
    subject,
    text,
    html,
  };
}

export async function sendAdminLoginEmail(
  input: AdminLoginEmailInput,
): Promise<AdminLoginEmailResult> {
  const config = getEmailConfig();
  const message = buildAdminLoginEmail(input);

  if (!config.apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`Admin login link for ${input.email}: ${input.url}`);
      return { status: "logged", reason: "RESEND_API_KEY is not configured." };
    }

    throw new Error("RESEND_API_KEY is required to send admin login links.");
  }

  const resend = new Resend(config.apiKey);
  const result = await resend.emails.send({
    from: config.fromEmail,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  if (result.error) {
    throw new Error(
      `Resend failed to send the admin login email: ${result.error.message}`,
    );
  }

  return { status: "sent", id: result.data?.id ?? null };
}
