"use client";

import { deleteService } from "@/app/actions/admin-services";

import { AdminDeleteButton } from "./admin-delete-button";

type DeleteServiceButtonProps = {
  serviceId: string;
  serviceName: string;
  successRedirectTo?: string;
  variant?: "row" | "header";
};

export function DeleteServiceButton({
  serviceId,
  serviceName,
  successRedirectTo,
  variant,
}: DeleteServiceButtonProps) {
  return (
    <AdminDeleteButton
      action={() => deleteService(serviceId)}
      title={`Delete ${serviceName}?`}
      description="This will permanently delete the service if it has not been used by any customer requests. Services with request history cannot be deleted and should be deactivated instead."
      confirmLabel="Delete service"
      triggerLabel="Delete"
      ariaLabel={`Delete service ${serviceName}`}
      successRedirectTo={successRedirectTo}
      variant={variant}
    />
  );
}
