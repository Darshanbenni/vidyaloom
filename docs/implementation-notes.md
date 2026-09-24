# EduNex — Implementation Notes

## 1. Architectural Decisions
- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript.
- **Styling:** Tailwind CSS v4 with CSS custom properties for all design tokens defined in `:root`.
- **Typography:** 
  - Primary / UI: `Inter` loaded via `next/font/google` (`--font-inter`).
  - Decorative / Handwriting: `Caveat` loaded via `next/font/google` (`--font-handwriting`).
- **Icons:** `lucide-react` (clean, fine-stroke vector SVG icons).
- **Dialog & Accessibility:** Accessible Dialog primitive (`@radix-ui/react-dialog`) with custom styles matching the reference.
- **Validation:** `zod` for both client-side and server-side validation.
- **Animation System:** `motion` (Motion for React) configured with accessible fallback and reduced motion handling.
- **Email Backend:** Server-side route handler at `POST /api/demo` using Resend Node SDK, single-use Cloudflare Turnstile token validation, and Upstash Redis rate-limiting/idempotency.

## 2. Design Decisions
- **Desktop Comparison Viewport:** 1428 CSS px (2× uniform mapping from the 714 × 2048 px reference design).
- **Content Container:** 1296–1312 px centered max-width with 64–70 px gutter spacing.
- **Hero Structure:** Dual gradients (subtle atmospheric pale blue/lavender background vs. vivid blue-violet text gradient for "Smarter Tomorrow"). Photo layered on right with CSS mask and wash.
- **Content Separation:** Strict segregation between:
  - `reference-preview` dataset: Identical copy, people, metrics, and quotes matching the reference for accurate local visual alignment.
  - `production` dataset: Clean verified institutional claims and business configurations.
