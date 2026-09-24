"use client";

import React, { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

interface VideoOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoOverviewModal({ isOpen, onClose }: VideoOverviewModalProps) {
  const [activeTab, setActiveTab] = useState<"erp" | "training" | "ai">("erp");

  const walkthroughSteps = {
    erp: {
      title: "1. Unified School Operations",
      description:
        "Manage attendance, exams, fees, timetable, admissions, and parent communications in one intuitive interface.",
      highlight: "Save up to 40 hours per month on administrative overhead.",
      badge: "School ERP & Automation",
    },
    training: {
      title: "2. Hands-on AI & Robotics Lab",
      description:
        "Industry experts conduct immersive workshops where students build real web apps, train AI models, and deploy code to the cloud.",
      highlight: "Over 100,000+ students trained across top institutions.",
      badge: "Future-Ready Skills",
    },
    ai: {
      title: "3. Real-Time Intelligence & AI Dashboards",
      description:
        "Leadership dashboards offer real-time visibility into student attendance trends, fee collection forecasts, and enquiry pipelines.",
      highlight: "Make data-backed decisions with automated institutional reporting.",
      badge: "Executive Insights",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="w-11 h-11 rounded-2xl bg-[#EAF4FE] text-[#0098FF] flex items-center justify-center mb-1">
            <Play className="w-5 h-5 fill-[#0098FF]" />
          </div>
          <DialogTitle>Explore Vidyaloom Platform Overview</DialogTitle>
          <DialogDescription>
            A 3-part walkthrough showing how Vidyaloom powers modern schools and colleges.
          </DialogDescription>
        </DialogHeader>

        {/* Tab triggers */}
        <div className="flex rounded-xl bg-[#F0F4FE] p-1 gap-1 my-2">
          <button
            type="button"
            onClick={() => setActiveTab("erp")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "erp"
                ? "bg-white text-[#081F44] shadow-xs"
                : "text-[#50627E] hover:text-[#081F44]"
            }`}
          >
            ERP & CRM
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("training")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "training"
                ? "bg-white text-[#081F44] shadow-xs"
                : "text-[#50627E] hover:text-[#081F44]"
            }`}
          >
            AI Training
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "ai"
                ? "bg-white text-[#081F44] shadow-xs"
                : "text-[#50627E] hover:text-[#081F44]"
            }`}
          >
            Dashboards
          </button>
        </div>

        {/* Active Walkthrough Card */}
        <div className="p-5 rounded-2xl border border-[#CBDDF8] bg-gradient-to-br from-[#EAF4FE] to-[#F8FBFF] space-y-3">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#0098FF]">
            {walkthroughSteps[activeTab].badge}
          </span>
          <h4 className="text-[18px] font-bold text-[#081F44]">
            {walkthroughSteps[activeTab].title}
          </h4>
          <p className="text-[14px] text-[#50627E] leading-relaxed">
            {walkthroughSteps[activeTab].description}
          </p>
          <div className="p-3 bg-white/90 rounded-xl border border-white text-xs font-semibold text-[#081F44] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0098FF] flex-shrink-0" />
            <span>{walkthroughSteps[activeTab].highlight}</span>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E3EAF4]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#081F44] text-white font-semibold text-sm hover:bg-[#081F44]/90 cursor-pointer"
          >
            Done Exploring
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
