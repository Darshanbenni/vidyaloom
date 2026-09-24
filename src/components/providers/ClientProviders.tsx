"use client";

import React from "react";
import { MotionConfig, LazyMotion, domAnimation } from "motion/react";
import { DemoModalProvider } from "@/components/forms/DemoModalContext";
import { BookDemoDialog } from "@/components/forms/BookDemoDialog";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <DemoModalProvider>
            {children}
            <BookDemoDialog />
          </DemoModalProvider>
        </LazyMotion>
      </MotionConfig>
    </SmoothScroll>
  );
}
