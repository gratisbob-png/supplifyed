# SPEC 08 — FRONTEND
## Next.js App, Components, Navigation Modes

---

## Stack

Next.js 14 + App Router + TypeScript + Tailwind CSS + Vercel

## Three Navigation Modes

| Mode | Route | Component | Graph Operation |
|------|-------|-----------|----------------|
| Search | /search?q= | SearchPage | Traverse from query node outward |
| Card Compare | /ingredient/[slug] | TierStack + CardCompare | Render multiple product nodes |
| Ingredient Builder | /ingredient/[slug] | IngredientBuilder | Find intersection of ingredient nodes |

## The Eight Components

| Component | File | Purpose |
|-----------|------|---------|
| SearchBar | SearchBar.tsx | Single search input, routes to /search |
| IngredientPage | IngredientPage.tsx | Full ingredient page with evidence + FAQs + tier stack |
| ProductCard | ProductCard.tsx | Pokemon-card layout for one product |
| CardCompare | CardCompare.tsx | Side-by-side product comparison |
| IngredientBuilder | IngredientBuilder.tsx | Select ingredients, find intersecting products |
| SourceBadge | SourceBadge.tsx | Colour-coded badge indicating content source |
| EvidenceRating | EvidenceRating.tsx | Visual evidence rating (strong/moderate/mixed/limited) |
| TierStack | TierStack.tsx | Three-tier product display with compare integration |
| BuyButtons | BuyButtons.tsx | Official + Amazon + Generic links with analytics |

## The Pokemon Card Layout

```
┌──────────────────────────────────────────────────┐
│  PRODUCT NAME                          [TIER]    │
│  Brand Name  ·  Variant                          │
├──────────────────────────────────────────────────┤
│  INGREDIENTS [MANUFACTURER]    DOSE PER SERVING  │
│  Primary compound                      Xmg       │
├──────────────────────────────────────────────────┤
│  [PEER REVIEWED]  Evidence rating badge          │
├──────────────────────────────────────────────────┤
│  CERTIFICATIONS  Badge · Badge · Badge           │
├──────────────────────────────────────────────────┤
│  RRP  £XX.XX                                     │
├──────────────────────────────────────────────────┤
│  [Official Store]   [Amazon]   [Generic ↓]       │
└──────────────────────────────────────────────────┘
```

## Tier Badge Colours

| Tier | Border | Badge |
|------|--------|-------|
| ASPIRATION | #1a5c3a (deep green) | text-[#1a5c3a] |
| RATIONAL | gray-600 | text-gray-400 |
| ECONOMIC | gray-700 | text-gray-500 |

## Styling Rules

- Dark theme (bg-gray-950)
- Monospace font for data (font-mono)
- No star ratings, no scores, no rankings anywhere
- Source badges on every piece of content

## Frontend Quality Gates

- SearchBar returns results for all 10 Phase 1 ingredients
- IngredientPage renders with evidence + FAQ sections
- ProductCard shows all fields with source badges
- TierStack shows all three tiers correctly
- BuyButtons show correct number of links per product type
- CardCompare renders 2-4 cards side by side without breakage
- IngredientBuilder returns intersection correctly
- No opinion language in any rendered output (automated check passes)
