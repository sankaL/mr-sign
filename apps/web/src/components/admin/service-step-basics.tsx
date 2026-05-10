"use client";

import {
  TextField,
  TextAreaField,
  SelectField,
} from "@/components/forms/form-field";

export type BasicsData = {
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  imagePath: string;
  displayOrder: string;
};

type ServiceStepBasicsProps = {
  data: BasicsData;
  errors: Record<string, string>;
  categories: Array<{ id: string; name: string }>;
  onChange: (field: keyof BasicsData, value: string) => void;
};

export const defaultBasicsData: BasicsData = {
  categoryId: "",
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  imagePath: "",
  displayOrder: "0",
};

export function ServiceStepBasics({
  data,
  errors,
  categories,
  onChange,
}: ServiceStepBasicsProps) {
  return (
    <div className="service-step-content">
      <div className="service-step-header">
        <p className="service-step-eyebrow">Step 1</p>
        <h2 className="service-step-title">Service basics</h2>
        <p className="service-step-description">
          Name, categorize, and describe the service.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            id="categoryId"
            name="categoryId"
            label="Category"
            required
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            placeholder="Choose a category"
            defaultValue={data.categoryId}
            error={errors.categoryId}
            onChange={(value) => onChange("categoryId", value)}
          />
          <TextField
            id="name"
            name="name"
            label="Name"
            required
            defaultValue={data.name}
            error={errors.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
          <TextField
            id="slug"
            name="slug"
            label="Slug"
            helperText="URL-friendly identifier. Auto-generated if empty."
            defaultValue={data.slug}
            error={errors.slug}
            onChange={(e) => onChange("slug", e.target.value)}
          />
          <TextField
            id="displayOrder"
            name="displayOrder"
            label="Display order"
            type="number"
            defaultValue={data.displayOrder}
            error={errors.displayOrder}
            onChange={(e) => onChange("displayOrder", e.target.value)}
          />
        </div>

        <TextAreaField
          id="shortDescription"
          name="shortDescription"
          label="Short description"
          required
          rows={2}
          defaultValue={data.shortDescription}
          error={errors.shortDescription}
          onChange={(e) => onChange("shortDescription", e.target.value)}
        />

        <TextAreaField
          id="description"
          name="description"
          label="Full description"
          rows={4}
          defaultValue={data.description}
          error={errors.description}
          onChange={(e) => onChange("description", e.target.value)}
        />

        <TextField
          id="imagePath"
          name="imagePath"
          label="Image path"
          helperText="Relative path to the service image."
          defaultValue={data.imagePath}
          error={errors.imagePath}
          onChange={(e) => onChange("imagePath", e.target.value)}
        />
      </div>
    </div>
  );
}

export function validateBasicsStep(data: BasicsData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.categoryId) errors.categoryId = "Choose a category.";
  if (!data.name.trim()) errors.name = "Enter a service name.";
  return errors;
}
