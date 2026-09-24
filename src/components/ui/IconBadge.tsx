import React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "blue" | "mint" | "violet" | "dark" | "teal";
  size?: "sm" | "md" | "lg";
}

export function IconBadge({
  children,
  variant = "blue",
  size = "md",
  className,
  ...props
}: IconBadgeProps) {
  const variantStyles = {
    blue: "bg-gradient-to-br from-[#0098FF] to-[#0664FF] text-white shadow-sm shadow-[#0098FF]/20",
    mint: "bg-gradient-to-br from-[#00B990] to-[#009373] text-white shadow-sm shadow-[#00B990]/20",
    violet: "bg-gradient-to-br from-[#8745FF] to-[#6E2CF3] text-white shadow-sm shadow-[#8745FF]/20",
    dark: "bg-white/10 text-white border border-white/15",
    teal: "bg-[#00B990]/15 text-[#00B990]",
  };

  const sizeStyles = {
    sm: "w-9 h-9 rounded-xl text-[16px]",
    md: "w-12 h-12 rounded-2xl text-[22px]",
    lg: "w-14 h-14 rounded-2xl text-[26px]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center flex-shrink-0 transition-transform duration-150",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
