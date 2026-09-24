# Vidyaloom — Autonomous Agent Playbook & Deployment Guide

This document is the **single source of truth** for any AI agent or developer working on the **Vidyaloom** codebase. 

---

## 🎯 Golden Rule for Future Agents
When the user asks you to **fix an issue, change content, or add a feature**:
1. **Implement the change** directly in the code.
2. **Validate the build**: Run `npm run build` or `npm run lint`.
3. **Deploy end-to-end to Cloudflare**: Run `npm run deploy:cloudflare`.
4. **Push the commit to GitHub**: Commit the changes and push to `main` using the GitHub token from `.env.local`.
5. **Verify live**: Test with `curl.exe -I https://vidyaloom.com` to confirm HTTP 200 OK.
6. **Report completion**: Give the user a concise summary and confirmation that it is live.

**Do NOT ask the user for permission to build, deploy, or push.** The user has explicitly mandated full end-to-end autonomy.

---

## 🔑 Credentials & Environment Variables
All sensitive keys and production tokens are stored in the git-ignored [`.env.local`](file:///d:/getItUse/Benni/school%20coaching/.env.local) file.
**Do NOT paste raw tokens into committed markdown or code files.**

The `.env.local` contains the following keys:
* `NEXT_PUBLIC_SITE_URL` - `https://vidyaloom.com`
* `RESEND_API_KEY` - The active Resend API key (also stored as Cloudflare Worker secret)
* `EMAIL_FROM` - `Vidyaloom <contact@vidyaloom.com>`
* `LEADS_TO_EMAIL` - `vidyaloomhq@gmail.com`
* `ALLOWED_ORIGINS` - `https://vidyaloom.com,https://www.vidyaloom.com,http://localhost:3000`
* `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID
* `CLOUDFLARE_WORKER_NAME` - `vidyaloom`
* `CLOUDFLARE_ZONE` - `vidyaloom.com`
* `GITHUB_TOKEN` - Personal access token for pushing commits to GitHub
* `GITHUB_REPO_URL` - `https://github.com/Darshanbenni/vidyaloom.git`

> [!IMPORTANT]
> The Cloudflare Worker already has `RESEND_API_KEY` stored as an encrypted secret (`wrangler secret put RESEND_API_KEY`).
> If you ever add new server-side secrets, push them to the worker via:
> ```powershell
> npx wrangler secret put SECRET_NAME
> ```

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Motion (Framer Motion), Lenis smooth scroll |
| **Edge Adapter** | `@opennextjs/cloudflare` |
| **Hosting / CDN** | Cloudflare Workers (`vidyaloom`) |
| **Live Domains** | `https://vidyaloom.com` (Custom Domain)<br>`https://www.vidyaloom.com` (Worker Route `www.vidyaloom.com/*`) |
| **Email Service** | Resend API (`api.resend.com`) |
| **Sending Domain** | `vidyaloom.com` (Region: Tokyo `ap-northeast-1`, DKIM + SPF verified) |
| **Repository** | [https://github.com/Darshanbenni/vidyaloom](https://github.com/Darshanbenni/vidyaloom) (`main` branch) |

---

## 📁 Key File Structure

```text
├── .env.local                    # Local secrets and config (NEVER commit to Git)
├── wrangler.jsonc                # Cloudflare Worker configuration & environment variables
├── open-next.config.ts           # OpenNext adapter configuration for Cloudflare
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main homepage
│   │   ├── layout.tsx            # Root layout with fonts, SEO meta, Structured Data
│   │   ├── globals.css           # Global Tailwind & design system styles
│   │   ├── api/
│   │   │   └── demo/route.ts     # Lead submission API (rate limits, dedup, Turnstile, Resend)
│   ├── components/
│   │   ├── forms/
│   │   │   └── BookDemoDialog.tsx # Interactive Lead Capture Modal
│   │   └── sections/
│   │       ├── Header.tsx        # Top navigation with CTA
│   │       ├── HeroSection.tsx   # Hero section
│   │       ├── SchoolsSection.tsx# Trusted schools logos & badge
│   │       ├── SolutionsSection.tsx # 3-in-1 Platform offerings
│   │       ├── DashboardSection.tsx # Product interactive preview
│   │       ├── TrainingSection.tsx  # Teacher training & robotics curriculum
│   │       ├── TestimonialsSection.tsx # Proof & reviews
│   │       ├── ClosingCtaSection.tsx # Bottom conversion card
│   │       └── Footer.tsx        # Footer navigation & copyright
│   └── lib/
│       ├── schema.ts             # Zod validation schema for leads
│       └── server/
│           ├── email.ts          # Resend integration & HTML lead notification template
│           ├── ratelimit.ts      # In-memory / Upstash rate limiting
│           └── dedup.ts          # Idempotency and duplicate prevention
```

---

## 🚀 End-to-End Workflow for Any Modification

### Step 1: Make Code Changes
Edit the relevant files in `src/` following the existing clean architecture, accessible components, and brand tokens.

### Step 2: Validate Locally
Run the Next.js build or linter to make sure there are no syntax or type errors:
```powershell
npm run build
```

### Step 3: Deploy to Cloudflare Worker
Deploy the updated bundle directly to Cloudflare:
```powershell
npm run deploy:cloudflare
```
*Behind the scenes, this runs `opennextjs-cloudflare deploy`, bundles assets, and deploys to worker `vidyaloom` on Cloudflare.*

### Step 4: Push to GitHub (`main`)
To prevent hanging on Windows GUI credential prompts, extract the `GITHUB_TOKEN` from `.env.local` and push:
```powershell
$token = (Get-Content .env.local | Select-String "GITHUB_TOKEN=").ToString().Split("=")[1].Trim()
git add -A
git commit -m "Describe your changes"
git push "https://Darshanbenni:$token@github.com/Darshanbenni/vidyaloom.git" main:main
```

### Step 5: Verify Live Endpoints
Run a quick health check:
```powershell
curl.exe -I https://vidyaloom.com
curl.exe -I https://www.vidyaloom.com
```
Both should return `HTTP/1.1 200 OK`.

---

## 📧 Email & Lead Routing Details
* **From Address:** `Vidyaloom <contact@vidyaloom.com>`
* **To Address:** `vidyaloomhq@gmail.com`
* **Test Verification:**
  To test the live lead flow via PowerShell:
  ```powershell
  $body = @{
      fullName = "Test Parent"
      email = "parent@example.com"
      phone = "+91 98765 43210"
      institution = "Greenwood High"
      role = "Management"
      city = "Bengaluru"
      interest = "Complete Solution"
      preferredDate = "2026-10-01"
      requirements = "Testing enquiry"
      source = "header"
      requestType = "demo"
      permission = $true
      submissionId = "test_" + [System.Guid]::NewGuid().ToString()
  } | ConvertTo-Json

  Invoke-RestMethod -Uri "https://vidyaloom.com/api/demo" -Method Post -Body $body -ContentType "application/json" -Headers @{ "Origin" = "https://vidyaloom.com" }
  ```
  Should return: `{"success": true, "status": "accepted"}` and arrive in `vidyaloomhq@gmail.com`.
