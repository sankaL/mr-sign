"use client";

import { deleteRequest } from "@/app/actions/admin-requests";

import { AdminDeleteButton } from "./admin-delete-button";

type DeleteRequestButtonProps = {
  requestCode: string;
  customerName: string;
  successRedirectTo?: string;
  variant?: "row" | "header";
};

export function DeleteRequestButton({
  requestCode,
  customerName,
  successRedirectTo,
  variant,
}: DeleteRequestButtonProps) {
  return (
    <AdminDeleteButton
      action={() => deleteRequest(requestCode)}
      title={`Delete ${requestCode}?`}
      description={`This will permanently delete the request from ${customerName}, including its selected service links and internal notes.`}
      confirmLabel="Delete request"
      triggerLabel="Delete"
      ariaLabel={`Delete request ${requestCode}`}
      successRedirectTo={successRedirectTo}
      variant={variant}
    />
  );
}
