const validPricingTypes = new Set([
  "EXACT_PRICE",
  "STARTING_FROM",
  "TIERED",
  "REQUEST_QUOTE",
]);

export type ServiceInput = {
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string | null;
  imagePath: string | null;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  isFeatured: boolean;
  displayOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
};

export type PricingInput = {
  type: "EXACT_PRICE" | "STARTING_FROM" | "TIERED" | "REQUEST_QUOTE";
  amountCents: number | null;
  currency: string;
  unitLabel: string | null;
  tieredDescription: string | null;
  publicLabel: string;
};

export type ServiceValidationResult =
  | { ok: true; data: ServiceInput; pricing: PricingInput }
  | { ok: false; fieldErrors: Record<string, string>; message: string };

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function validateServiceInput(
  formData: FormData,
): ServiceValidationResult {
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || slugify(name);
  const shortDescription = String(
    formData.get("shortDescription") ?? "",
  ).trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const imagePath = String(formData.get("imagePath") ?? "").trim() || null;
  const statusRaw = String(formData.get("status") ?? "DRAFT").trim();
  const validStatuses = new Set(["DRAFT", "ACTIVE", "INACTIVE"]);
  const status = validStatuses.has(statusRaw)
    ? (statusRaw as ServiceInput["status"])
    : "DRAFT";
  const isFeatured = formData.get("isFeatured") === "on";
  const displayOrder = Number.parseInt(
    String(formData.get("displayOrder") ?? "0"),
    10,
  );
  const metaTitle = String(formData.get("metaTitle") ?? "").trim() || null;
  const metaDescription =
    String(formData.get("metaDescription") ?? "").trim() || null;

  const pricingType = String(formData.get("pricingType") ?? "").trim();
  const amountCentsRaw = String(formData.get("amountCents") ?? "").trim();
  const currency = String(formData.get("currency") ?? "CAD").trim();
  const unitLabel = String(formData.get("unitLabel") ?? "").trim() || null;
  const tieredDescription =
    String(formData.get("tieredDescription") ?? "").trim() || null;
  const publicLabel = String(formData.get("publicLabel") ?? "").trim();

  const fieldErrors: Record<string, string> = {};

  if (!categoryId) fieldErrors.categoryId = "Choose a category.";
  if (!name) fieldErrors.name = "Enter a service name.";
  if (name.length > 120)
    fieldErrors.name = "Name must be 120 characters or less.";
  if (!slug) fieldErrors.slug = "Enter a URL slug.";
  if (slug.length > 80)
    fieldErrors.slug = "Slug must be 80 characters or less.";
  if (!shortDescription)
    fieldErrors.shortDescription = "Enter a short description.";
  if (shortDescription.length > 500)
    fieldErrors.shortDescription =
      "Short description must be 500 characters or less.";
  if (description && description.length > 5000)
    fieldErrors.description = "Description must be 5000 characters or less.";
  if (Number.isNaN(displayOrder))
    fieldErrors.displayOrder = "Display order must be a number.";
  if (metaTitle && metaTitle.length > 120)
    fieldErrors.metaTitle = "Meta title must be 120 characters or less.";
  if (metaDescription && metaDescription.length > 500)
    fieldErrors.metaDescription =
      "Meta description must be 500 characters or less.";

  if (!validPricingTypes.has(pricingType))
    fieldErrors.pricingType = "Choose a valid pricing type.";

  let amountCents: number | null = null;
  if (amountCentsRaw) {
    const parsed = Number.parseInt(amountCentsRaw, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      fieldErrors.amountCents = "Amount must be a positive number (in cents).";
    } else {
      amountCents = parsed;
    }
  }

  if (
    (pricingType === "EXACT_PRICE" || pricingType === "STARTING_FROM") &&
    amountCents === null
  ) {
    fieldErrors.amountCents = "Enter an amount for this pricing type.";
  }

  if (!publicLabel) fieldErrors.publicLabel = "Enter a public pricing label.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
      message: "Check the highlighted fields and try again.",
    };
  }

  return {
    ok: true,
    data: {
      categoryId,
      name,
      slug,
      shortDescription,
      description,
      imagePath,
      status,
      isFeatured,
      displayOrder,
      metaTitle,
      metaDescription,
    },
    pricing: {
      type: pricingType as PricingInput["type"],
      amountCents,
      currency: currency || "CAD",
      unitLabel,
      tieredDescription,
      publicLabel,
    },
  };
}

export type ServiceDraftValidationResult =
  | { ok: true; data: ServiceInput; pricing: PricingInput }
  | { ok: false; fieldErrors: Record<string, string>; message: string };

export function validateServiceDraftInput(
  formData: FormData,
): ServiceDraftValidationResult {
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || slugify(name);
  const shortDescription = String(
    formData.get("shortDescription") ?? "",
  ).trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const imagePath = String(formData.get("imagePath") ?? "").trim() || null;
  const isFeatured = formData.get("isFeatured") === "on";
  const displayOrder = Number.parseInt(
    String(formData.get("displayOrder") ?? "0"),
    10,
  );
  const metaTitle = String(formData.get("metaTitle") ?? "").trim() || null;
  const metaDescription =
    String(formData.get("metaDescription") ?? "").trim() || null;

  const pricingType = String(formData.get("pricingType") ?? "REQUEST_QUOTE").trim();
  const amountCentsRaw = String(formData.get("amountCents") ?? "").trim();
  const currency = String(formData.get("currency") ?? "CAD").trim();
  const unitLabel = String(formData.get("unitLabel") ?? "").trim() || null;
  const tieredDescription =
    String(formData.get("tieredDescription") ?? "").trim() || null;
  const publicLabel = String(formData.get("publicLabel") ?? "").trim();

  const fieldErrors: Record<string, string> = {};

  if (!categoryId) fieldErrors.categoryId = "Choose a category.";
  if (!name) fieldErrors.name = "Enter a service name.";

  let amountCents: number | null = null;
  if (amountCentsRaw) {
    const parsed = Number.parseInt(amountCentsRaw, 10);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      amountCents = parsed;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
      message: "Check the highlighted fields and try again.",
    };
  }

  return {
    ok: true,
    data: {
      categoryId,
      name,
      slug,
      shortDescription: shortDescription || name,
      description,
      imagePath,
      status: "DRAFT",
      isFeatured,
      displayOrder: Number.isNaN(displayOrder) ? 0 : displayOrder,
      metaTitle,
      metaDescription,
    },
    pricing: {
      type: (validPricingTypes.has(pricingType)
        ? pricingType
        : "REQUEST_QUOTE") as PricingInput["type"],
      amountCents,
      currency: currency || "CAD",
      unitLabel,
      tieredDescription,
      publicLabel: publicLabel || "Request a quote",
    },
  };
}
