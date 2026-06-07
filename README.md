# 📡 Wireless Quote Coach

A simple quote-planning and sales training tool for wireless sales reps.

It runs in any browser — phone, tablet, or computer — and helps reps:

- **Build quick customer quote estimates** (device payment, plan, trade-in, taxes, due today)
- **Practice objections** with ready-to-use responses, follow-ups, and closes
- **Explain plans in plain English** your customer will actually understand
- **Save quotes** locally and reopen them to edit
- **Run daily sales drills** to stay sharp

> **Disclaimer:** Unofficial training and quote-planning tool. Pricing estimates must be verified with the carrier's official systems. Not affiliated with Verizon, AT&T, T-Mobile, or any carrier.

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- React + TypeScript
- Tailwind CSS
- Browser **localStorage** for saved data (no database, no login, no payments)

## Routes

| URL | Page |
| --- | --- |
| `/` | Marketing landing page |
| `/app` | App dashboard |
| `/app/quote-builder` | Build a quote |
| `/app/saved-quotes` | Saved quotes |
| `/app/practice` | Practice objections |
| `/app/plan-explainer` | Plan explainer |
| `/app/daily-drill` | Daily drill |

---

## Run it locally

You need [Node.js](https://nodejs.org/) 18.18 or newer installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Build for production

```bash
npm run build   # create an optimized production build
npm run start   # run the production build locally
```

---

## Deploy to Vercel

The easiest way to put this online.

### Option A — Vercel dashboard (recommended)

1. Push this project to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. Click **Import** on your `wireless-quote-coach` repository.
4. Vercel auto-detects Next.js — leave the defaults and click **Deploy**.
5. When it finishes you'll get a live URL like `https://wireless-quote-coach.vercel.app`.

Every time you push to GitHub, Vercel redeploys automatically.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel          # follow the prompts to link/create the project
vercel --prod   # deploy to production
```

---

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Wireless Quote Coach"
git branch -M main
# Create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/wireless-quote-coach.git
git push -u origin main
```

---

## Notes

- All data is stored in your browser's localStorage. Clearing your browser data
  will remove saved quotes. There is no account system yet.
- This is an MVP focused on being fast and useful on a phone. Login, cloud sync,
  and team features are intentionally not included yet.
