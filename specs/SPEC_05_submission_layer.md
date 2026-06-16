# SPEC 05 — SUBMISSION LAYER
## Manufacturer Intake, Validation, Page Enrichment

---

## Who Can Submit

Manufacturers only. No resellers, distributors, or third parties. Manufacturer must demonstrate ownership of the brand.

## What Manufacturers Submit

- Brand marketing copy (capped at BRAND_MARKETING_CHAR_LIMIT characters)
- Additional certifications
- Official store link with affiliate structure
- Product images
- Press coverage links

## What Manufacturers Cannot Do

- Remove or alter the generic ingredient link
- Exceed the character cap (same limit for every brand)
- Add opinion language or rankings
- Claim any tier position (tier is assigned by the platform, not the brand)
- Submit for a product already in Best Sellers index without enriching it

## The Non-Negotiable Rules

1. Generic link cannot be removed
2. Brand marketing capped equally (BRAND_MARKETING_CHAR_LIMIT env var)
3. Tier assignment is platform's, not brand's
4. Content badged BRAND_MARKETING — never as PEER_REVIEWED

## Intake Flow

```
Manufacturer submits form →
  Platform validates manufacturer identity →
  Content reviewed against rules →
  source = 'manufacturer_submission' →
  Brand node created/updated →
  Product node created with manufacturer content →
  CONTAINS edges created from label text →
  Page published inside standard framework
```

## Revenue

Annual listing fee (to be set). Brands buy placement inside a neutral reference people trust. Implicit leverage: if their product is in Best Sellers, the page exists without them anyway.

## Skill

`skills/SKILL_brand_intake.md` — handles validation and page creation from manufacturer submission.
