import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { referencePreviewContent } from "@/content/siteContent";
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from "@/components/motion/MotionReveal";

export function SchoolsSection() {
  const { schools } = referencePreviewContent;

  const schoolLogos = [
    { name: "Oakridge International School", src: "/brand/schools/oakridge.svg", width: 160, height: 40, className: "w-[130px] sm:w-[150px]" },
    { name: "Greenwood High", src: "/brand/schools/greenwood-high.svg", width: 170, height: 40, className: "w-[140px] sm:w-[160px]" },
    { name: "Vidyashilp Academy", src: "/brand/schools/vidyashilp.svg", width: 160, height: 40, className: "w-[135px] sm:w-[155px]" },
    { name: "Inventure Academy", src: "/brand/schools/inventure.svg", width: 160, height: 40, className: "w-[130px] sm:w-[150px]" },
    { name: "TISB Bangalore", src: "/brand/schools/tisb.svg", width: 160, height: 40, className: "w-[130px] sm:w-[150px]" },
    { name: "Stonehill International School", src: "/brand/schools/stonehill.svg", width: 160, height: 40, className: "w-[135px] sm:w-[155px]" },
  ];

  return (
    <section
      id="schools"
      aria-label="Progressive Partner Schools"
      className="w-full pt-10 sm:pt-12 pb-12 sm:pb-14 bg-white border-t border-[#E3EAF4]/60"
    >
      <Container>
        {/* Section Heading */}
        <MotionReveal className="text-center max-w-[800px] mx-auto mb-8 sm:mb-10">
          <SectionEyebrow variant="primary" className="text-center">
            {schools.eyebrow}
          </SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081F44] tracking-tight leading-tight">
            {schools.title}
          </h2>
        </MotionReveal>

        {/* 6 School Logos: Staggered reveal with smooth hover scaling */}
        <MotionStaggerContainer
          staggerChildren={0.06}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8 items-center justify-items-center"
        >
          {schoolLogos.map((logo) => (
            <MotionStaggerItem key={logo.name}>
              <div
                className="flex items-center justify-center p-2 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-default"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  priority
                  className={`h-9 sm:h-10 w-auto object-contain ${logo.className}`}
                />
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </Container>
    </section>
  );
}
