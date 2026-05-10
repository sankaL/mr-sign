"use server";

import { getService } from "@mrsign/content";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import type {
  CustomerRequestFormState,
  CustomerRequestKind,
} from "@/components/forms/customer-request-types";

import {
  isHoneypotSubmission,
  parseCustomerRequestForm,
  pathByKind,
  requestTypeByKind,
  successMessageByKind,
} from "./customer-request-validation";

const publicSaveErrorMessage =
  "The request could not be saved. Please call or email the shop.";
const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const submissionBuckets = new Map<string, number[]>();

async function getSubmissionRateLimitKey(email: string) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim();

  return `${ipAddress || "unknown"}:${email}`;
}

function isRateLimited(key: string, now = Date.now()) {
  const windowStart = now - rateLimitWindowMs;
  const attempts = (submissionBuckets.get(key) ?? []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (attempts.length >= maxSubmissionsPerWindow) {
    submissionBuckets.set(key, attempts);
    return true;
  }

  submissionBuckets.set(key, [...attempts, now]);
  return false;
}

export async function submitCustomerRequest(
  kind: CustomerRequestKind,
  _previousState: CustomerRequestFormState,
  formData: FormData,
): Promise<CustomerRequestFormState> {
  if (isHoneypotSubmission(formData)) {
    return {
      status: "success",
      message: successMessageByKind[kind],
      requestCode: "Received",
    };
  }

  const parsed = parseCustomerRequestForm(kind, formData);

  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    companyName,
    preferredContactMethod,
    reasonForContact,
    selectedServices,
    quantity,
    desiredCompletionDate,
    projectDetails,
    artworkStatus,
    sizeDetails,
    materialDetails,
    colorPreferences,
  } = parsed.data;

  const rateLimitKey = await getSubmissionRateLimitKey(email);

  if (isRateLimited(rateLimitKey)) {
    return {
      status: "error",
      message:
        "Too many requests were submitted recently. Please wait a few minutes or call the shop.",
    };
  }

  let request: {
    requestCode: string;
    submittedAt: Date;
  };

  try {
    const [{ prisma }, { formatRequestCode }] = await Promise.all([
      import("@mrsign/db/src/client"),
      import("@mrsign/db/src/request-codes"),
    ]);
    const requestType = requestTypeByKind[kind];
    const year = new Date().getFullYear();

    request = await prisma.$transaction(async (tx) => {
      const counter = await tx.requestCodeCounter.upsert({
        where: {
          requestType_year: {
            requestType,
            year,
          },
        },
        create: {
          requestType,
          year,
          lastNumber: 1,
        },
        update: {
          lastNumber: {
            increment: 1,
          },
        },
      });

      const serviceRows =
        selectedServices.length > 0
          ? await tx.service.findMany({
              where: {
                isActive: true,
                OR: selectedServices.map((service) => ({
                  slug: service.serviceSlug,
                  category: {
                    slug: service.categorySlug,
                    isActive: true,
                  },
                })),
              },
              select: {
                id: true,
              },
            })
          : [];

      if (
        (kind === "quote" || kind === "order") &&
        serviceRows.length !== selectedServices.length
      ) {
        throw new Error("Selected services are not available.");
      }

      return tx.customerRequest.create({
        data: {
          requestCode: formatRequestCode(requestType, year, counter.lastNumber),
          type: requestType,
          firstName,
          lastName,
          email,
          phone,
          companyName,
          preferredContactMethod,
          reasonForContact,
          quantity,
          sizeDetails,
          materialDetails,
          colorPreferences,
          artworkStatus,
          desiredCompletionDate,
          projectDetails,
          services: {
            create: serviceRows.map((service) => ({
              serviceId: service.id,
            })),
          },
        },
        select: {
          requestCode: true,
          submittedAt: true,
        },
      });
    });

    revalidatePath(pathByKind[kind]);
  } catch (error) {
    console.error("Customer request submission failed", error);

    return {
      status: "error",
      message: publicSaveErrorMessage,
    };
  }

  if (kind === "quote" || kind === "contact") {
    try {
      const { sendCustomerRequestEmails } = await import("@mrsign/email");

      await sendCustomerRequestEmails({
        kind,
        requestCode: request.requestCode,
        submittedAt: request.submittedAt,
        firstName,
        lastName,
        email,
        phone,
        companyName,
        preferredContactMethod,
        reasonForContact,
        selectedServices: selectedServices.map((serviceRef) => {
          const service = getService(
            serviceRef.categorySlug,
            serviceRef.serviceSlug,
          );

          return service?.name ?? serviceRef.serviceSlug;
        }),
        quantity,
        desiredCompletionDate,
        projectDetails,
        artworkStatus,
        sizeDetails,
        materialDetails,
        colorPreferences,
      });
    } catch (error) {
      console.error("Customer request email notification failed", error);
    }
  }

  return {
    status: "success",
    message: successMessageByKind[kind],
    requestCode: request.requestCode,
  };
}
