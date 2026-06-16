# SKILL: Tier Classifier
**Version:** 1.0
**Trigger:** On product fetch complete
**Input:** Product node ID, product price, sales rank, subcategory
**Output:** Tier field populated on product node

## WHAT THIS SKILL DOES
Assigns aspiration, rational, or economic tier to a product.
Uses both price band AND sales rank as inputs.
Flags ambiguous cases for human review.

## INPUTS
- product_id: string
- price: decimal
- sales_rank: integer
- subcategory: string
- subcategory_products: array — all products in same subcategory for comparison

## TIER ASSIGNMENT RULES

### Aspiration
- Top 1-2 by price in subcategory
- AND premium positioning explicit in product name or brand marketing
- AND price must be >40% above subcategory median

### Rational
- Best seller rank 1-5 in subcategory
- AND mid price band (within 40% of subcategory median)
- This is where most conversions happen — default to Rational if ambiguous between Rational and Economic

### Economic
- Lowest price point in subcategory
- AND minimum 4.0 star rating
- AND minimum 100 reviews
- Prevents low-quality products entering Economic tier

## EDGE CASES
- Only two distinct price bands: use Rational + Economic only, no Aspiration
- All products cluster at similar price: use sales rank as sole differentiator
- Price outlier with no premium positioning: classify as Rational, not Aspiration
- Any case outside these rules: flag for human review via quality_flagger

## OUTPUT
- tier: enum — aspiration | rational | economic
- tier_confidence: enum — high | medium | low
- tier_flags: string[] — any issues noted

## RULES
- Never assign tier without both price AND sales rank data
- Low confidence tier assignments must be flagged
- Human reviews all 'low' confidence assignments before publishing
