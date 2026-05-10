"use client";

import { CheckCircle2, Loader2, Plus, Search } from "lucide-react";
import { useActionState, useMemo, useState } from "react";

import { createAdminRequest } from "@/app/actions/admin-requests";
import type { AdminRequestFormState } from "@/app/actions/admin-request-validation";

import { SelectField, TextAreaField, TextField } from "../forms/form-field";
import type { ServiceSelectGroup } from "../forms/customer-request-types";

type AdminRequestFormProps = {
  serviceGroups: ServiceSelectGroup[];
};

const initialState: AdminRequestFormState = {
  status: "idle",
};

const requestTypes = [
  { label: "Quote", value: "QUOTE" },
  { label: "Order", value: "ORDER" },
  { label: "Contact", value: "CONTACT" },
];

const contactMethods = [
  { label: "Phone", value: "PHONE" },
  { label: "Email", value: "EMAIL" },
  { label: "Either", value: "EITHER" },
];

const artworkStatuses = [
  { label: "Will email files", value: "WILL_EMAIL_FILES" },
  { label: "Needs design help", value: "NEEDS_DESIGN_HELP" },
  { label: "Has rough idea", value: "HAS_ROUGH_IDEA" },
  { label: "Not applicable", value: "NOT_APPLICABLE" },
];

function Confirmation({ state }: { state: AdminRequestFormState }) {
  return (
    <div className="admin-card">
      <div className="admin-card-body flex items-start gap-4 py-6">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <div>
          <p className="text-sm font-bold text-[#151515]">{state.message}</p>
          {state.requestCode ? (
            <p className="mt-1 text-xs text-[#151515]/55">
              Request code{" "}
              <span className="font-bold text-[#151515]">
                {state.requestCode}
              </span>{" "}
              has been created.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function AdminRequestForm({ serviceGroups }: AdminRequestFormProps) {
  const [state, formAction, isPending] = useActionState(
    createAdminRequest,
    initialState,
  );
  const errors = state.fieldErrors ?? {};
  const [serviceSearch, setServiceSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!serviceSearch.trim()) return serviceGroups;
    const q = serviceSearch.toLowerCase();
    return serviceGroups
      .map((group) => ({
        ...group,
        options: group.options.filter((o) =>
          o.label.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.options.length > 0);
  }, [serviceGroups, serviceSearch]);

  if (state.status === "success") {
    return <Confirmation state={state} />;
  }

  return (
    <form action={formAction} className="grid gap-5">
      {/* Request type */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">Request type</p>
          <p className="admin-card-subtitle">
            Select the type of request to create
          </p>
        </div>
        <div className="admin-card-body">
          <div className="grid gap-3 sm:grid-cols-3">
            {requestTypes.map((type) => (
              <label
                key={type.value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[#151515]/10 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[#3b82f6] has-[:checked]:border-[#3b82f6] has-[:checked]:bg-[#3b82f6]/5 has-[:checked]:text-[#3b82f6]"
              >
                <input
                  type="radio"
                  name="requestType"
                  value={type.value}
                  defaultChecked={type.value === "QUOTE"}
                  className="sr-only"
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">Contact information</p>
          <p className="admin-card-subtitle">Customer contact details</p>
        </div>
        <div className="admin-card-body grid gap-4 md:grid-cols-2">
          <TextField
            id="admin-first-name"
            name="firstName"
            label="First name"
            autoComplete="given-name"
            error={errors.firstName}
            required
          />
          <TextField
            id="admin-last-name"
            name="lastName"
            label="Last name"
            autoComplete="family-name"
            error={errors.lastName}
            required
          />
          <TextField
            id="admin-email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            required
          />
          <TextField
            id="admin-phone"
            name="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone}
          />
          <TextField
            id="admin-company"
            name="companyName"
            label="Company"
            autoComplete="organization"
          />
          <SelectField
            id="admin-preferred-contact"
            name="preferredContactMethod"
            label="Preferred contact"
            options={contactMethods}
            placeholder="Choose one"
            defaultValue="EITHER"
            error={errors.preferredContactMethod}
          />
        </div>
      </div>

      {/* Services */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">Services</p>
          <p className="admin-card-subtitle">
            Select one or more services for this request
          </p>
        </div>
        <div className="admin-card-body grid gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151515]/35"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search services..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-[#151515]/10 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10"
            />
          </div>

          <div className="max-h-64 overflow-y-auto rounded-lg border border-[#151515]/6">
            {filteredGroups.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-[#151515]/40">
                No services match your search.
              </p>
            ) : (
              filteredGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && (
                    <div className="border-t border-[#151515]/6" />
                  )}
                  <p className="sticky top-0 z-10 bg-[#f9fafb] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#151515]/40">
                    {group.label}
                  </p>
                  {group.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-9 cursor-pointer items-center gap-3 px-3 py-1.5 text-sm transition-colors hover:bg-[#3b82f6]/5"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={option.value}
                        className="h-3.5 w-3.5 rounded border-[#151515]/20 accent-[#3b82f6]"
                      />
                      <span className="font-medium text-[#151515]/80">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              ))
            )}
          </div>
          {errors.services ? (
            <p className="text-xs font-semibold text-red-600" aria-live="polite">
              {errors.services}
            </p>
          ) : null}
        </div>
      </div>

      {/* Project details */}
      <div className="admin-card">
        <div className="admin-card-header">
          <p className="admin-card-title">Project details</p>
          <p className="admin-card-subtitle">Specifications and notes</p>
        </div>
        <div className="admin-card-body grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="admin-quantity"
              name="quantity"
              label="Quantity"
              type="number"
              min="1"
              inputMode="numeric"
              error={errors.quantity}
            />
            <TextField
              id="admin-date"
              name="desiredCompletionDate"
              label="Desired date"
              type="date"
              error={errors.desiredCompletionDate}
            />
            <TextField
              id="admin-size"
              name="sizeDetails"
              label="Size"
              placeholder="Dimensions, format, or finished size"
            />
            <TextField
              id="admin-material"
              name="materialDetails"
              label="Material"
              placeholder="Vinyl, coroplast, paper stock, acrylic"
            />
            <TextField
              id="admin-colour"
              name="colorPreferences"
              label="Colour"
              placeholder="Full colour, B&W, brand colours"
            />
            <SelectField
              id="admin-artwork"
              name="artworkStatus"
              label="Artwork"
              options={artworkStatuses}
              defaultValue="NOT_APPLICABLE"
            />
          </div>
          <TextAreaField
            id="admin-project-details"
            name="projectDetails"
            label="Project details"
            placeholder="Describe the request, known specs, deadline, and any production notes."
            error={errors.projectDetails}
            required
          />

          {state.status === "error" && state.message ? (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
              role="alert"
            >
              {state.message}
            </p>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <Plus className="h-4 w-4" strokeWidth={2} />
              )}
              {isPending ? "Creating..." : "Create request"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
