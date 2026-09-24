"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { referencePreviewContent } from "@/content/siteContent";
import { useDemoModal } from "@/components/forms/DemoModalContext";
import { VideoOverviewModal } from "@/components/forms/VideoOverviewModal";
import { RunningNumber } from "@/components/motion/RunningNumber";
import { MotionReveal } from "@/components/motion/MotionReveal";
import heroStudentsDesktop from "@assets/source/hero-students-desktop.webp";

export function HeroSection() {
  const { hero } = referencePreviewContent;
  const { openDemoModal } = useDemoModal();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        aria-label="Hero Section"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#E5EFFB] pt-9 sm:pt-12 lg:pt-16 pb-4 sm:pb-14 lg:pb-16"
      >
        {/* Layer 1: Background Atmospheric Radial Glows */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 40% 76%, rgba(190, 194, 255, 0.45) 0%, transparent 36%), radial-gradient(ellipse at 26% 100%, rgba(206, 238, 255, 0.72) 0%, transparent 50%), linear-gradient(115deg, #ffffff 0%, #f8fbff 35%, #edf6ff 70%, #e5effb 100%)",
          }}
          aria-hidden="true"
        />

        {/* Mobile Background Integrated Photographic Layer (< md) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none md:hidden z-0">
          <Image
            src={heroStudentsDesktop}
            alt="Indian high school student smiling on campus"
            fill
            priority
            unoptimized
            aria-hidden="true"
            className="object-cover object-[52%_0%] opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90" />
        </div>

        {/* Layer 2: Desktop Absolute Photographic Layer (Matching Reference Composition, >= lg) */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-y-0 right-0 w-[58%] h-full"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.9) 28%, #000 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 12%, rgba(0,0,0,0.9) 28%, #000 100%)",
            }}
          >
            <Image
              src={heroStudentsDesktop}
              alt="Indian high school student smiling on campus"
              fill
              priority
              unoptimized
              sizes="(max-width: 1428px) 60vw, 860px"
              className="object-cover object-[80%_24%]"
            />
          </div>

          {/* Photo Wash Layer: Fades seamlessly into clean white copy area on left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.98) 28%, rgba(250, 252, 255, 0.25) 45%, transparent 62%), linear-gradient(0deg, rgba(222, 241, 255, 0.35) 0%, transparent 20%)",
            }}
          />
        </div>

        {/* Layer 3: Main Foreground Content */}
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 7 Columns (Full width on mobile < md): Text, CTAs & Key Numbers */}
            <div className="w-full md:col-span-7 flex flex-col items-start max-w-[660px]">
              <MotionReveal delay={0}>
                <SectionEyebrow variant="primary">
                  {hero.eyebrow}
                </SectionEyebrow>

                <h1 className="text-[34px] sm:text-[48px] md:text-[52px] lg:text-[62px] font-extrabold text-[#081F44] tracking-tight leading-[1.08] mb-4 sm:mb-6">
                  {hero.headline.line1} <br />
                  {hero.headline.line2} <br />
                  <span className="gradient-headline">{hero.headline.line3}</span>
                </h1>
              </MotionReveal>

              <MotionReveal delay={0.08}>
                <div className="text-sm sm:text-base text-[#50627E] leading-relaxed mb-5 sm:mb-8 max-w-md sm:max-w-[560px]">
                  <p className="mb-1 text-[#081F44]">
                    Technology. Training. <strong className="font-extrabold text-[#081F44]">Transformation.</strong>
                  </p>
                  <p>Complete solutions to run, grow and future-ready your institution.</p>
                </div>
              </MotionReveal>

              {/* Action Button */}
              <MotionReveal delay={0.16} className="flex items-center mb-6 sm:mb-10 lg:mb-12">
                <PrimaryButton
                  variant="demo"
                  size="lg"
                  onClick={() => openDemoModal({ requestType: "demo", source: "hero" })}
                  className="px-7 py-3.5 text-[16px]"
                >
                  {hero.primaryCta}
                </PrimaryButton>
              </MotionReveal>

              {/* Three Key Statistics */}
              <MotionReveal delay={0.24} className="w-full max-w-full pt-4 sm:pt-6 border-t border-[#CBD8E9]/70 grid grid-cols-3 gap-0.5 sm:gap-6 divide-x divide-[#CBD8E9]/60 text-center py-2 sm:py-4">
                {hero.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0
                        ? "pr-1.5 sm:pr-4"
                        : idx === 1
                        ? "px-1 sm:px-4"
                        : "pl-1.5 sm:pl-4"
                    }
                  >
                    <span className="text-lg sm:text-3xl font-bold text-[#081F44] tracking-tight leading-none block">
                      <RunningNumber value={stat.value} delay={idx * 40} duration={1400} />
                    </span>
                    <span className="text-[10px] sm:text-[13px] font-semibold text-[#50627E] mt-1 block leading-tight break-words">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </MotionReveal>
            </div>

            {/* Right Columns: Desktop & Tablet Presentation (hidden on mobile < md) */}
            <div className="hidden md:flex md:col-span-5 relative w-full flex-col items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[540px]">
              {/* Tablet photo container (renders only on md:block and hidden on lg where Layer 2 is used) */}
              <MotionReveal delay={0.1} className="hidden md:block lg:hidden w-full relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-lg mb-6">
                <Image
                  src={heroStudentsDesktop}
                  alt="Indian high school student smiling on campus"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 45vw, 500px"
                  className="object-cover object-[75%_25%]"
                />
              </MotionReveal>

              {/* Desktop Decorative Element 1: Handwritten "Future Ready Students" (left of photo) */}
              <MotionReveal delay={0.3} className="hidden lg:block absolute -left-8 top-[14%] z-20 pointer-events-none select-none text-left">
                <span className="font-handwriting text-[25px] xl:text-[28px] font-bold text-[#081F44] drop-shadow-xs block leading-tight rotate-[-6deg]">
                  Future <br />
                  Ready <br />
                  Students
                </span>
              </MotionReveal>

              {/* Desktop Decorative Element 2: Handwritten Note upper-right with green underline */}
              <MotionReveal delay={0.35} className="hidden lg:block absolute right-0 top-1 z-20 pointer-events-none select-none text-right">
                <span className="font-handwriting text-[21px] xl:text-[23px] font-bold text-[#081F44] block leading-tight">
                  Technology <br />
                  Today. <br />
                  Brighter <br />
                  Tomorrow
                </span>
                <svg className="w-24 h-2 ml-auto mt-1" viewBox="0 0 100 8" fill="none">
                  <path d="M2 6C30 2 70 2 98 6" stroke="#00B990" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </MotionReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Video / Platform Overview Walkthrough Dialog */}
      <VideoOverviewModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </>
  );
}
