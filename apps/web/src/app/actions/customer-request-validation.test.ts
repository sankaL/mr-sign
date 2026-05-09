import assert from "node:assert/strict";
import test from "node:test";

import {
  contactReasonOptions,
  isHoneypotSubmission,
  parseCustomerRequestForm,
} from "./customer-request-validation";

function baseFormData() {
  const formData = new FormData();
  formData.set("firstName", "Avery");
  formData.set("lastName", "Customer");
  formData.set("email", "avery@example.com");
  formData.set("preferredContactMethod", "EMAIL");
  formData.set("projectDetails", "Please help with a sign request.");
  return formData;
}

test("rejects forged contact reasons outside the fixed option set", () => {
  const formData = baseFormData();
  formData.set("reasonForContact", "Forged reason");

  const result = parseCustomerRequestForm("contact", formData);

  assert.equal(result.ok, false);
  assert.equal(
    result.ok ? undefined : result.fieldErrors.reasonForContact,
    "Choose a reason for contact.",
  );
});

test("accepts configured contact reason options", () => {
  const formData = baseFormData();
  formData.set("reasonForContact", contactReasonOptions[0]);

  const result = parseCustomerRequestForm("contact", formData);

  assert.equal(result.ok, true);
  assert.equal(
    result.ok ? result.data.reasonForContact : undefined,
    contactReasonOptions[0],
  );
});

test("requires at least one valid service for quote requests", () => {
  const formData = baseFormData();

  const result = parseCustomerRequestForm("quote", formData);

  assert.equal(result.ok, false);
  assert.equal(
    result.ok ? undefined : result.fieldErrors.services,
    "Choose at least one service.",
  );
});

test("parses valid quote service selections", () => {
  const formData = baseFormData();
  formData.append("services", "signs:banner");

  const result = parseCustomerRequestForm("quote", formData);

  assert.equal(result.ok, true);
  assert.deepEqual(result.ok ? result.data.selectedServices : undefined, [
    {
      categorySlug: "signs",
      serviceSlug: "banner",
    },
  ]);
});

test("detects honeypot submissions", () => {
  const formData = baseFormData();

  assert.equal(isHoneypotSubmission(formData), false);

  formData.set("website", "https://spam.example");

  assert.equal(isHoneypotSubmission(formData), true);
});
