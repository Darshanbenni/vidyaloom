<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Vidyaloom Project Rules & Autonomous Execution Protocol

## Mandatory Rule for All Agents:
Whenever the user asks you to fix an issue, change content, or add any feature:
1. **Directly make the changes** in the codebase.
2. **Build and test**: Run `npm run build` or `npm run lint`.
3. **Deploy end-to-end to Cloudflare**: Run `npm run deploy:cloudflare`.
4. **Push to GitHub `main`**: Read the `GITHUB_TOKEN` from `.env.local` and push to `origin main`.
   ```powershell
   $token = (Get-Content .env.local | Select-String "GITHUB_TOKEN=").ToString().Split("=")[1].Trim()
   git add -A
   git commit -m "<concise message>"
   git push "https://Darshanbenni:$token@github.com/Darshanbenni/vidyaloom.git" main:main
   ```
5. **Verify live**: Test with `curl.exe -I https://vidyaloom.com` (must be HTTP 200).
6. **Do NOT ask for permission** to build, deploy, or push. The user expects full end-to-end autonomous execution.

For detailed architecture, secrets, and component breakdown, read [AGENT_INSTRUCTIONS.md](file:///d:/getItUse/Benni/school%20coaching/AGENT_INSTRUCTIONS.md) and [.env.local](file:///d:/getItUse/Benni/school%20coaching/.env.local).
