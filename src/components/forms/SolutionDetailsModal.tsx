"use client";

import React from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { SolutionCard } from "@/content/siteContent";
import { useDemoModal } from "./DemoModalContext";

interface SolutionDetailsModalProps {
  card: SolutionCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SolutionDetailsModal({
  card,
  isOpen,
  onClose,
}: SolutionDetailsModalProps) {
  const { openDemoModal } = useDemoModal();

  if (!card) return null;

  const handleBookDemo = () => {
    onClose();
    openDemoModal({
      requestType: "demo",
      interest: card.title,
      source: card.id,
    });
  };

  const badgeColorMap = {
    blue: "text-[#0098FF] bg-[#EAF4FE] border-[#CBDDF8]",
    mint: "text-[#00B990] bg-[#E9FBF4] border-[#C2EFE0]",
    violet: "text-[#8745FF] bg-[#F2EDFD] border-[#DFD1F8]",
  };

  const checkColorMap = {
    blue: "bg-[#0787FF]",
    mint: "bg-[#00B990]",
    violet: "bg-[#8745FF]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeColorMap[card.color]}`}
            >
              Solution Module
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-[#081F44]">
            {card.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-[#50627E] mt-1">
            {card.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="py-3">
          <h5 className="text-xs uppercase tracking-wider font-bold text-[#50627E] mb-3">
            Key Capabilities Included:
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {card.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#081F44] bg-[#F8FAFD] p-2.5 rounded-xl border border-[#E3EAF4]"
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 ${checkColorMap[card.color]}`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E3EAF4]">
          <span className="text-xs text-[#50627E]">
            Preselects <strong>{card.title.split(" ")[0]}</strong> in demo request
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-[#50627E] hover:text-[#081F44] cursor-pointer"
            >
              Close
            </button>
            <PrimaryButton size="sm" onClick={handleBookDemo} className="w-full sm:w-auto">
              Book a Demo
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
