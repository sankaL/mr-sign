export type CustomerRequestKind = "quote" | "order" | "contact";

export type CustomerRequestFieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "preferredContactMethod"
    | "reasonForContact"
    | "services"
    | "quantity"
    | "desiredCompletionDate"
    | "projectDetails",
    string
  >
>;

export type CustomerRequestFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  requestCode?: string;
  fieldErrors?: CustomerRequestFieldErrors;
};

export type ServiceSelectGroup = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type CustomerRequestDefaults = {
  category?: string;
  service?: string;
};
