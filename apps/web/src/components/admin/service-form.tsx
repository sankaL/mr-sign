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
    <form
      action={formAction}
      className="grid gap-5 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6"
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
          Service details
        </p>
        <h2 className="mt-2 text-xl font-black uppercase leading-tight">
          {service ? "Edit service" : "New service"}
        </h2>
      </div>

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
        <label className="flex items-center gap-3 text-sm font-black uppercase tracking-wide">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={service?.isActive ?? true}
            className="h-5 w-5 rounded border-[#151515]/30"
          />
          Active
        </label>
        <label className="flex items-center gap-3 text-sm font-black uppercase tracking-wide">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={service?.isFeatured ?? false}
            className="h-5 w-5 rounded border-[#151515]/30"
          />
          Featured
        </label>
      </div>

      <div className="border-t border-[#151515]/10 pt-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
          Pricing
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
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

      <div className="border-t border-[#151515]/10 pt-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
          SEO
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
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

      {state.message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-black leading-5 ${
            state.status === "success"
              ? "bg-[#CCFF00]/35 text-[#151515]"
              : "bg-[#E51B23]/10 text-[#E51B23]"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1936D4] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35 md:justify-self-start"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
