"use client";

import React from "react";
import Image from "next/image";
import brandLogo from "@assets/logo.webp";
import brandIcon from "@assets/icon.webp";

interface BrandLogoProps {
  className?: string;
  iconSize?: number;
  showTagline?: boolean;
}

export function BrandLogoIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={brandIcon}
      alt="Vidyaloom icon"
      width={size}
      height={size}
      priority
      unoptimized
      className={`object-contain flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function BrandLogo({
  className = "",
}: BrandLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={brandLogo}
        alt="Vidyaloom"
        width={180}
        height={46}
        priority
        unoptimized
        className="h-9 sm:h-10 w-auto object-contain shrink-0 transition-transform duration-200 hover:scale-[1.02]"
      />
    </div>
  );
}
