"use client";

import { TextField } from "@/components/forms/form-field";

export type VisibilityData = {
  metaTitle: string;
  metaDescription: string;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  isFeatured: boolean;
};

type ServiceStepVisibilityProps = {
  data: VisibilityData;
  errors: Record<string, string>;
  onChange: (field: keyof VisibilityData, value: string | boolean) => void;
  isDraft: boolean;
};

export const defaultVisibilityData: VisibilityData = {
  metaTitle: "",
  metaDescription: "",
  status: "ACTIVE",
  isFeatured: false,
};

export function ServiceStepVisibility({
  data,
  errors,
  onChange,
  isDraft,
}: ServiceStepVisibilityProps) {
  return (
    <div className="service-step-content">
      <div className="service-step-header">
        <p className="service-step-eyebrow">Step 3</p>
        <h2 className="service-step-title">Visibility & SEO</h2>
        <p className="service-step-description">
          Set visibility and search engine metadata.
        </p>
      </div>

      <div className="grid gap-4">
        {!isDraft && (
          <div className="grid gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#151515]/55">
              Status
            </p>
            <div className="flex flex-wrap gap-3">
              {(["ACTIVE", "INACTIVE"] as const).map((statusOption) => (
                <label
                  key={statusOption}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-bold transition-colors ${
                    data.status === statusOption
                      ? "border-[#3b82f6] bg-[#3b82f6]/5 text-[#3b82f6]"
                      : "border-[#151515]/10 text-[#151515]/60 hover:border-[#151515]/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={statusOption}
                    checked={data.status === statusOption}
                    onChange={() => onChange("status", statusOption)}
                    className="sr-only"
                  />
                  <span
                    className={`h-2 w-2 rounded-full ${
                      statusOption === "ACTIVE" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {statusOption.charAt(0) + statusOption.slice(1).toLowerCase()}
                </label>
              ))}
            </div>
            {errors.status ? (
              <p className="text-xs font-semibold text-red-600" aria-live="polite">
                {errors.status}
              </p>
            ) : null}
          </div>
        )}

        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            name="isFeatured"
            checked={data.isFeatured}
            onChange={(e) => onChange("isFeatured", e.target.checked)}
            className="h-4 w-4 rounded border-[#151515]/20"
          />
          Featured service
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id="metaTitle"
            name="metaTitle"
            label="Meta title"
            defaultValue={data.metaTitle}
            error={errors.metaTitle}
            onChange={(e) => onChange("metaTitle", e.target.value)}
          />
          <TextField
            id="metaDescription"
            name="metaDescription"
            label="Meta description"
            defaultValue={data.metaDescription}
            error={errors.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
