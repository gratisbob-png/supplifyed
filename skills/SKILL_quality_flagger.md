# SKILL: Quality Flagger
**Version:** 1.1
**Trigger:** Daily cron — 06:00 UTC (vercel.json) + after every pipeline publish
**Input:** All nodes in graph
**Output:** Exception queue populated with any violations found

## WHAT THIS SKILL DOES
Monitors all content for quality rule violations.
Flags exceptionss for daily human review.
Does not automatically fix issues — flags for human decision.
Critical exceptionss block deploy. Warnings require resolution within 48 hours.

## IMPLEMENTATION
- Cron route: `src/app/api/cron/quality-check/route.ts`
- Local CLI: `npm run quality:check` (runs scripts/quality_check.ts)
- Exception review CLI: `npm run review:exceptionss`
- Exception schema: `schema/nodes/exceptions.surql`

## DAILY REVIEW WORKFLOW
```
npm run review:exceptionss           # see all unresolved
npm run review:exceptionss -- --all  # include resolved (audit trail)
npm run review:exceptionss -- --resolve <id>  # mark resolved
```

## CHECKS RUN
### Content
- Opinion language in packet_text, brand_marketing, FAQ answers
- Missing source badges on published content

### Data integrity
- Products without CONTAINS edges (critical)
- Ingredients without SUPPORTED_BY edges (warning)
- FAQs without ANSWERS_ABOUT edges (critical)
- Evidence nodes without funded_by (warning)

### Links
- Dead links (critical if >48h unresolved)
- Redirected links (warning — verify destination)

### Pipeline
- New ASIN queue from scrape_bestsellers (info — requires pipeline:run)
- New ingredient flags (warning — requires evidence_compiler + faq_compiler)
- Low-confidence tier assignments (warning — requires human review)

## EXCEPTION SEVERITY
- `critical`: blocks publish, must be resolved before daily review closes
- `warning`:  does not block, must be resolved within 48 hours
- `info`:     logged for awareness, no action deadline

## RULES
- Never automatically resolve a critical exceptions
- Never publish a node with unresolved critical exceptionss
- Resolved exceptionss are archived not deleted (audit trail preserved)
- Exception queue must be empty of criticals before each Vercel deploy
