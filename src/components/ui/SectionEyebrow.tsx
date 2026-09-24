import React from "react";
import { cn } from "@/lib/utils";

interface SectionEyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "navy" | "white" | "teal";
}

export function SectionEyebrow({
  children,
  className,
  variant = "primary",
  ...props
}: SectionEyebrowProps) {
  const colorMap = {
    primary: "text-[#0098FF]",
    navy: "text-[#081F44]",
    white: "text-white/80",
    teal: "text-[#00B990]",
  };

  return (
    <p
      className={cn(
        "text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.10em] sm:tracking-[0.16em] mb-3 leading-normal",
        colorMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
