@AGENTS.md

# Wireless Quote Coach — Project Notes

A simple, mobile-first quote-planning and sales-training tool for wireless sales reps.
Built as an MVP: **no login, no payments, no database.** Saved data uses the browser's
localStorage only.

## What it does
- Build customer quote estimates (monthly total + due today)
- Practice handling sales objections
- Explain plans in plain English
- Save and reopen quotes
- Daily sales training drills

## How it's built
- Next.js (App Router) + React + TypeScript + Tailwind CSS v4
- Deployed on Vercel (auto-deploys on every `git push` to GitHub)
- Node.js runs locally; `npm run dev` to preview, `npm run build` to test

## Routes
- `/` → marketing landing page
- `/app` → app dashboard
- `/app/quote-builder`, `/app/saved-quotes`, `/app/practice`,
  `/app/plan-explainer`, `/app/daily-drill`

## Rules to always follow
- **Keep the disclaimer** in the footer of every page, exact wording:
  "Unofficial training and quote-planning tool. Pricing estimates must be verified
  with the carrier's official systems."
- This is **not** an official Verizon/AT&T/T-Mobile tool. Never use official carrier
  logos or claim prices are official. Brand styling is *inspired by* a red/white/black/
  light-gray palette only.
- **Never hardcode pricing.** All editable pricing lives in `config/`:
  - `config/verizonPlanConfig.ts` → myPlan presets (Welcome/Plus/Ultimate): per-line
    prices by line count, autopay discount, features, hotspot, trade-in notes
  - `config/feesConfig.ts` → locked setup fee ($30) + activation fee ($40), plus form defaults
  - `config/locationFeesConfig.ts` → Summit County, CO estimated tax % + flat monthly fee
  - Quote math lives in `lib/calculations.ts` and reads only from those config files
- **Brand colors** are defined once in `app/globals.css` (`--color-brand`, `--color-ink`,
  etc.). Use the `brand` / `ink` / `brand-tint` Tailwind classes — don't scatter raw hex.
- Keep it mobile-first and simple. Don't add login, payments, or a database yet.

## Before finishing any change
- Run `npm run build` and `npm run lint` — both must pass.
- Make sure saved quotes still work (localStorage) and all pages/buttons load.

## Working style (the user is new to coding)
- Explain steps simply and one at a time when walking through terminal/deploy tasks.
- To ship an update: `git add .` → `git commit -m "..."` → `git push` (Vercel
  auto-redeploys). No manual Vercel steps needed.
