import { siteContact } from "@mrsign/content";
import { Resend } from "resend";

import { buildBrandedEmailHtml, type EmailDetailRow } from "./email-html";

export type CustomerRequestEmailKind = "quote" | "contact";

export type CustomerRequestEmailInput = {
  kind: CustomerRequestEmailKind;
  requestCode: string;
  submittedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  preferredContactMethod: string | null;
  reasonForContact: string | null;
  selectedServices: string[];
  quantity: number | null;
  desiredCompletionDate: Date | null;
  projectDetails: string;
  artworkStatus: string | null;
  sizeDetails: string | null;
  materialDetails: string | null;
  colorPreferences: string | null;
};

export type CustomerRequestEmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type CustomerRequestEmailResult =
  | { status: "sent"; ids: string[] }
  | { status: "skipped"; reason: string };

type EmailConfig = {
  apiKey: string | undefined;
  fromEmail: string;
  adminNotificationEmail: string;
  siteUrl: string;
};

const defaultFromEmail = "Mr. Sign and Print <no-reply@mrsignandprint.net>";
const defaultAdminEmail = siteContact.email;
const defaultSiteUrl = "http://localhost:3000";

const kindLabel = {
  quote: "quote request",
  contact: "contact message",
} as const satisfies Record<CustomerRequestEmailKind, string>;

const kindTitle = {
  quote: "Quote Request",
  contact: "Contact Message",
} as const satisfies Record<CustomerRequestEmailKind, string>;

function getEmailConfig(): EmailConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL ?? defaultFromEmail,
    adminNotificationEmail:
      process.env.ADMIN_NOTIFICATION_EMAIL ?? defaultAdminEmail,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  };
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(date);
}

function formatDate(date: Date | null) {
  if (!date) return "Not provided";

  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeZone: "America/Toronto",
  }).format(date);
}

function formatOptional(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

function formatArtworkStatus(value: string | null) {
  switch (value) {
    case "WILL_EMAIL_FILES":
      return "Will email files separately";
    case "NEEDS_DESIGN_HELP":
      return "Needs design help";
    case "HAS_ROUGH_IDEA":
      return "Has a rough idea";
    case "NOT_APPLICABLE":
    case null:
      return "Not applicable";
    default:
      return value;
  }
}

function formatPreferredContactMethod(value: string | null) {
  switch (value) {
    case "PHONE":
      return "Phone";
    case "EMAIL":
      return "Email";
    case "EITHER":
      return "Either phone or email";
    case null:
      return "Not provided";
    default:
      return value;
  }
}

function buildDetails(input: CustomerRequestEmailInput): EmailDetailRow[] {
  const baseRows: EmailDetailRow[] = [
    ["Request code", input.requestCode],
    ["Submitted", formatDateTime(input.submittedAt)],
    ["Customer", `${input.firstName} ${input.lastName}`],
    ["Email", input.email],
    ["Phone", formatOptional(input.phone)],
    ["Company", formatOptional(input.companyName)],
    [
      "Preferred contact",
      formatPreferredContactMethod(input.preferredContactMethod),
    ],
  ];

  if (input.kind === "contact") {
    return [
      ...baseRows,
      ["Reason", formatOptional(input.reasonForContact)],
      ["Message", input.projectDetails],
    ];
  }

  return [
    ...baseRows,
    [
      "Selected services",
      input.selectedServices.length > 0
        ? input.selectedServices.join(", ")
        : "Not provided",
    ],
    ["Quantity", formatOptional(input.quantity)],
    ["Desired completion", formatDate(input.desiredCompletionDate)],
    ["Size", formatOptional(input.sizeDetails)],
    ["Material", formatOptional(input.materialDetails)],
    ["Colours", formatOptional(input.colorPreferences)],
    ["Artwork", formatArtworkStatus(input.artworkStatus)],
    ["Project details", input.projectDetails],
  ];
}

function rowsToText(rows: EmailDetailRow[]) {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function buildHtml(title: string, intro: string, rows: EmailDetailRow[]) {
  return buildBrandedEmailHtml({
    title,
    intro,
    badge: "Request received",
    rows,
  });
}

export function buildCustomerRequestEmails(
  input: CustomerRequestEmailInput,
  config: Pick<
    EmailConfig,
    "adminNotificationEmail" | "siteUrl"
  > = getEmailConfig(),
) {
  const rows = buildDetails(input);
  const title = `${kindTitle[input.kind]} ${input.requestCode}`;
  const customerSubject = `We received your ${kindLabel[input.kind]} ${input.requestCode}`;
  const adminSubject = `New ${kindTitle[input.kind]} ${input.requestCode}`;
  const customerIntro = `Thank you for contacting ${siteContact.businessName}. We received your ${kindLabel[input.kind]} and will follow up by phone or email.`;
  const adminIntro = `A new ${kindLabel[input.kind]} was submitted from ${config.siteUrl}.`;

  return {
    customer: {
      to: input.email,
      subject: customerSubject,
      text: `${customerIntro}\n\n${rowsToText(rows)}\n\n${siteContact.businessName}\n${siteContact.phone}\n${siteContact.email}`,
      html: buildHtml(title, customerIntro, rows),
    },
    admin: {
      to: config.adminNotificationEmail,
      subject: adminSubject,
      text: `${adminIntro}\n\n${rowsToText(rows)}`,
      html: buildHtml(title, adminIntro, rows),
      replyTo: input.email,
    },
  } satisfies Record<"customer" | "admin", CustomerRequestEmailMessage>;
}

export async function sendCustomerRequestEmails(
  input: CustomerRequestEmailInput,
): Promise<CustomerRequestEmailResult> {
  const config = getEmailConfig();

  if (!config.apiKey) {
    return { status: "skipped", reason: "RESEND_API_KEY is not configured." };
  }

  const resend = new Resend(config.apiKey);
  const messages = buildCustomerRequestEmails(input, config);
  const emailMessages: CustomerRequestEmailMessage[] = [
    messages.customer,
    messages.admin,
  ];
  const sent = await Promise.all(
    emailMessages.map((message) =>
      resend.emails.send({
        from: config.fromEmail,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        replyTo: message.replyTo,
      }),
    ),
  );

  const errors = sent.flatMap((result) => (result.error ? [result.error] : []));

  if (errors.length > 0) {
    throw new Error(
      `Resend failed to send ${errors.length} customer request email(s).`,
    );
  }

  return {
    status: "sent",
    ids: sent.flatMap((result) => (result.data?.id ? [result.data.id] : [])),
  };
}
