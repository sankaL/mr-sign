import { siteContact } from "@mrsign/content";
import { Resend } from "resend";

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
  const html = `<!doctype html><html><body style="margin:0;background:#f8fafc;color:#111827;font-family:Arial,sans-serif"><div style="max-width:620px;margin:0 auto;padding:28px"><div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px"><p style="margin:0 0 8px;color:#1d4ed8;font-weight:700">${escapeHtml(siteContact.businessName)}</p><h1 style="margin:0 0 16px;font-size:24px;line-height:1.2">Admin Login Link</h1><p style="margin:0 0 20px;line-height:1.6">Use this secure link to sign in to the admin portal. It expires soon and can only be used once.</p><p style="margin:0 0 20px"><a href="${escapeHtml(input.url)}" style="display:inline-block;background:#E51B23;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.04em">Sign in to admin</a></p><p style="margin:0;color:#4b5563;font-size:13px;line-height:1.5;word-break:break-all">If the button does not work, paste this URL into your browser:<br>${escapeHtml(input.url)}</p></div></div></body></html>`;

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
