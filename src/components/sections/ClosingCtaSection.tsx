"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { referencePreviewContent } from "@/content/siteContent";
import { useDemoModal } from "@/components/forms/DemoModalContext";
import { MotionReveal } from "@/components/motion/MotionReveal";
import campusAerial from "@assets/source/campus-aerial.webp";

export function ClosingCtaSection() {
  const { closingCta } = referencePreviewContent;
  const { openDemoModal } = useDemoModal();

  return (
    <section
      id="campus-cta"
      aria-label="Call to Action Banner"
      className="relative w-full min-h-[280px] lg:min-h-[300px] overflow-hidden flex items-center py-12 sm:py-14"
    >
      {/* Background Aerial Campus Photograph Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={campusAerial}
          alt="Modern school campus panoramic aerial view"
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Navy-Black Overlay matching reference (rgb(2 13 23 / 74%)) */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2, 13, 23, 0.76)" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Main Action Copy */}
          <MotionReveal className="max-w-[720px] text-center lg:text-left">
            <SectionEyebrow variant="white" className="text-center lg:text-left mb-2">
              {closingCta.eyebrow}
            </SectionEyebrow>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {closingCta.title}
            </h2>

            <p className="text-sm sm:text-base text-[#CEEEFF] leading-relaxed mb-6">
              {closingCta.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <PrimaryButton
                size="lg"
                onClick={() =>
                  openDemoModal({ requestType: "demo", source: "final-cta" })
                }
                className="px-8 py-3.5 text-[16px]"
              >
                {closingCta.primaryCta}
              </PrimaryButton>

              <SecondaryButton
                size="lg"
                variant="white"
                onClick={() =>
                  openDemoModal({ requestType: "contact", source: "final-cta" })
                }
                className="px-7 py-3.5 text-[16px]"
              >
                {closingCta.secondaryCta}
              </SecondaryButton>
            </div>
          </MotionReveal>

          {/* Right Handwritten Vertical Stack on Desktop with Stagger Reveal */}
          <MotionReveal delay={0.15} className="hidden lg:flex flex-col items-start justify-center pl-6 select-none text-left min-w-[200px]">
            {closingCta.handwritingStack.map((word, idx) => (
              <span
                key={idx}
                className="font-handwriting text-3xl xl:text-4xl font-bold text-white my-0.5 tracking-wide leading-tight drop-shadow-md"
              >
                {word} {idx < closingCta.handwritingStack.length - 1 && "•"}
              </span>
            ))}
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
