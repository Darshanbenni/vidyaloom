"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CheckList } from "@/components/ui/CheckList";
import { referencePreviewContent } from "@/content/siteContent";
import { useDemoModal } from "@/components/forms/DemoModalContext";
import { MotionReveal } from "@/components/motion/MotionReveal";
import dashboardPreview from "@assets/source/dashboard-preview.webp";

export function DashboardSection() {
  const { dashboard } = referencePreviewContent;
  const { openDemoModal } = useDemoModal();

  return (
    <section
      id="about"
      aria-label="Vidyaloom Management Platform and Dashboards"
      className="w-full py-12 sm:py-14 bg-[#FAFBFD] relative overflow-hidden border-t border-[#E3EAF4]/70"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic 3D Layered Dashboard Product Illustration */}
          <MotionReveal className="lg:col-span-7 relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-[680px] rounded-3xl overflow-hidden shadow-xl shadow-[#081F44]/10 border border-[#E3EAF4] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(8,31,68,0.18)] hover:scale-[1.015]">
              <Image
                src={dashboardPreview}
                alt="Vidyaloom School Management System dashboard product preview showcasing attendance, fees, enquiries and analytics"
                unoptimized
                className="w-full h-auto object-contain rounded-2xl"
                priority
              />
            </div>
          </MotionReveal>

          {/* Right Column: Explanatory Copy, Features & CTA */}
          <MotionReveal delay={0.08} className="lg:col-span-5 flex flex-col items-start max-w-[520px]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#081F44] tracking-tight leading-tight mb-4">
              A Smarter Way <br className="hidden sm:inline" />{" "}
              to Manage Education
            </h2>

            <p className="text-sm sm:text-base text-[#50627E] leading-relaxed mb-6">
              {dashboard.subcopy}
            </p>

            {/* 4 Features List */}
            <div className="mb-8 w-full">
              <CheckList items={dashboard.features} color="teal" />
            </div>

            {/* CTA & Handwritten "See the difference" note with arrow */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <PrimaryButton
                size="lg"
                onClick={() =>
                  openDemoModal({
                    requestType: "demo",
                    interest: "Management Dashboards & Analytics",
                    source: "dashboard",
                  })
                }
                className="px-7 py-3.5 text-[15px] sm:text-[16px]"
              >
                {dashboard.cta}
              </PrimaryButton>

              <div className="flex items-center gap-2.5 select-none text-[#50627E]">
                <svg className="w-12 h-8 text-[#8E9EB5]" viewBox="0 0 48 28" fill="none">
                  <path
                    d="M44 8C32 20 16 22 4 14M4 14L12 11M4 14L10 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-handwriting text-2xl sm:text-[27px] font-bold text-[#50627E] leading-none">
                  {dashboard.handwriting}
                </span>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
