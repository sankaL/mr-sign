export type AdminUserInput = {
  email: string;
  name: string;
};

export type AdminUserValidationResult =
  | { ok: true; data: AdminUserInput }
  | {
      ok: false;
      fieldErrors: {
        email?: string;
        name?: string;
      };
    };

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateAdminUserInput(input: {
  email: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
}): AdminUserValidationResult {
  const email =
    typeof input.email === "string" ? normalizeAdminEmail(input.email) : "";
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const fieldErrors: { email?: string; name?: string } = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (name.length > 120) {
    fieldErrors.name = "Name must be 120 characters or less.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, data: { email, name } };
}

export function canDeactivateAdmin(input: {
  targetAdminId: string;
  currentAdminId: string;
  activeAdminCount: number;
}) {
  if (input.targetAdminId === input.currentAdminId) {
    return {
      ok: false,
      message: "You cannot deactivate your own admin account.",
    } as const;
  }

  if (input.activeAdminCount <= 1) {
    return {
      ok: false,
      message: "At least one active admin must remain.",
    } as const;
  }

  return { ok: true } as const;
}
