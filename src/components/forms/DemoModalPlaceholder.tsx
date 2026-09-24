"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { useDemoModal } from "./DemoModalContext";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function DemoModalPlaceholder() {
  const { isOpen, closeDemoModal, options } = useDemoModal();

  const getTitle = () => {
    switch (options.requestType) {
      case "workshop":
        return "Request a Workshop for Your School";
      case "contact":
        return "Get in Touch with Vidyaloom";
      default:
        return "Book a Free Platform Demo";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDemoModal()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-[#EAF4FE] text-[#0098FF] flex items-center justify-center font-bold text-lg mb-2">
            ✦
          </div>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Connect with our education technology advisors. We will customize a demonstration for your institution.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 text-sm text-[#50627E]">
          <p className="mb-2">
            <strong>Requested Action:</strong> {options.requestType?.toUpperCase()}
          </p>
          {options.interest && (
            <p className="mb-2">
              <strong>Focus Area:</strong> {options.interest}
            </p>
          )}
          <p className="text-xs text-[#50627E]/80 mt-4 bg-[#F0F4FE] p-3 rounded-xl border border-[#E3EAF4]">
            ℹ️ Full interactive Resend submission form with Turnstile & anti-spam protections will be integrated in Prompt 09.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E3EAF4]">
          <button
            type="button"
            onClick={closeDemoModal}
            className="px-4 py-2 text-sm font-semibold text-[#50627E] hover:text-[#081F44] cursor-pointer"
          >
            Close
          </button>
          <PrimaryButton size="sm" onClick={closeDemoModal}>
            Got it
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
