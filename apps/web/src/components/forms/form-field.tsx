import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
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

type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: {
      label: string;
      value: string;
    }[];
    placeholder?: string;
  };

function FieldFrame({
  id,
  label,
  helperText,
  error,
  children,
}: BaseFieldProps & { children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="text-sm font-black uppercase tracking-wide"
      >
        {label}
      </label>
      {children}
      {helperText ? (
        <p
          id={`${id}-helper`}
          className="text-xs font-semibold leading-5 text-[#151515]/55"
        >
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-xs font-black leading-5 text-[#E51B23]"
          aria-live="polite"
        >
          {error}
        </p>
      ) : null}
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
        className={`min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#1936D4] ${className}`}
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
        className={`min-h-32 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#1936D4] ${className}`}
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
  className = "",
  options,
  placeholder,
  ...props
}: SelectFieldProps) {
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
        className={`min-h-11 rounded-2xl border border-[#151515]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition-colors focus:border-[#1936D4] ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
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
