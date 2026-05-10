"use client";

import { useActionState } from "react";

import type { ServiceFormState } from "@/app/actions/admin-services";
import {
  TextField,
  TextAreaField,
  SelectField,
} from "@/components/forms/form-field";

type ServiceFormProps = {
  action: (
    previousState: ServiceFormState,
    formData: FormData,
  ) => Promise<ServiceFormState>;
  initialState: ServiceFormState;
  categories: Array<{ id: string; name: string }>;
  service?: {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string | null;
    imagePath: string | null;
    isActive: boolean;
    isFeatured: boolean;
    displayOrder: number;
    metaTitle: string | null;
    metaDescription: string | null;
    pricing: {
      type: string;
      amountCents: number | null;
      currency: string;
      unitLabel: string | null;
      tieredDescription: string | null;
      publicLabel: string | null;
    } | null;
  };
  submitLabel: string;
};

const initialState: ServiceFormState = { status: "idle" };

export function ServiceForm({
  action,
  categories,
  service,
  submitLabel,
}: ServiceFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      {/* Service details section */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">
            {service ? "Edit service" : "New service"}
          </p>
          <p className="admin-card-subtitle">Service details</p>
        </div>
        <div className="admin-card-body grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="categoryId"
              name="categoryId"
              label="Category"
              required
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              defaultValue={service?.categoryId}
              error={state.fieldErrors?.categoryId}
            />
            <TextField
              id="name"
              name="name"
              label="Name"
              required
              defaultValue={service?.name}
              error={state.fieldErrors?.name}
            />
            <TextField
              id="slug"
              name="slug"
              label="Slug"
              helperText="URL-friendly identifier. Auto-generated if empty."
              defaultValue={service?.slug}
              error={state.fieldErrors?.slug}
            />
            <TextField
              id="displayOrder"
              name="displayOrder"
              label="Display order"
              type="number"
              defaultValue={String(service?.displayOrder ?? 0)}
              error={state.fieldErrors?.displayOrder}
            />
          </div>

          <TextAreaField
            id="shortDescription"
            name="shortDescription"
            label="Short description"
            required
            rows={2}
            defaultValue={service?.shortDescription}
            error={state.fieldErrors?.shortDescription}
          />

          <TextAreaField
            id="description"
            name="description"
            label="Full description"
            rows={4}
            defaultValue={service?.description ?? undefined}
            error={state.fieldErrors?.description}
          />

          <TextField
            id="imagePath"
            name="imagePath"
            label="Image path"
            helperText="Relative path to the service image."
            defaultValue={service?.imagePath ?? undefined}
            error={state.fieldErrors?.imagePath}
          />

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={service?.isActive ?? true}
                className="h-4 w-4 rounded border-[#151515]/20"
              />
              Active
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={service?.isFeatured ?? false}
                className="h-4 w-4 rounded border-[#151515]/20"
              />
              Featured
            </label>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">Pricing</p>
          <p className="admin-card-subtitle">
            Configure pricing type and amount
          </p>
        </div>
        <div className="admin-card-body grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="pricingType"
              name="pricingType"
              label="Pricing type"
              required
              options={[
                { value: "EXACT_PRICE", label: "Exact price" },
                { value: "STARTING_FROM", label: "Starting from" },
                { value: "TIERED", label: "Tiered" },
                { value: "REQUEST_QUOTE", label: "Request quote" },
              ]}
              defaultValue={service?.pricing?.type ?? "REQUEST_QUOTE"}
              error={state.fieldErrors?.pricingType}
            />
            <TextField
              id="amountCents"
              name="amountCents"
              label="Amount (cents)"
              type="number"
              helperText="Required for exact price and starting from."
              defaultValue={service?.pricing?.amountCents?.toString() ?? ""}
              error={state.fieldErrors?.amountCents}
            />
            <TextField
              id="unitLabel"
              name="unitLabel"
              label="Unit label"
              helperText="Example: per sq ft, each"
              defaultValue={service?.pricing?.unitLabel ?? undefined}
              error={state.fieldErrors?.unitLabel}
            />
            <TextField
              id="publicLabel"
              name="publicLabel"
              label="Public label"
              helperText="Example: Starting from $75, Request a quote"
              defaultValue={service?.pricing?.publicLabel ?? ""}
              error={state.fieldErrors?.publicLabel}
            />
          </div>
          <TextAreaField
            id="tieredDescription"
            name="tieredDescription"
            label="Tiered description"
            helperText="Used when pricing type is tiered."
            rows={2}
            defaultValue={service?.pricing?.tieredDescription ?? undefined}
            error={state.fieldErrors?.tieredDescription}
          />
          <input
            type="hidden"
            name="currency"
            value={service?.pricing?.currency ?? "CAD"}
          />
        </div>
      </div>

      {/* SEO section */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">SEO</p>
          <p className="admin-card-subtitle">
            Search engine metadata
          </p>
        </div>
        <div className="admin-card-body grid gap-4 md:grid-cols-2">
          <TextField
            id="metaTitle"
            name="metaTitle"
            label="Meta title"
            defaultValue={service?.metaTitle ?? undefined}
            error={state.fieldErrors?.metaTitle}
          />
          <TextField
            id="metaDescription"
            name="metaDescription"
            label="Meta description"
            defaultValue={service?.metaDescription ?? undefined}
            error={state.fieldErrors?.metaDescription}
          />
        </div>
      </div>

      {/* Submit */}
      {state.message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-700"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40 md:justify-self-start"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
