import assert from "node:assert/strict";
import test from "node:test";

import { formatRequestCode } from "../src/request-codes.js";

test("formats quote request codes", () => {
  assert.equal(formatRequestCode("QUOTE", 2026, 1), "Q-MSP-2026-000001");
});

test("formats order request codes", () => {
  assert.equal(formatRequestCode("ORDER", 2026, 42), "O-MSP-2026-000042");
});

test("formats contact request codes", () => {
  assert.equal(formatRequestCode("CONTACT", 2026, 123456), "C-MSP-2026-123456");
});
