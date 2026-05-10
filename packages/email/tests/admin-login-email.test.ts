import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildAdminLoginEmail } from "../src/admin-login-email";

describe("buildAdminLoginEmail", () => {
  it("includes the secure login URL in text and HTML", () => {
    const message = buildAdminLoginEmail({
      email: "admin@example.com",
      url: "https://mrsign.example/admin/magic?token=abc123&next=/admin",
    });

    assert.equal(message.to, "admin@example.com");
    assert.match(message.subject, /admin login link/i);
    assert.match(message.text, /https:\/\/mrsign\.example\/admin\/magic/);
    assert.match(
      message.html,
      /https:\/\/mrsign\.example\/admin\/magic\?token=abc123&amp;next=\/admin/,
    );
  });
});
