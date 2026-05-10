import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { canDeactivateAdmin, validateAdminUserInput } from "./admin-users";

describe("validateAdminUserInput", () => {
  it("normalizes valid admin email and name", () => {
    const result = validateAdminUserInput({
      email: "  Owner@Example.COM ",
      name: "  Owner  ",
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.data.email, "owner@example.com");
      assert.equal(result.data.name, "Owner");
    }
  });

  it("rejects invalid admin email", () => {
    const result = validateAdminUserInput({ email: "bad", name: "Owner" });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.fieldErrors.email, "Enter a valid email address.");
    }
  });
});

describe("canDeactivateAdmin", () => {
  it("prevents self deactivation", () => {
    const result = canDeactivateAdmin({
      targetAdminId: "admin-1",
      currentAdminId: "admin-1",
      activeAdminCount: 2,
    });

    assert.equal(result.ok, false);
  });

  it("prevents deactivating the last active admin", () => {
    const result = canDeactivateAdmin({
      targetAdminId: "admin-2",
      currentAdminId: "admin-1",
      activeAdminCount: 1,
    });

    assert.equal(result.ok, false);
  });

  it("allows deactivating another admin when at least one remains", () => {
    const result = canDeactivateAdmin({
      targetAdminId: "admin-2",
      currentAdminId: "admin-1",
      activeAdminCount: 2,
    });

    assert.equal(result.ok, true);
  });
});
