"use client";

import React, { useState } from "react";
import { ArrowRight, Layers, Globe, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { CheckList } from "@/components/ui/CheckList";
import { referencePreviewContent, type SolutionCard } from "@/content/siteContent";
import { SolutionDetailsModal } from "@/components/forms/SolutionDetailsModal";
import { MotionReveal, MotionStaggerContainer, MotionStaggerItem } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

export function SolutionsSection() {
  const { solutions } = referencePreviewContent;
  const [selectedCard, setSelectedCard] = useState<SolutionCard | null>(null);

  const cardStyles = {
    blue: "bg-[#EAF4FE] border-[#CBDDF8]",
    mint: "bg-[#E9FBF4] border-[#C2EFE0]",
    violet: "bg-[#F2EDFD] border-[#DFD1F8]",
  };

  const getIcon = (type: SolutionCard["iconType"], color: SolutionCard["color"]) => {
    switch (type) {
      case "erp":
        return (
          <IconBadge variant={color} size="md">
            <Layers className="w-6 h-6" />
          </IconBadge>
        );
      case "crm":
        return (
          <IconBadge variant={color} size="md">
            <Globe className="w-6 h-6" />
          </IconBadge>
        );
      case "ai":
        return (
          <IconBadge variant={color} size="md">
            <Sparkles className="w-6 h-6" />
          </IconBadge>
        );
    }
  };

  return (
    <>
      <section
        id="solutions"
        aria-label="Comprehensive Educational Solutions"
        className="w-full pt-10 sm:pt-12 pb-12 sm:pb-14 bg-white"
      >
        <Container>
          {/* Header */}
          <MotionReveal className="text-center max-w-[800px] mx-auto mb-10 sm:mb-12">
            <SectionEyebrow variant="primary" className="text-center">
              {solutions.eyebrow}
            </SectionEyebrow>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-2 text-[#081F44] tracking-tight leading-tight mb-4">
              {solutions.title}
            </h2>
            <p className="text-sm sm:text-base text-[#50627E] leading-relaxed max-w-md sm:max-w-[680px] mx-auto px-2">
              {solutions.subtitle}
            </p>
          </MotionReveal>

          {/* 3 Pastel Cards Grid with Stagger Reveal and Hover Blooming */}
          <MotionStaggerContainer
            staggerChildren={0.08}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch"
          >
            {solutions.cards.map((card) => (
              <MotionStaggerItem
                key={card.id}
                className="h-full w-full"
              >
                <div
                  className={cn(
                    "rounded-3xl p-7 sm:p-8 lg:p-9 flex flex-col justify-between border transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 hover:border-slate-300 h-full group",
                    cardStyles[card.color]
                  )}
                >
                  <div>
                    {/* Card Header: Icon + Arrow Circle Action */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="transition-transform duration-300 group-hover:scale-105">
                        {getIcon(card.iconType, card.color)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        aria-label={`View full details for ${card.title}`}
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#081F44] hover:text-[#0098FF] flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-110 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#0098FF] cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-[#081F44] leading-snug mb-3">
                      {card.title}
                    </h3>

                    <p className="text-[14px] sm:text-[15px] text-[#50627E] leading-relaxed mb-6 min-h-[44px]">
                      {card.tagline}
                    </p>

                    {/* Feature Checkpoints */}
                    <div className="pt-4 border-t border-black/5">
                      <CheckList items={card.bullets} color={card.color} />
                    </div>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </Container>
      </section>

      {/* Interactive Solution Details Modal */}
      <SolutionDetailsModal
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
}
