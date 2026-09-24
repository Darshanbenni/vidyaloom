"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
  variant?: "default" | "demo";
}

export function PrimaryButton({
  children,
  className,
  icon = true,
  size = "md",
  asLink = false,
  href,
  variant = "default",
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    xs: "px-4 py-1.5 text-xs font-medium",
    sm: "px-5 py-2.5 text-[14px]",
    md: "px-6 py-3 text-[15px] sm:text-[16px]",
    lg: "px-8 py-3.5 text-[16px] sm:text-[17px]",
  };

  const shadowClasses =
    size === "xs"
      ? "shadow-sm hover:shadow-md"
      : variant === "demo"
      ? "shadow-[0_8px_20px_rgba(9,139,255,0.28)] hover:shadow-[0_12px_28px_rgba(9,139,255,0.40)]"
      : "shadow-[0_8px_22px_rgba(0,152,255,0.24)] hover:shadow-[0_14px_30px_rgba(0,152,255,0.42)]";

  const variantClasses =
    variant === "demo"
      ? "bg-[#098BFF] hover:bg-[#077cdb] text-white"
      : "gradient-button";

  const classes = cn(
    "group relative inline-flex items-center justify-center font-semibold rounded-full cursor-pointer overflow-hidden transition-all duration-200 select-none",
    variantClasses,
    shadowClasses,
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight
          className={cn(
            "relative z-10 transition-transform duration-200 ease-out group-hover:translate-x-1",
            size === "xs" ? "ml-1 w-3.5 h-3.5" : "ml-2 w-4 h-4"
          )}
        />
      )}
      {/* Light-sweep shimmer reflection on hover */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-full"
        aria-hidden="true"
      />
    </>
  );

  if (asLink && href) {
    return (
      <m.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      type={props.type || "button"}
      className={classes}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
    >
      {content}
    </m.button>
  );
}
