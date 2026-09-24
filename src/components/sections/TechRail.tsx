import React from "react";
import Image from "next/image";
import { referencePreviewContent } from "@/content/siteContent";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function TechRail() {
  const { techRail } = referencePreviewContent;

  return (
    <section
      id="tech-rail"
      aria-label="Technology and Industry Ecosystem"
      className="w-full bg-white py-3.5 sm:py-6 md:py-8 border-b border-[#E3EAF4]/60"
    >
      <MotionReveal className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop View (md: and up): Preserved exactly as the user loved */}
        <div className="hidden md:flex items-center justify-center gap-5 md:gap-7 lg:gap-8">
          {/* 1. "TRUSTED & INSPIRED BY INDUSTRY LEADERS" text */}
          <div className="text-[11px] md:text-xs font-bold tracking-wider text-slate-800 uppercase leading-snug shrink-0 text-left">
            {techRail.eyebrow.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </div>

          {/* 2. Vertical divider line */}
          <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

          {/* 3. Google logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/brand/technology/google.svg"
              alt="Google"
              width={272}
              height={92}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
              priority
            />
          </div>

          {/* 4. Vertical divider line */}
          <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

          {/* 5. Amazon logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/brand/technology/amazon.svg"
              alt="Amazon"
              width={603}
              height={182}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
              priority
            />
          </div>

          {/* 6. Vertical divider line */}
          <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

          {/* 7. Microsoft logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/brand/technology/microsoft.svg"
              alt="Microsoft"
              width={338}
              height={72}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
              priority
            />
          </div>

          {/* 8. Vertical divider line */}
          <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

          {/* 9. Meta logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/brand/technology/meta.svg"
              alt="Meta"
              width={948}
              height={191}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
              priority
            />
          </div>

          {/* 10. Vertical divider line */}
          <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

          {/* 11. NVIDIA logo */}
          <div className="shrink-0 flex items-center justify-center">
            <Image
              src="/brand/technology/nvidia.svg"
              alt="NVIDIA"
              width={512}
              height={98}
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
              priority
            />
          </div>
        </div>

        {/* Mobile View (< md): Clean, organized, balanced layout */}
        <div className="flex md:hidden flex-col items-center justify-center text-center">
          {/* Eyebrow Label */}
          <p className="text-[11px] font-bold tracking-wider text-slate-800 uppercase mb-3">
            TRUSTED &amp; INSPIRED BY INDUSTRY LEADERS
          </p>

          {/* Logos organized in balanced, centered rows */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-[300px] mx-auto">
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/brand/technology/google.svg"
                alt="Google"
                width={272}
                height={92}
                className="h-5 w-auto object-contain shrink-0"
                priority
              />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/brand/technology/amazon.svg"
                alt="Amazon"
                width={603}
                height={182}
                className="h-5 w-auto object-contain shrink-0"
                priority
              />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/brand/technology/microsoft.svg"
                alt="Microsoft"
                width={338}
                height={72}
                className="h-5 w-auto object-contain shrink-0"
                priority
              />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/brand/technology/meta.svg"
                alt="Meta"
                width={948}
                height={191}
                className="h-5 w-auto object-contain shrink-0"
                priority
              />
            </div>
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/brand/technology/nvidia.svg"
                alt="NVIDIA"
                width={512}
                height={98}
                className="h-5 w-auto object-contain shrink-0"
                priority
              />
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
