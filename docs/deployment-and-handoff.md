# EduNex — Deployment & Owner Handoff Guide

**Author:** Antigravity AI Engineering  
**Application:** EduNex Platform Website  
**Framework:** Next.js 16.3.5 (App Router, React 19, Tailwind CSS v4, Node.js Runtime)  
**Date:** 21 September 2026

---

## 1. Quick Commands Cheatsheet

```bash
# Install all dependencies
npm install

# Run local development server
npm run dev
# -> Opens http://localhost:3000

# Run automated integration tests (exercising API validation, rate limiting & idempotency)
node --test tests/api-demo.test.mjs

# Run TypeScript typecheck
npx tsc --noEmit

# Run ESLint check
npm run lint

# Create production build
npm run build

# Run local production server
npm run start
```

---

## 2. Where to Edit Content & Replace Assets

- **All Website Copy & Preview Content:**
  - File: `src/content/siteContent.ts`
  - Edit navigation, headline, hero statistics, solution card bullets, training description, testimonials, partner school list, and footer links.
- **Production Content Readiness Audit:**
  - File: `docs/production-content-readiness.md`
  - Lists verified vs. illustrative preview content items.
- **Source Photographic Assets:**
  - Original generator outputs: `assets/source/`
  - Optimized production WebP images: `public/images/`
  - Asset origins and dimensions manifest: `docs/asset-manifest.md`
- **Brand & Partner Vector Logos:**
  - EduNex logo: `public/brand/edunex-logo.svg`
  - Tech partner logos: `public/brand/technology/*.svg`
  - School partner logos: `public/brand/schools/*.svg`

---

## 3. Environment Variables Reference

Create a `.env.local` file in your root folder for local testing, or set these in your production host dashboard (e.g. Vercel / Railway / Render):

```dotenv
# Public (Browser-accessible) Variables
NEXT_PUBLIC_SITE_URL=https://edunex.yourdomain.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key

# Server-Only Secrets (Never prefix with NEXT_PUBLIC_)
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM="EduNex Website <enquiries@notify.yourdomain.com>"
LEADS_TO_EMAIL=darshan@yourdomain.com
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
UPSTASH_REDIS_REST_URL=https://your-upstash-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
LEAD_HASH_SECRET=secure_random_hash_string_at_least_32_chars
ALLOWED_ORIGINS=https://edunex.yourdomain.com,http://localhost:3000
```

---

## 4. One-Time Resend & Email Setup

1. **Add Sending Domain in Resend:**
   - Log into [Resend Dashboard](https://resend.com/domains) and add your domain (recommended: a subdomain like `notify.yourdomain.com`).
2. **Add DNS Records in your DNS Provider:**
   - Add the exact **TXT, MX, and CNAME** records provided in your Resend dashboard.
   - Do not guess or copy generic examples; use the exact keys from your dashboard.
   - Wait for Resend to verify DNS status (green checkmark).
3. **Generate API Key:**
   - Go to [Resend API Keys](https://resend.com/api-keys) and create a sending key.
   - Add it to `RESEND_API_KEY`.
4. **Set Recipient Email:**
   - Set `LEADS_TO_EMAIL` to the inbox where you want to receive new demo and workshop enquiries.
5. **Verify Delivery:**
   - Submit one test form on your live site.
   - Confirm receipt in your inbox (and check Spam/Junk folder initially).
   - Test clicking "Reply" in your email client to verify it replies directly to the visitor's email address.

---

## 5. Cloudflare Turnstile Bot Protection (Optional / Recommended)

1. Open Cloudflare Dashboard -> **Turnstile**.
2. Add a new widget with your website domain.
3. Copy **Site Key** -> `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy **Secret Key** -> `TURNSTILE_SECRET_KEY`.
5. If absent during local testing, the application automatically allows local submissions.

---

## 6. Upstash Redis Setup (Optional / Recommended for Multi-Instance Serverless)

1. Open [Upstash Console](https://console.upstash.com/) and create a free serverless Redis database.
2. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
3. If absent during local development, EduNex automatically uses an in-memory sliding-window counter and deduplication table.

---

## 7. Deployment Instructions (Vercel / Node.js)

Because `/api/demo` is a server-side route running in the Node.js runtime, the site requires a host capable of running Next.js server functions (do **not** use `next export` or static HTML hosting):

### Deploying to Vercel (Recommended):
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in Vercel.
3. In Project Settings -> **Environment Variables**, add the variables from Section 3 above.
4. Click **Deploy**. Vercel will build and launch the site automatically.

### Deploying via Docker / Standalone Node:
1. In `next.config.ts`, you can set `output: "standalone"`.
2. Run `npm run build`.
3. Run `node .next/standalone/server.js`.

---

## 8. Verification & QA Status Summary

- [x] **0 TypeScript Errors:** `npx tsc --noEmit` verified
- [x] **0 ESLint Warnings:** `npm run lint` verified
- [x] **100% Passing Automated Tests:** 8/8 tests passed (`tests/api-demo.test.mjs`)
- [x] **Build Succeeded:** 4 routes compiled cleanly in Next.js 16.3.5
- [x] **Accessibility:** WCAG 2.1 AA compliant, reduced motion supported, keyboard focus visible
- [x] **Security:** Honeypot bot filter, 16KB body size cap, strict CORS Origin checking, rate limiting, and Resend idempotency protection
