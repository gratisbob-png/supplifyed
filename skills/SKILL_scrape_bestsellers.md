# SKILL: Scrape Best Sellers
**Version:** 1.1
**Trigger:** Weekly cron — Mondays 02:00 UTC (vercel.json)
**Input:** Amazon Health subcategory node IDs
**Output:** New ASINs queued as `info` exceptions for pipeline processing

## WHAT THIS SKILL DOES
Monitors Amazon Health subcategories for new products.
Identifies ASINs not yet in the Supplifyed database.
Queues them as exceptions for `npm run pipeline:run` to process.

## IMPLEMENTATION
- API route: `src/app/api/cron/scrape-bestsellers/route.ts`
- Activated automatically by Vercel cron on the schedule in vercel.json
- Plug-and-play: returns 503 with clear instructions if PA API credentials absent
- Set AMAZON_ACCESS_KEY + AMAZON_SECRET_KEY in .env.local (Vercel env vars in production)

## SUBCATEGORIES MONITORED
Defined in `src/app/api/cron/scrape-bestsellers/route.ts`:
- Sports Nutrition Creatine
- Sports Nutrition Protein
- Vitamins Vitamin D
- Vitamins Magnesium
- Fish Oil Omega

Add subcategories here when scaling to Phase 6 (100 ingredients).

## OUTPUT
New ASINs are written to the exception queue as `info` severity entries:
  type: pipeline
  description: "New ASIN discovered: B0XXXXXX in [subcategory] — run pipeline:run to process"

Check for new ASINs with: `npm run review:exceptions`
Process a new ASIN with: `npm run pipeline:run -- <ASIN> [subcategory]`

## RULES
- Maximum 20 products per subcategory per run
- Deduplicate against existing database before queueing
- If PA API is unavailable: return 503, log to Vercel function logs
- Never write product nodes directly — only queue via exception system
- Retry on rate limit: exponential backoff up to 3 attempts

## ERROR HANDLING
- PA API not configured: HTTP 503 with action_required message
- Subcategory lookup failure: log to errors array in response, continue other subcategories
- Rate limit hit: handled by PA API client with AbortSignal timeout
