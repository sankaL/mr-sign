"use client";

import { Plus } from "lucide-react";
import { useState, useCallback } from "react";

import { AdminModal } from "@/components/admin/admin-modal";
import { AdminUserForm } from "@/components/admin/admin-user-form";

export function AddAdminButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#151515] px-4 text-sm font-semibold !text-white transition-colors hover:bg-[#3b82f6]"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
        Add admin
      </button>
      <AdminModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Add admin"
        subtitle="Invite access by email"
      >
        <AdminUserForm onSuccess={handleSuccess} />
      </AdminModal>
    </>
  );
}
