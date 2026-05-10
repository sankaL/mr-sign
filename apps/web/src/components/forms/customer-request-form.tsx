"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useActionState } from "react";

import { submitCustomerRequest } from "@/app/actions/customer-requests";

import type {
  CustomerRequestDefaults,
  CustomerRequestFormState,
  CustomerRequestKind,
  ServiceSelectGroup,
} from "./customer-request-types";
import { SelectField, TextAreaField, TextField } from "./form-field";

type CustomerRequestFormProps = {
  kind: CustomerRequestKind;
  serviceGroups: ServiceSelectGroup[];
  defaults?: CustomerRequestDefaults;
};

const initialState: CustomerRequestFormState = {
  status: "idle",
};

const headingByKind = {
  quote: "Quote details",
  order: "Order request",
  contact: "Contact message",
} as const satisfies Record<CustomerRequestKind, string>;

const detailsLabelByKind = {
  quote: "Project details",
  order: "Order details",
  contact: "Message",
} as const satisfies Record<CustomerRequestKind, string>;

const detailsPlaceholderByKind = {
  quote:
    "Tell us the size, quantity, material, deadline, and anything else we should know.",
  order:
    "Tell us what you need produced, known specs, deadline, and any production notes.",
  contact: "How can the shop help?",
} as const satisfies Record<CustomerRequestKind, string>;

const contactMethods = [
  { label: "Phone", value: "PHONE" },
  { label: "Email", value: "EMAIL" },
  { label: "Either", value: "EITHER" },
];

const contactReasons = [
  { label: "Question about services", value: "Question about services" },
  { label: "Existing quote", value: "Existing quote" },
  { label: "Store hours or location", value: "Store hours or location" },
  { label: "Other", value: "Other" },
];

const artworkStatuses = [
  { label: "I will email files separately", value: "WILL_EMAIL_FILES" },
  { label: "I need design help", value: "NEEDS_DESIGN_HELP" },
  { label: "I have a rough idea", value: "HAS_ROUGH_IDEA" },
  { label: "Not applicable", value: "NOT_APPLICABLE" },
];

function SubmitButton({
  kind,
  isPending,
}: {
  kind: CustomerRequestKind;
  isPending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      aria-disabled={isPending}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E51B23] px-6 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#151515]/35 disabled:text-white disabled:hover:bg-[#151515]/35"
    >
      {isPending
        ? "Submitting..."
        : kind === "contact"
          ? "Send message"
          : "Submit request"}
      <Send className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}

function Confirmation({ state }: { state: CustomerRequestFormState }) {
  return (
    <div className="rounded-[1.75rem] border border-[#151515]/10 bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <div>
          <h2 className="text-xl font-black uppercase leading-tight">
            {state.message}
          </h2>
          {state.requestCode && state.requestCode !== "Received" ? (
            <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/68">
              Your request code is{" "}
              <span className="font-black text-[#1936D4]">
                {state.requestCode}
              </span>
              . The shop will follow up by phone or email.
            </p>
          ) : (
            <p className="mt-3 text-sm font-semibold leading-6 text-[#151515]/68">
              The shop will follow up by phone or email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function CustomerRequestForm({
  kind,
  serviceGroups,
  defaults,
}: CustomerRequestFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitCustomerRequest.bind(null, kind),
    initialState,
  );
  const errors = state.fieldErrors ?? {};
  const includeProjectFields = kind === "quote" || kind === "order";
  const defaultService = defaults?.service ?? "";

  if (state.status === "success") {
    return <Confirmation state={state} />;
  }

  return (
    <form action={formAction} className="grid gap-6">
      <div className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
            Contact information
          </p>
          <h2 className="mt-2 text-xl font-black uppercase leading-tight">
            How should we reach you?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id={`${kind}-first-name`}
            name="firstName"
            label="First name"
            autoComplete="given-name"
            error={errors.firstName}
            required
          />
          <TextField
            id={`${kind}-last-name`}
            name="lastName"
            label="Last name"
            autoComplete="family-name"
            error={errors.lastName}
            required
          />
          <TextField
            id={`${kind}-email`}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            required
          />
          <TextField
            id={`${kind}-phone`}
            name="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone}
          />
          <TextField
            id={`${kind}-company`}
            name="companyName"
            label="Company"
            autoComplete="organization"
          />
          <SelectField
            id={`${kind}-preferred-contact`}
            name="preferredContactMethod"
            label="Preferred contact"
            options={contactMethods}
            placeholder="Choose one"
            defaultValue="EITHER"
            error={errors.preferredContactMethod}
            required
          />
        </div>
      </div>

      {includeProjectFields ? (
        <div className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#E51B23]">
              {headingByKind[kind]}
            </p>
            <h2 className="mt-2 text-xl font-black uppercase leading-tight">
              Select services and project specs
            </h2>
          </div>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-black uppercase tracking-wide">
              Services
            </legend>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceGroups.map((group) => (
                <div key={group.label} className="grid content-start gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
                    {group.label}
                  </p>
                  {group.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 items-center gap-3 rounded-xl border border-[#151515]/10 px-3 py-2 text-sm font-bold transition-colors hover:border-[#1936D4]"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={option.value}
                        defaultChecked={option.value === defaultService}
                        className="h-4 w-4 accent-[#1936D4]"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              ))}
            </div>
            {errors.services ? (
              <p className="text-xs font-black leading-5 text-[#E51B23]">
                {errors.services}
              </p>
            ) : null}
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id={`${kind}-quantity`}
              name="quantity"
              label="Quantity"
              type="number"
              min="1"
              inputMode="numeric"
              error={errors.quantity}
            />
            <TextField
              id={`${kind}-date`}
              name="desiredCompletionDate"
              label="Desired date"
              type="date"
              error={errors.desiredCompletionDate}
            />
            <TextField
              id={`${kind}-size`}
              name="sizeDetails"
              label="Size"
              placeholder="Dimensions, format, or finished size"
            />
            <TextField
              id={`${kind}-material`}
              name="materialDetails"
              label="Material"
              placeholder="Vinyl, coroplast, paper stock, acrylic..."
            />
            <TextField
              id={`${kind}-colour`}
              name="colorPreferences"
              label="Colour"
              placeholder="Full colour, black and white, brand colours..."
            />
            <SelectField
              id={`${kind}-artwork`}
              name="artworkStatus"
              label="Artwork"
              options={artworkStatuses}
              defaultValue="NOT_APPLICABLE"
              helperText="No file upload is included. Email artwork separately if needed."
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6">
          <SelectField
            id="contact-reason"
            name="reasonForContact"
            label="Reason"
            options={contactReasons}
            placeholder="Choose one"
            error={errors.reasonForContact}
            required
          />
        </div>
      )}

      <div className="grid gap-4 rounded-[1.75rem] border border-[#151515]/10 bg-white p-5 md:p-6">
        <TextAreaField
          id={`${kind}-project-details`}
          name="projectDetails"
          label={detailsLabelByKind[kind]}
          placeholder={detailsPlaceholderByKind[kind]}
          helperText="No online payment, checkout, account, or file upload is part of this MVP."
          error={errors.projectDetails}
          required
        />

        <div
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={`${kind}-website`}>Website</label>
          <input
            id={`${kind}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {state.status === "error" && state.message ? (
          <p
            className="rounded-xl bg-[#E51B23]/10 px-4 py-3 text-sm font-black leading-5 text-[#E51B23]"
            role="alert"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold leading-5 text-[#151515]/55">
            The shop reviews your request and follows up directly.
          </p>
          <SubmitButton kind={kind} isPending={isPending} />
        </div>
      </div>
    </form>
  );
}
