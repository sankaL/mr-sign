import { getService } from "@mrsign/content";

import type {
  CustomerRequestFieldErrors,
  CustomerRequestKind,
} from "@/components/forms/customer-request-types";

export type DbRequestType = "QUOTE" | "ORDER" | "CONTACT";
export type PreferredContactMethod = "PHONE" | "EMAIL" | "EITHER";
export type ArtworkStatus =
  | "WILL_EMAIL_FILES"
  | "NEEDS_DESIGN_HELP"
  | "HAS_ROUGH_IDEA"
  | "NOT_APPLICABLE";

export type ParsedServiceRef = {
  categorySlug: "signs" | "printing" | "design";
  serviceSlug: string;
};

export type ParsedCustomerRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  preferredContactMethod: PreferredContactMethod | null;
  reasonForContact: string | null;
  selectedServices: ParsedServiceRef[];
  quantity: number | null;
  desiredCompletionDate: Date | null;
  projectDetails: string;
  artworkStatus: ArtworkStatus;
  sizeDetails: string | null;
  materialDetails: string | null;
  colorPreferences: string | null;
};

export type CustomerRequestValidationResult =
  | {
      ok: true;
      data: ParsedCustomerRequest;
    }
  | {
      ok: false;
      fieldErrors: CustomerRequestFieldErrors;
    };

export const requestTypeByKind = {
  quote: "QUOTE",
  order: "ORDER",
  contact: "CONTACT",
} as const satisfies Record<CustomerRequestKind, DbRequestType>;

export const successMessageByKind = {
  quote: "Your quote request was received.",
  order: "Your order request was received.",
  contact: "Your message was received.",
} as const satisfies Record<CustomerRequestKind, string>;

export const pathByKind = {
  quote: "/request-quote",
  order: "/order-online",
  contact: "/contact",
} as const satisfies Record<CustomerRequestKind, string>;

export const contactReasonOptions = [
  "Question about services",
  "Existing quote",
  "Store hours or location",
  "Other",
] as const;

const validContactMethods = new Set(["PHONE", "EMAIL", "EITHER"]);
const validArtworkStatuses = new Set([
  "WILL_EMAIL_FILES",
  "NEEDS_DESIGN_HELP",
  "HAS_ROUGH_IDEA",
  "NOT_APPLICABLE",
]);
const validContactReasons = new Set<string>(contactReasonOptions);

export function text(formData: FormData, name: string, maxLength = 500) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function optionalText(
  formData: FormData,
  name: string,
  maxLength = 500,
) {
  const value = text(formData, name, maxLength);
  return value.length > 0 ? value : null;
}

export function isHoneypotSubmission(formData: FormData) {
  return Boolean(text(formData, "website", 200));
}

function parsePositiveInteger(value: string) {
  if (!value) {
    return null;
  }

  if (!/^\d+$/.test(value)) {
    return Number.NaN;
  }

  const parsed = Number.parseInt(value, 10);
  return parsed > 0 ? parsed : Number.NaN;
}

function parseDate(value: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return Number.NaN;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parsed >= today ? parsed : Number.NaN;
}

function parsePreferredContactMethod(value: string) {
  return validContactMethods.has(value)
    ? (value as PreferredContactMethod)
    : null;
}

function parseArtworkStatus(value: string) {
  return validArtworkStatuses.has(value)
    ? (value as ArtworkStatus)
    : "NOT_APPLICABLE";
}

function parseServiceRef(value: string): ParsedServiceRef | null {
  const [categorySlug, serviceSlug] = value.split(":");

  if (
    (categorySlug === "signs" ||
      categorySlug === "printing" ||
      categorySlug === "design") &&
    serviceSlug &&
    getService(categorySlug, serviceSlug)
  ) {
    return { categorySlug, serviceSlug };
  }

  return null;
}

function parseSelectedServices(formData: FormData) {
  const selected = formData
    .getAll("services")
    .filter((value): value is string => typeof value === "string")
    .map(parseServiceRef)
    .filter((value): value is ParsedServiceRef => Boolean(value));

  return Array.from(
    new Map(
      selected.map((service) => [
        `${service.categorySlug}:${service.serviceSlug}`,
        service,
      ]),
    ).values(),
  );
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseCustomerRequestForm(
  kind: CustomerRequestKind,
  formData: FormData,
): CustomerRequestValidationResult {
  const firstName = text(formData, "firstName", 120);
  const lastName = text(formData, "lastName", 120);
  const email = text(formData, "email", 200).toLowerCase();
  const phone = optionalText(formData, "phone", 80);
  const companyName = optionalText(formData, "companyName", 160);
  const preferredContactMethod = parsePreferredContactMethod(
    text(formData, "preferredContactMethod", 20),
  );
  const reasonForContact = optionalText(formData, "reasonForContact", 180);
  const selectedServices = parseSelectedServices(formData);
  const quantity = parsePositiveInteger(text(formData, "quantity", 20));
  const desiredCompletionDate = parseDate(
    text(formData, "desiredCompletionDate", 40),
  );
  const projectDetails = text(formData, "projectDetails", 3000);
  const artworkStatus = parseArtworkStatus(text(formData, "artworkStatus", 40));
  const sizeDetails = optionalText(formData, "sizeDetails", 800);
  const materialDetails = optionalText(formData, "materialDetails", 800);
  const colorPreferences = optionalText(formData, "colorPreferences", 800);

  const fieldErrors: CustomerRequestFieldErrors = {};

  if (!firstName) fieldErrors.firstName = "Enter your first name.";
  if (!lastName) fieldErrors.lastName = "Enter your last name.";
  if (!email || !validateEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (preferredContactMethod === "PHONE" && !phone) {
    fieldErrors.phone = "Enter a phone number for phone follow-up.";
  }
  if (!preferredContactMethod) {
    fieldErrors.preferredContactMethod = "Choose a contact method.";
  }
  if ((kind === "quote" || kind === "order") && selectedServices.length === 0) {
    fieldErrors.services = "Choose at least one service.";
  }
  if (
    kind === "contact" &&
    (!reasonForContact || !validContactReasons.has(reasonForContact))
  ) {
    fieldErrors.reasonForContact = "Choose a reason for contact.";
  }
  if (Number.isNaN(quantity)) {
    fieldErrors.quantity = "Enter a positive quantity.";
  }
  if (Number.isNaN(desiredCompletionDate)) {
    fieldErrors.desiredCompletionDate = "Enter today or a future date.";
  }
  if (!projectDetails) {
    fieldErrors.projectDetails =
      kind === "contact" ? "Enter your message." : "Enter the project details.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      preferredContactMethod,
      reasonForContact,
      selectedServices,
      quantity:
        typeof quantity === "number" && !Number.isNaN(quantity)
          ? quantity
          : null,
      desiredCompletionDate:
        desiredCompletionDate instanceof Date ? desiredCompletionDate : null,
      projectDetails,
      artworkStatus,
      sizeDetails,
      materialDetails,
      colorPreferences,
    },
  };
}
