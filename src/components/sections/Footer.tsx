"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";
import { referencePreviewContent } from "@/content/siteContent";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function Footer() {
  const { brand, navigation } = referencePreviewContent;

  return (
    <footer
      id="contact"
      className="w-full bg-white border-t border-[#E3EAF4] py-8 sm:py-10"
      aria-label="Site Footer"
    >
      <Container>
        <MotionReveal className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Brand Mark & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  if (window.location.hash) {
                    window.history.replaceState(null, "", window.location.pathname);
                  }
                }
              }}
              className="inline-block mb-1.5 focus-visible:outline-2 focus-visible:outline-[#0098FF] rounded-sm cursor-pointer"
            >
              <BrandLogo iconSize={36} showTagline={false} />
            </Link>
            <p className="text-[12px] text-[#50627E]">
              © {new Date().getFullYear()} {brand.name}. Smarter Schools, Brighter Futures.
            </p>
          </div>

          {/* Centered Navigation Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[13px] sm:text-[14px] font-medium text-[#50627E]"
            aria-label="Footer Navigation"
          >
            {navigation.map((item, idx) => (
              <React.Fragment key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-[#0098FF] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#0098FF] rounded-sm"
                >
                  {item.label}
                </a>
                {idx < navigation.length - 1 && (
                  <span className="text-[#CBD8E9] select-none hidden sm:inline" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social Icons on Right */}
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Vidyaloom on LinkedIn (opens in new window)"
              className="w-8 h-8 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:scale-115 hover:shadow-md transition-all duration-200 shadow-xs"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.88 0-1.6.72-1.6 1.6 0 .89.72 1.61 1.6 1.61.89 0 1.61-.72 1.61-1.61 0-.88-.72-1.6-1.61-1.6Z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Vidyaloom on YouTube (opens in new window)"
              className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-115 hover:shadow-md transition-all duration-200 shadow-xs"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="m10 15 5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Vidyaloom on Instagram (opens in new window)"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center hover:scale-115 hover:shadow-md transition-all duration-200 shadow-xs"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
              </svg>
            </a>
          </div>
        </MotionReveal>
      </Container>
    </footer>
  );
}
