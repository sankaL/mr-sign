import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  deleteRequestWithAudit,
  deleteServiceWithAudit,
  serviceDeleteHistoryMessage,
  type RequestDeleteRecord,
  type ServiceDeleteRecord,
} from "./admin-delete";

const requestRecord: RequestDeleteRecord = {
  id: "request-1",
  requestCode: "Q-2026-0001",
  type: "QUOTE",
  status: "NEW",
  firstName: "Avery",
  lastName: "Customer",
  email: "avery@example.com",
};

const serviceRecord: ServiceDeleteRecord = {
  id: "service-1",
  name: "Banners",
  slug: "banners",
  status: "ACTIVE",
  category: {
    slug: "signs",
    name: "Signs",
  },
};

describe("deleteRequestWithAudit", () => {
  it("deletes and revalidates an existing request", async () => {
    const deleted: Array<{ requestId: string; adminId: string }> = [];
    const revalidated: string[] = [];

    const result = await deleteRequestWithAudit({
      requestCode: requestRecord.requestCode,
      adminId: "admin-1",
      findRequest: async () => requestRecord,
      deleteRequest: async (request, adminId) => {
        deleted.push({ requestId: request.id, adminId });
      },
      revalidate: (requestCode) => {
        revalidated.push(requestCode);
      },
    });

    assert.deepEqual(result, {
      status: "success",
      message: "Request deleted.",
    });
    assert.deepEqual(deleted, [
      { requestId: requestRecord.id, adminId: "admin-1" },
    ]);
    assert.deepEqual(revalidated, [requestRecord.requestCode]);
  });

  it("returns not found without deleting or revalidating", async () => {
    let deleteCalled = false;
    let revalidateCalled = false;

    const result = await deleteRequestWithAudit({
      requestCode: "missing",
      adminId: "admin-1",
      findRequest: async () => null,
      deleteRequest: async () => {
        deleteCalled = true;
      },
      revalidate: () => {
        revalidateCalled = true;
      },
    });

    assert.deepEqual(result, {
      status: "error",
      message: "Request not found.",
    });
    assert.equal(deleteCalled, false);
    assert.equal(revalidateCalled, false);
  });

  it("returns a structured error when deletion fails", async () => {
    const logged: unknown[] = [];

    const result = await deleteRequestWithAudit({
      requestCode: requestRecord.requestCode,
      adminId: "admin-1",
      findRequest: async () => requestRecord,
      deleteRequest: async () => {
        throw new Error("database timeout");
      },
      revalidate: () => {
        throw new Error("should not revalidate failed deletes");
      },
      logError: (_message, error) => {
        logged.push(error);
      },
    });

    assert.deepEqual(result, {
      status: "error",
      message: "The request could not be deleted. Please try again.",
    });
    assert.equal(logged.length, 1);
  });
});

describe("deleteServiceWithAudit", () => {
  it("deletes and revalidates an existing service", async () => {
    const deleted: Array<{ serviceId: string; adminId: string }> = [];
    const revalidated: string[] = [];

    const result = await deleteServiceWithAudit({
      serviceId: serviceRecord.id,
      adminId: "admin-1",
      findService: async () => serviceRecord,
      deleteService: async (service, adminId) => {
        deleted.push({ serviceId: service.id, adminId });
      },
      isHistoryConstraintError: () => false,
      revalidate: (service) => {
        revalidated.push(`${service.category.slug}/${service.slug}`);
      },
    });

    assert.deepEqual(result, {
      status: "success",
      message: "Service deleted.",
    });
    assert.deepEqual(deleted, [
      { serviceId: serviceRecord.id, adminId: "admin-1" },
    ]);
    assert.deepEqual(revalidated, ["signs/banners"]);
  });

  it("returns not found without deleting or revalidating", async () => {
    let deleteCalled = false;
    let revalidateCalled = false;

    const result = await deleteServiceWithAudit({
      serviceId: "missing",
      adminId: "admin-1",
      findService: async () => null,
      deleteService: async () => {
        deleteCalled = true;
      },
      isHistoryConstraintError: () => false,
      revalidate: () => {
        revalidateCalled = true;
      },
    });

    assert.deepEqual(result, {
      status: "error",
      message: "Service not found.",
    });
    assert.equal(deleteCalled, false);
    assert.equal(revalidateCalled, false);
  });

  it("returns deactivate guidance for service request-history constraints", async () => {
    let revalidateCalled = false;

    const result = await deleteServiceWithAudit({
      serviceId: serviceRecord.id,
      adminId: "admin-1",
      findService: async () => serviceRecord,
      deleteService: async () => {
        throw new Error("foreign key violation");
      },
      isHistoryConstraintError: () => true,
      revalidate: () => {
        revalidateCalled = true;
      },
    });

    assert.deepEqual(result, {
      status: "error",
      message: serviceDeleteHistoryMessage,
    });
    assert.equal(revalidateCalled, false);
  });

  it("returns a generic error for non-history failures", async () => {
    const logged: unknown[] = [];

    const result = await deleteServiceWithAudit({
      serviceId: serviceRecord.id,
      adminId: "admin-1",
      findService: async () => serviceRecord,
      deleteService: async () => {
        throw new Error("connection refused");
      },
      isHistoryConstraintError: () => false,
      revalidate: () => {
        throw new Error("should not revalidate failed deletes");
      },
      logError: (_message, error) => {
        logged.push(error);
      },
    });

    assert.deepEqual(result, {
      status: "error",
      message: "The service could not be deleted. Please try again.",
    });
    assert.equal(logged.length, 1);
  });
});
