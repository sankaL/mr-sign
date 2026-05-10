import type {
  CustomerRequestFieldErrors,
} from "@/components/forms/customer-request-types";

export type AdminRequestFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  requestCode?: string;
  fieldErrors?: CustomerRequestFieldErrors;
};

export type ParsedAdminRequest = {
  requestType: "QUOTE" | "ORDER" | "CONTACT";
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  preferredContactMethod: "PHONE" | "EMAIL" | "EITHER" | null;
  selectedServices: Array<{ categorySlug: string; serviceSlug: string }>;
  quantity: number | null;
  desiredCompletionDate: Date | null;
  projectDetails: string;
  artworkStatus: string;
  sizeDetails: string | null;
  materialDetails: string | null;
  colorPreferences: string | null;
};

export type AdminRequestValidationResult =
  | { ok: true; data: ParsedAdminRequest }
  | { ok: false; fieldErrors: CustomerRequestFieldErrors };

const validContactMethods = new Set(["PHONE", "EMAIL", "EITHER"]);
const validArtworkStatuses = new Set([
  "WILL_EMAIL_FILES",
  "NEEDS_DESIGN_HELP",
  "HAS_ROUGH_IDEA",
  "NOT_APPLICABLE",
]);

function text(formData: FormData, name: string, maxLength = 500) {
  const value = formData.get(name);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function optionalText(formData: FormData, name: string, maxLength = 500) {
  const value = text(formData, name, maxLength);
  return value.length > 0 ? value : null;
}

function parsePositiveInteger(value: string) {
  if (!value) return null;
  if (!/^\d+$/.test(value)) return Number.NaN;
  const parsed = Number.parseInt(value, 10);
  return parsed > 0 ? parsed : Number.NaN;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseAdminRequestForm(
  formData: FormData,
): AdminRequestValidationResult {
  const requestType = text(formData, "requestType", 20);
  const firstName = text(formData, "firstName", 120);
  const lastName = text(formData, "lastName", 120);
  const email = text(formData, "email", 200).toLowerCase();
  const phone = optionalText(formData, "phone", 80);
  const companyName = optionalText(formData, "companyName", 160);
  const preferredContactMethodRaw = text(formData, "preferredContactMethod", 20);
  const preferredContactMethod = validContactMethods.has(preferredContactMethodRaw)
    ? (preferredContactMethodRaw as "PHONE" | "EMAIL" | "EITHER")
    : null;

  const selectedServices = formData
    .getAll("services")
    .filter((value): value is string => typeof value === "string")
    .map((value) => {
      const [categorySlug, serviceSlug] = value.split(":");
      if (categorySlug && serviceSlug) {
        return { categorySlug, serviceSlug };
      }
      return null;
    })
    .filter(
      (value): value is { categorySlug: string; serviceSlug: string } =>
        Boolean(value),
    );

  const quantity = parsePositiveInteger(text(formData, "quantity", 20));
  const desiredCompletionDate = parseDate(
    text(formData, "desiredCompletionDate", 40),
  );
  const projectDetails = text(formData, "projectDetails", 3000);
  const artworkStatusRaw = text(formData, "artworkStatus", 40);
  const artworkStatus = validArtworkStatuses.has(artworkStatusRaw)
    ? artworkStatusRaw
    : "NOT_APPLICABLE";
  const sizeDetails = optionalText(formData, "sizeDetails", 800);
  const materialDetails = optionalText(formData, "materialDetails", 800);
  const colorPreferences = optionalText(formData, "colorPreferences", 800);

  const fieldErrors: CustomerRequestFieldErrors = {};

  const validTypes = new Set(["QUOTE", "ORDER", "CONTACT"]);
  if (!validTypes.has(requestType)) {
    fieldErrors.projectDetails = "Choose a request type.";
  }
  if (!firstName) fieldErrors.firstName = "Enter a first name.";
  if (!lastName) fieldErrors.lastName = "Enter a last name.";
  if (!email || !validateEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (preferredContactMethod === "PHONE" && !phone) {
    fieldErrors.phone = "Enter a phone number for phone follow-up.";
  }
  if (selectedServices.length === 0) {
    fieldErrors.services = "Choose at least one service.";
  }
  if (Number.isNaN(quantity)) {
    fieldErrors.quantity = "Enter a positive quantity.";
  }
  if (!projectDetails) {
    fieldErrors.projectDetails = "Enter the project details.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      requestType: requestType as "QUOTE" | "ORDER" | "CONTACT",
      firstName,
      lastName,
      email,
      phone,
      companyName,
      preferredContactMethod,
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
