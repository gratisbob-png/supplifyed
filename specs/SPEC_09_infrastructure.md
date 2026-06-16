# SPEC 09 — INFRASTRUCTURE
## GitHub, Vercel, SurrealDB, Domain

---

## Repository

GitHub — private repo. Main branch deploys automatically to Vercel.

```
main → Vercel production (supplifyed.com)
```

## Vercel Setup

1. Connect GitHub repo to Vercel
2. Configure environment variables (all values from .env.example)
3. Custom domain: supplifyed.com + supplifyed.co.uk
4. Edge runtime for API routes where latency matters

## SurrealDB

Local development: `surreal start --log trace --user root --pass root memory`
Production: SurrealDB Cloud or self-hosted on Railway/Fly.io

Connection: `SURREALDB_URL` env var. Switch from `http://localhost:8000` to cloud URL.

## Environment Variables

All in .env.example. Never committed. Set in Vercel dashboard for production.

Required before launch:
- `SURREALDB_URL`, `SURREALDB_USER`, `SURREALDB_PASS`
- `AMAZON_PARTNER_TAG`
- `NEXT_PUBLIC_SITE_URL`

## The .gitignore

Critical — `.env.local` must never be committed. Already in `.gitignore`.

## Domain Setup

Register both:
- `supplifyed.com` — primary
- `supplifyed.co.uk` — redirect to .com

Domain age contributes to SEO from day one. Register immediately, even before code is ready.

## Affiliate Network Applications

Apply in parallel, approval takes weeks:
- Amazon Associates: `https://affiliate-program.amazon.co.uk`
- Amazon PA API: `https://webservices.amazon.com/paapi5` (separate from Associates)
- Awin: `https://www.awin.com/gb/publishers`
- CJ Affiliate: `https://www.cj.com/publisher`
- ShareASale: `https://www.shareasale.com/info/publisher.cfm`

## Analytics

- Google Analytics 4: `https://analytics.google.com`
- Google Search Console: `https://search.google.com/search-console`
- Set up immediately — historical data is irreplaceable

## Cron Jobs (Phase 5+)

`vercel.json` example:
```json
{
  "crons": [
    {
      "path": "/api/cron/check-links",
      "schedule": "0 9 * * 1"
    },
    {
      "path": "/api/cron/quality-check",
      "schedule": "0 6 * * *"
    }
  ]
}
```
