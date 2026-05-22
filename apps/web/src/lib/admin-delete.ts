export type DeleteActionResult = {
  status: "success" | "error";
  message?: string;
};

export type RequestDeleteRecord = {
  id: string;
  requestCode: string;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ServiceDeleteRecord = {
  id: string;
  name: string;
  slug: string;
  status: string;
  category: {
    slug: string;
    name: string;
  };
};

export const serviceDeleteHistoryMessage =
  "This service is attached to existing requests. Deactivate it instead to hide it from the public site while preserving request history.";

export async function deleteRequestWithAudit({
  requestCode,
  adminId,
  findRequest,
  deleteRequest,
  revalidate,
  logError = console.error,
}: {
  requestCode: string;
  adminId: string;
  findRequest: (requestCode: string) => Promise<RequestDeleteRecord | null>;
  deleteRequest: (
    request: RequestDeleteRecord,
    adminId: string,
  ) => Promise<void>;
  revalidate: (requestCode: string) => void;
  logError?: (message: string, error: unknown) => void;
}): Promise<DeleteActionResult> {
  try {
    const request = await findRequest(requestCode);

    if (!request) {
      return { status: "error", message: "Request not found." };
    }

    await deleteRequest(request, adminId);

    revalidate(requestCode);

    return { status: "success", message: "Request deleted." };
  } catch (error) {
    logError("Request deletion failed", error);
    return {
      status: "error",
      message: "The request could not be deleted. Please try again.",
    };
  }
}

export async function deleteServiceWithAudit({
  serviceId,
  adminId,
  findService,
  deleteService,
  isHistoryConstraintError,
  revalidate,
  logError = console.error,
}: {
  serviceId: string;
  adminId: string;
  findService: (serviceId: string) => Promise<ServiceDeleteRecord | null>;
  deleteService: (
    service: ServiceDeleteRecord,
    adminId: string,
  ) => Promise<void>;
  isHistoryConstraintError: (error: unknown) => boolean;
  revalidate: (service: ServiceDeleteRecord) => void;
  logError?: (message: string, error: unknown) => void;
}): Promise<DeleteActionResult> {
  try {
    const service = await findService(serviceId);

    if (!service) {
      return { status: "error", message: "Service not found." };
    }

    await deleteService(service, adminId);

    revalidate(service);

    return { status: "success", message: "Service deleted." };
  } catch (error) {
    if (isHistoryConstraintError(error)) {
      return {
        status: "error",
        message: serviceDeleteHistoryMessage,
      };
    }

    logError("Service deletion failed", error);
    return {
      status: "error",
      message: "The service could not be deleted. Please try again.",
    };
  }
}
