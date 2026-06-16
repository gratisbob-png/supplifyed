# SKILL: Link Generator
**Version:** 1.0
**Trigger:** On product ready to publish (tier assigned, evidence compiled)
**Input:** Product node ID
**Output:** All affiliate links populated and tagged

## WHAT THIS SKILL DOES
Generates all affiliate links for a product.
Applies correct network tags to each link.
Populates link_official, link_amazon, link_generic on product node.

## INPUTS
- product_id: string
- asin: string
- brand_id: string (to look up affiliate network)
- primary_ingredient_name: string (for generic link)
- product_type: enum — supplement | device

## LINK GENERATION RULES

### Supplements
- link_amazon: Amazon ASIN link with Associates tag
- link_official: brand website link with Awin/CJ/ShareASale tag if available
- link_generic: Amazon search for raw ingredient with Associates tag

### Devices / Hardware
- link_amazon: Amazon ASIN link with Associates tag
- link_official: brand website link with affiliate tag if available
- link_generic: null (no generic for devices)

## AFFILIATE TAG FORMAT
- Amazon: `https://www.amazon.co.uk/dp/{ASIN}?tag={AMAZON_PARTNER_TAG}`
- Awin: append `?awc={AWIN_PUBLISHER_ID}` to official URL
- Generic: `https://www.amazon.co.uk/s?k={ingredient+name}&tag={AMAZON_PARTNER_TAG}`

## RULES
- Never publish a product without at least link_amazon populated
- All URLs must be validated as live before writing to database
- Official store link only included if affiliate programme exists for the brand
- Generic link always searches by ingredient name, never links to specific branded product
- RRP field must be populated before links are generated (Associates compliance)

## ERROR HANDLING
- Amazon link invalid: flag product as draft, alert quality_flagger
- Official site no affiliate programme: leave link_official empty, do not include non-affiliate link
