# SPEC 03 — PAGE LAYER
## Ingredient Pages and Product Pages

---

## Ingredient Page Structure

Route: `/ingredient/[slug]`

| Section | Source Badge | Content |
|---------|-------------|---------|
| Name + evidence rating | — | Ingredient name + EvidenceRating component |
| Description | — | Plain language definition |
| Common uses | PEER_REVIEWED | empirical list |
| Dose context | PEER_REVIEWED | What studies used vs what products typically contain |
| Evidence | PEER_REVIEWED | All linked evidence nodes |
| FAQs | — | FAQ nodes via ANSWERS_ABOUT edges |
| Tier stack | — | Three tiers of products |

## Product Page Structure

Route: `/product/[slug]`

| Section | Source Badge | Limit |
|---------|-------------|-------|
| Manufacturer Label | LABEL | Verbatim — no limit |
| Official Specs | MANUFACTURER | Full spec |
| Brand Marketing | BRAND_MARKETING | BRAND_MARKETING_CHAR_LIMIT (env) |
| Peer Reviewed | PEER_REVIEWED | All relevant evidence nodes |
| Buy buttons | — | Official + Amazon + Generic |

## The Source Badge Rule

Every piece of content must be source-badged. No content appears without a badge answering: who produced this?

- LABEL: verbatim label text
- MANUFACTURER: data from manufacturer or Amazon listing
- BRAND_MARKETING: submitted by manufacturer, capped equally
- PEER_REVIEWED: peer-reviewed research
- PRESS: published media coverage
- INSTRUCTIONAL: usage and dosing guidance

## Static Generation

Both ingredient and product pages use Next.js ISR (incremental static regeneration). Pages rebuild automatically when data changes. Revalidation: every 24 hours.

## SEO

- Ingredient pages: `[name] | Supplifyed`
- Product pages: `[product name] — [brand] | Supplifyed`
- Meta description: first 160 chars of description
- Structured data: JSON-LD for products (schema.org/Product)
