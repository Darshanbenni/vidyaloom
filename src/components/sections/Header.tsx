"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Menu, X, ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { referencePreviewContent } from "@/content/siteContent";
import { useDemoModal } from "@/components/forms/DemoModalContext";

export function Header() {
  const { brand, navigation } = referencePreviewContent;
  const { openDemoModal } = useDemoModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key and return focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E3EAF4] shadow-xs">
      <div className="h-14 flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Group 1 (Left): Brand logo ("Vidyaloom") */}
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
          className="flex items-center rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-[#0098FF] focus-visible:outline-offset-4 shrink-0 cursor-pointer"
          aria-label={`${brand.name} - Home`}
        >
          <BrandLogo />
        </Link>

        {/* Group 2 (Right): Navigation links & compact CTA */}
        <div className="flex items-center gap-2 sm:gap-6 ml-auto">
          {/* Desktop Navigation Links (hidden on mobile < md) */}
          <nav
            className="hidden md:flex items-center gap-5 lg:gap-6"
            aria-label="Desktop Navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Compact "Book a Demo" CTA Button (visible from sm and up; accessible on mobile via drawer & hero) */}
          <div className="hidden sm:block shrink-0">
            <PrimaryButton
              variant="demo"
              size="xs"
              onClick={() => openDemoModal({ requestType: "demo", source: "header" })}
              className="px-3.5 sm:px-4 py-1.5 text-xs font-medium rounded-full shrink-0 shadow-sm"
            >
              Book a Demo
            </PrimaryButton>
          </div>

          {/* Mobile Menu Trigger Button (visible only below md) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-[#F0F4FE] text-[#081F44] hover:bg-[#E5F1FE] focus-visible:outline-2 focus-visible:outline-[#0098FF] cursor-pointer transition-colors shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          className="md:hidden fixed inset-x-0 top-[56px] bottom-0 z-50 bg-[#081F44]/40 backdrop-blur-xs animate-in fade-in-0 duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-[#E3EAF4] shadow-2xl px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-[17px] font-semibold text-[#081F44] hover:text-[#0098FF] py-2 border-b border-[#E3EAF4]/50 flex items-center justify-between transition-colors focus-visible:outline-2 focus-visible:outline-[#0098FF] rounded-sm"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#50627E]/60" />
                </a>
              ))}
            </nav>

            <div className="pt-2">
              <PrimaryButton
                variant="demo"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDemoModal({ requestType: "demo", source: "mobile-header" });
                }}
              >
                Book a Demo
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
