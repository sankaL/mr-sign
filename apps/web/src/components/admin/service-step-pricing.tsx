"use client";

import {
  TextField,
  TextAreaField,
  SelectField,
} from "@/components/forms/form-field";

export type PricingData = {
  pricingType: string;
  amountCents: string;
  unitLabel: string;
  publicLabel: string;
  tieredDescription: string;
  currency: string;
};

type ServiceStepPricingProps = {
  data: PricingData;
  errors: Record<string, string>;
  onChange: (field: keyof PricingData, value: string) => void;
};

export const defaultPricingData: PricingData = {
  pricingType: "REQUEST_QUOTE",
  amountCents: "",
  unitLabel: "",
  publicLabel: "",
  tieredDescription: "",
  currency: "CAD",
};

export function ServiceStepPricing({
  data,
  errors,
  onChange,
}: ServiceStepPricingProps) {
  return (
    <div className="service-step-content">
      <div className="service-step-header">
        <p className="service-step-eyebrow">Step 2</p>
        <h2 className="service-step-title">Pricing</h2>
        <p className="service-step-description">
          Configure how this service is priced.
        </p>
      </div>

      <div className="grid gap-4">
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
            defaultValue={data.pricingType}
            error={errors.pricingType}
            onChange={(value) => onChange("pricingType", value)}
          />
          <TextField
            id="amountCents"
            name="amountCents"
            label="Amount (cents)"
            type="number"
            helperText="Required for exact price and starting from."
            defaultValue={data.amountCents}
            error={errors.amountCents}
            onChange={(e) => onChange("amountCents", e.target.value)}
          />
          <TextField
            id="unitLabel"
            name="unitLabel"
            label="Unit label"
            helperText="Example: per sq ft, each"
            defaultValue={data.unitLabel}
            error={errors.unitLabel}
            onChange={(e) => onChange("unitLabel", e.target.value)}
          />
          <TextField
            id="publicLabel"
            name="publicLabel"
            label="Public label"
            helperText="Example: Starting from $75, Request a quote"
            defaultValue={data.publicLabel}
            error={errors.publicLabel}
            onChange={(e) => onChange("publicLabel", e.target.value)}
          />
        </div>
        <TextAreaField
          id="tieredDescription"
          name="tieredDescription"
          label="Tiered description"
          helperText="Used when pricing type is tiered."
          rows={2}
          defaultValue={data.tieredDescription}
          error={errors.tieredDescription}
          onChange={(e) => onChange("tieredDescription", e.target.value)}
        />
        <input
          type="hidden"
          name="currency"
          value={data.currency}
        />
      </div>
    </div>
  );
}
