"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type BaseFieldProps = {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
};

type TextFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: string;
  };

type TextAreaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

type SelectOption = {
  label: string;
  value: string;
};

type CustomSelectFieldProps = BaseFieldProps & {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  name?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

function FieldFrame({
  id,
  label,
  helperText,
  error,
  children,
}: BaseFieldProps & { children: ReactNode }) {
  return (
    <div className="grid content-start gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-[#151515]/55"
      >
        {label}
      </label>
      {children}
      <div className="min-h-[16px]">
        {error ? (
          <p
            id={`${id}-error`}
            className="text-xs font-semibold text-red-600"
            aria-live="polite"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-xs text-[#151515]/40">
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function TextField({
  id,
  label,
  helperText,
  error,
  className = "",
  type = "text",
  ...props
}: TextFieldProps) {
  const describedBy = [
    helperText ? `${id}-helper` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldFrame id={id} label={label} helperText={helperText} error={error}>
      <input
        id={id}
        type={type}
        className={`h-10 rounded-lg border border-[#151515]/10 bg-white px-3 text-sm outline-none transition-colors placeholder:text-[#151515]/30 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
    </FieldFrame>
  );
}

export function TextAreaField({
  id,
  label,
  helperText,
  error,
  className = "",
  ...props
}: TextAreaFieldProps) {
  const describedBy = [
    helperText ? `${id}-helper` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldFrame id={id} label={label} helperText={helperText} error={error}>
      <textarea
        id={id}
        className={`min-h-24 rounded-lg border border-[#151515]/10 bg-white px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-[#151515]/30 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
    </FieldFrame>
  );
}

export function SelectField({
  id,
  label,
  helperText,
  error,
  options,
  placeholder,
  defaultValue = "",
  name,
  required,
  onChange,
}: CustomSelectFieldProps) {
  const describedBy = [
    helperText ? `${id}-helper` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldFrame id={id} label={label} helperText={helperText} error={error}>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="h-10 rounded-lg border border-[#151515]/10 bg-white px-3 text-sm outline-none transition-colors focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}
