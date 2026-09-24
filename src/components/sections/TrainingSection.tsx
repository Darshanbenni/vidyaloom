"use client";

import React from "react";
import Image from "next/image";
import { Code2, Users, CloudUpload, Award, Sparkles, Cpu, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { referencePreviewContent } from "@/content/siteContent";
import { useDemoModal } from "@/components/forms/DemoModalContext";
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from "@/components/motion/MotionReveal";
import trainingStudents from "@assets/source/training-students.webp";

export function TrainingSection() {
  const { training } = referencePreviewContent;
  const { openDemoModal } = useDemoModal();

  const featureIcons = [
    <Code2 key="1" className="w-5 h-5 text-[#0098FF]" />,
    <Users key="2" className="w-5 h-5 text-[#00B990]" />,
    <CloudUpload key="3" className="w-5 h-5 text-[#8745FF]" />,
    <Award key="4" className="w-5 h-5 text-[#FFAF00]" />,
  ];

  const badges = [
    { label: "Build Live Apps", icon: <Sparkles className="w-3.5 h-3.5 text-white" /> },
    { label: "Work with AI", icon: <Cpu className="w-3.5 h-3.5 text-white" /> },
    { label: "Deploy to the Cloud", icon: <Globe className="w-3.5 h-3.5 text-white" /> },
  ];

  return (
    <section
      id="training"
      aria-label="Future-Ready Learning and Industry Training"
      className="w-full min-h-[580px] lg:min-h-[632px] bg-[#0F2748] text-white relative overflow-hidden py-12 sm:py-14 lg:py-0 flex items-center"
    >
      {/* Desktop Absolute Photographic Layer on Right */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-[58%] h-full"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,1) 40%, #000 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 16%, rgba(0,0,0,1) 40%, #000 100%)",
          }}
        >
          <Image
            src={trainingStudents}
            alt="Students collaborating on AI and coding projects in modern lab"
            fill
            unoptimized
            sizes="(max-width: 1428px) 58vw, 820px"
            className="object-cover object-[70%_40%]"
          />
        </div>

        {/* Navy Gradient Overlay on Left to guarantee crisp text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0F2748 0%, rgba(15, 39, 72, 0.98) 46%, rgba(15, 39, 72, 0.65) 60%, transparent 80%)",
          }}
        />
      </div>

      <Container className="relative z-10 py-4 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy, Industry Logos, Features & Workshop CTA */}
          <MotionReveal className="lg:col-span-7 flex flex-col items-start max-w-[640px]">
            <SectionEyebrow variant="white">
              {training.eyebrow}
            </SectionEyebrow>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight break-words mb-3">
              {training.title}
            </h2>

            <p className="text-[15px] sm:text-[17px] font-semibold text-[#CEEEFF] mb-4">
              {training.subheading}
            </p>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              {training.description}
            </p>

            {/* Guided By Technology Logos Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 my-4 sm:my-6">
              {/* 1. Google Full-Color Official Logo */}
              <div className="flex items-center shrink-0 opacity-95 hover:opacity-100 transition-opacity">
                <Image
                  src="/brand/technology/google.svg"
                  alt="Google"
                  width={272}
                  height={92}
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain shrink-0"
                />
              </div>

              {/* Vertical divider */}
              <div className="h-4 sm:h-5 w-[1px] bg-white/20 shrink-0" aria-hidden="true" />

              {/* 2. Amazon Logo */}
              <div className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/brand/technology/amazon-white.svg"
                  alt="Amazon"
                  width={603}
                  height={182}
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain shrink-0"
                />
              </div>

              {/* Vertical divider */}
              <div className="h-4 sm:h-5 w-[1px] bg-white/20 shrink-0" aria-hidden="true" />

              {/* 3. Microsoft Logo */}
              <div className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/brand/technology/microsoft-white.svg"
                  alt="Microsoft"
                  width={338}
                  height={72}
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain shrink-0"
                />
              </div>

              {/* Vertical divider */}
              <div className="h-4 sm:h-5 w-[1px] bg-white/20 shrink-0" aria-hidden="true" />

              {/* and more... */}
              <span className="text-[13px] text-white/70 font-semibold whitespace-nowrap">
                and more...
              </span>
            </div>

            {/* 4 Feature Groups (2x2 Grid) with Stagger Reveal */}
            <MotionStaggerContainer
              staggerChildren={0.08}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full mb-8 sm:mb-10"
            >
              {training.features.map((feat, idx) => (
                <MotionStaggerItem key={idx}>
                  <div
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      {featureIcons[idx]}
                    </div>
                    <div>
                      <span className="text-[14px] sm:text-[15px] font-bold text-white block">
                        {feat.title}
                      </span>
                      <span className="text-[12px] text-white/70 block">
                        {feat.description}
                      </span>
                    </div>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStaggerContainer>

            {/* Workshop CTA Button */}
            <PrimaryButton
              size="lg"
              onClick={() =>
                openDemoModal({
                  requestType: "workshop",
                  interest: "AI, Coding, Robotics & Industry Training",
                  source: "training",
                })
              }
              className="px-7 py-3.5 text-[15px] sm:text-[16px]"
            >
              {training.cta}
            </PrimaryButton>
          </MotionReveal>

          {/* Right Column: Mobile Photo & Desktop Floating Badges */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]">
            {/* Mobile photo display */}
            <MotionReveal delay={0.1} className="lg:hidden w-full relative h-[300px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-6">
              <Image
                src={trainingStudents}
                alt="Students collaborating on AI project"
                fill
                unoptimized
                sizes="100vw"
                className="object-cover object-[70%_40%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2748] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-[#081F44] font-bold text-[11px] px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0098FF] flex items-center justify-center">
                      {badge.icon}
                    </span>
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>
            </MotionReveal>

            {/* Desktop Decorative Element: Handwritten Note above laptop */}
            <MotionReveal delay={0.2} className="hidden lg:block absolute top-0 left-0 z-20 pointer-events-none select-none text-left">
              <span className="font-handwriting text-[23px] xl:text-[26px] font-bold text-white block leading-tight drop-shadow-md rotate-[-4deg]">
                Students <br />
                Today <br />
                Innovators <br />
                Tomorrow
              </span>
            </MotionReveal>

            {/* Desktop 3 White HTML Badges with blue circular icons stacked on right */}
            <MotionStaggerContainer
              staggerChildren={0.08}
              delayChildren={0.15}
              className="hidden lg:flex flex-col items-end gap-2.5 absolute bottom-4 right-0 z-20"
            >
              {badges.map((badge, idx) => (
                <MotionStaggerItem key={idx}>
                  <div
                    className="bg-white text-[#081F44] font-bold text-[12px] xl:text-[13px] px-3.5 py-2 rounded-full shadow-xl border border-white flex items-center gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-200 cursor-default"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#0098FF] flex items-center justify-center flex-shrink-0">
                      {badge.icon}
                    </div>
                    <span>{badge.label}</span>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
