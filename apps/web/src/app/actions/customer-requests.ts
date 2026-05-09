"use server";

import { revalidatePath } from "next/cache";

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

  try {
    const [{ prisma }, { formatRequestCode }] = await Promise.all([
      import("@mrsign/db/src/client"),
      import("@mrsign/db/src/request-codes"),
    ]);
    const requestType = requestTypeByKind[kind];
    const year = new Date().getFullYear();

    const request = await prisma.$transaction(async (tx) => {
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
        },
      });
    });

    revalidatePath(pathByKind[kind]);

    return {
      status: "success",
      message: successMessageByKind[kind],
      requestCode: request.requestCode,
    };
  } catch (error) {
    console.error("Customer request submission failed", error);

    return {
      status: "error",
      message: publicSaveErrorMessage,
    };
  }
}
