const validStatuses = new Set([
  "NEW",
  "UNDER_REVIEW",
  "QUOTE_SENT",
  "AWAITING_CUSTOMER_APPROVAL",
  "APPROVED",
  "IN_PRODUCTION",
  "READY_FOR_PICKUP",
  "COMPLETED",
  "CANCELLED",
]);

export function validateRequestStatus(value: string) {
  return validStatuses.has(value) ? value : null;
}

export function validateNoteBody(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false as const, error: "Enter a note." };
  if (trimmed.length > 5000)
    return {
      ok: false as const,
      error: "Note must be 5000 characters or less.",
    };
  return { ok: true as const, body: trimmed };
}
