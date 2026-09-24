"use client";

import React, { useEffect, useRef, useMemo } from "react";

interface RunningNumberProps {
  /** The value to display, e.g. "500+", "100K+", "98%", "1,248" */
  value: string | number;
  /** Duration of the count-up animation in milliseconds (default: 1600ms) */
  duration?: number;
  /** Delay before animation starts in milliseconds (default: 0ms) */
  delay?: number;
  /** Additional CSS class names */
  className?: string;
}

interface ParsedNumber {
  prefix: string;
  num: number;
  suffix: string;
  decimals: number;
  hasComma: boolean;
}

function parseNumberString(val: string | number): ParsedNumber | null {
  const str = String(val).trim();
  const match = str.match(/^([^0-9.]*)([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;

  const prefix = match[1] || "";
  const numStr = match[2].replace(/,/g, "");
  const suffix = match[3] || "";
  const num = parseFloat(numStr);
  if (isNaN(num)) return null;

  const decimalMatch = match[2].match(/\.([0-9]+)/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const hasComma = match[2].includes(",");

  return { prefix, num, suffix, decimals, hasComma };
}

function formatNumber(val: number, decimals: number, hasComma: boolean): string {
  if (decimals > 0) {
    const fixed = val.toFixed(decimals);
    if (hasComma) {
      const [intPart, decPart] = fixed.split(".");
      return `${parseInt(intPart, 10).toLocaleString("en-US")}.${decPart}`;
    }
    return fixed;
  }
  const rounded = Math.round(val);
  return hasComma ? rounded.toLocaleString("en-US") : String(rounded);
}

export function RunningNumber({
  value,
  duration = 1600,
  delay = 0,
  className = "",
}: RunningNumberProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  const parsed = useMemo(() => parseNumberString(value), [value]);

  useEffect(() => {
    if (!parsed || !numRef.current) return;

    const target = parsed.num;
    const decimals = parsed.decimals;
    const hasComma = parsed.hasComma;

    // Check if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      numRef.current.textContent = formatNumber(target, decimals, hasComma);
      return;
    }

    let frameId: number;
    let timeoutId: NodeJS.Timeout;
    let hasAnimated = false;

    const runCountUp = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      let startTime: number | null = null;

      const update = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = Math.max(0, now - startTime);
        const progress = Math.min(elapsed / duration, 1);

        // Ease Out Cubic: fast initial count, smooth landing into target
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.max(0, ease * target);

        if (numRef.current) {
          numRef.current.textContent = formatNumber(current, decimals, hasComma);
        }

        if (progress < 1) {
          frameId = requestAnimationFrame(update);
        } else if (numRef.current) {
          numRef.current.textContent = formatNumber(target, decimals, hasComma);
        }
      };

      frameId = requestAnimationFrame(update);
    };

    const targetEl = containerRef.current || numRef.current;
    if (!targetEl) return;

    // Check if element is already in the viewport upon mount (e.g. hero section)
    const rect = targetEl.getBoundingClientRect();
    const isInViewport = rect.top < (typeof window !== "undefined" ? window.innerHeight : 800);

    if (isInViewport) {
      // Start counting up IMMEDIATELY on mount — zero artificial delay or observer lag
      if (delay > 0) {
        timeoutId = setTimeout(runCountUp, delay);
        return () => {
          clearTimeout(timeoutId);
          if (frameId) cancelAnimationFrame(frameId);
        };
      } else {
        runCountUp();
        return () => {
          if (frameId) cancelAnimationFrame(frameId);
        };
      }
    }

    // For elements below the fold, trigger when user scrolls into view
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            if (delay > 0) {
              timeoutId = setTimeout(runCountUp, delay);
            } else {
              runCountUp();
            }
            observer.disconnect();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(targetEl);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    } else {
      runCountUp();
      return () => {
        if (frameId) cancelAnimationFrame(frameId);
      };
    }
  }, [parsed, duration, delay]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`tabular-nums inline-flex items-baseline ${className}`}
      aria-label={String(value)}
    >
      {parsed.prefix && <span>{parsed.prefix}</span>}
      <span ref={numRef}>0</span>
      {parsed.suffix && <span className="ml-0.5">{parsed.suffix}</span>}
    </span>
  );
}
