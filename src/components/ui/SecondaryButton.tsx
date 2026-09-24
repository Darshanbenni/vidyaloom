"use client";

import React from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
  variant?: "outline" | "white" | "ghost";
}

export function SecondaryButton({
  children,
  className,
  icon,
  size = "md",
  asLink = false,
  href,
  variant = "outline",
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-[14px]",
    md: "px-6 py-3 text-[15px] sm:text-[16px]",
    lg: "px-8 py-3.5 text-[16px] sm:text-[17px]",
  };

  const variantClasses = {
    outline:
      "border border-[#E3EAF4] bg-white/80 hover:bg-white text-[#081F44] shadow-xs hover:border-[#CBD8E9] hover:shadow-md",
    white:
      "bg-white text-[#081F44] hover:bg-[#F0F4FE] shadow-sm hover:shadow-md",
    ghost:
      "bg-transparent text-[#081F44] hover:bg-[#F0F4FE]",
  };

  const classes = cn(
    "group inline-flex items-center justify-center font-semibold rounded-full cursor-pointer select-none transition-colors duration-180 ease-out",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {icon && <span className="mr-2.5 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (asLink && href) {
    return (
      <m.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.025, y: -1.5 }}
        whileTap={{ scale: 0.975 }}
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
      whileHover={{ scale: 1.025, y: -1.5 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
    >
      {content}
    </m.button>
  );
}
