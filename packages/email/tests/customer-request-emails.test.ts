import assert from "node:assert/strict";
import test from "node:test";

import { buildCustomerRequestEmails } from "../src/index";
import type { CustomerRequestEmailInput } from "../src/index";

function quoteInput(): CustomerRequestEmailInput {
  return {
    kind: "quote",
    requestCode: "MSQ-2026-0001",
    submittedAt: new Date("2026-05-09T15:30:00-04:00"),
    firstName: "Avery",
    lastName: "Customer",
    email: "avery@example.com",
    phone: "416-555-0100",
    companyName: "Avery Signs",
    preferredContactMethod: "EMAIL",
    reasonForContact: null,
    selectedServices: ["Banner", "Business Cards"],
    quantity: 25,
    desiredCompletionDate: new Date("2026-05-20T00:00:00-04:00"),
    projectDetails: "Please quote a storefront banner.",
    artworkStatus: "WILL_EMAIL_FILES",
    sizeDetails: "24 x 72 inches",
    materialDetails: "Vinyl",
    colorPreferences: "Blue and red",
  };
}

test("builds quote confirmation and admin notification emails", () => {
  const emails = buildCustomerRequestEmails(quoteInput(), {
    adminNotificationEmail: "orders@example.com",
    siteUrl: "https://mrsignandprint.net",
  });

  assert.equal(
    emails.customer.subject,
    "We received your quote request MSQ-2026-0001",
  );
  assert.equal(emails.admin.subject, "New Quote Request MSQ-2026-0001");
  assert.equal(emails.admin.to, "orders@example.com");
  assert.equal(emails.admin.replyTo, "avery@example.com");
  assert.match(emails.admin.text, /Selected services: Banner, Business Cards/);
  assert.match(emails.customer.text, /Request code: MSQ-2026-0001/);
  assert.match(emails.customer.html, /Request received/);
  assert.match(emails.customer.html, /background:#eef4fb/);
  assert.match(emails.customer.html, /Mr\. Sign and Print/);
  assert.match(emails.admin.html, /A new quote request was submitted/);
  assert.match(emails.admin.html, /order@mrsignandprint\.net/);
});

test("escapes customer-provided HTML in email markup", () => {
  const input = quoteInput();
  input.projectDetails = '<script>alert("x")</script>';

  const emails = buildCustomerRequestEmails(input, {
    adminNotificationEmail: "orders@example.com",
    siteUrl: "https://mrsignandprint.net",
  });

  assert.doesNotMatch(emails.admin.html, /<script>/);
  assert.match(
    emails.admin.html,
    /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/,
  );
});

test("builds contact emails with reason and message", () => {
  const input = quoteInput();
  input.kind = "contact";
  input.requestCode = "MSC-2026-0001";
  input.reasonForContact = "Question about services";
  input.projectDetails = "Do you print rush flyers?";
  input.selectedServices = [];

  const emails = buildCustomerRequestEmails(input, {
    adminNotificationEmail: "orders@example.com",
    siteUrl: "https://mrsignandprint.net",
  });

  assert.equal(
    emails.customer.subject,
    "We received your contact message MSC-2026-0001",
  );
  assert.equal(emails.admin.subject, "New Contact Message MSC-2026-0001");
  assert.match(emails.admin.text, /Reason: Question about services/);
  assert.match(emails.admin.text, /Message: Do you print rush flyers\?/);
});
