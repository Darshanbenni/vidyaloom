"use client";

import React from "react";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { referencePreviewContent } from "@/content/siteContent";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function TestimonialsSection() {
  const { testimonials } = referencePreviewContent;

  // Duplicate items for a seamless continuous marquee loop
  const marqueeCards = [
    ...testimonials.items,
    ...testimonials.items,
    ...testimonials.items,
    ...testimonials.items,
  ];

  return (
    <section
      id="testimonials"
      aria-label="Educator and Student Testimonials"
      className="w-full pt-10 sm:pt-12 pb-10 sm:pb-12 bg-[#F6F9FE] border-t border-[#E3EAF4]/70 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <MotionReveal className="text-center max-w-[760px] mx-auto mb-6 sm:mb-7">
          <SectionEyebrow variant="primary" className="text-center">
            {testimonials.eyebrow}
          </SectionEyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081F44] tracking-tight leading-tight mb-3">
            {testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-[#50627E] leading-relaxed max-w-md mx-auto">
            {testimonials.subtitle}
          </p>
        </MotionReveal>
      </Container>

      {/* Infinite Scrolling Marquee Container */}
      <div className="w-full overflow-hidden relative py-4 sm:py-5">
        {/* Left Fade Mask */}
        <div
          className="w-12 sm:w-28 pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-[#F6F9FE] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Right Fade Mask */}
        <div
          className="w-12 sm:w-28 pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l from-[#F6F9FE] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Inner flex track */}
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee pr-6">
          {marqueeCards.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[290px] sm:w-[380px] shrink-0 bg-white rounded-2xl p-5 sm:p-6 border border-[#E3EAF4] shadow-xs flex flex-col justify-between transition-all duration-[180ms] ease-out hover:-translate-y-[2px] hover:shadow-md select-none"
            >
              <div>
                {/* Card Header: Soft Gray Opening & Closing Quote Marks */}
                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-6 h-6 text-[#CBD8E9] fill-[#CBD8E9]" />
                  <Quote className="w-6 h-6 text-[#CBD8E9] fill-[#CBD8E9] rotate-180" />
                </div>

                {/* Quote text */}
                <blockquote className="text-sm leading-relaxed text-slate-600 mb-3">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Details */}
              <div className="mt-3 pt-3 border-t border-[#E3EAF4]">
                <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                  {item.author}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                  {item.role}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                  {item.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
