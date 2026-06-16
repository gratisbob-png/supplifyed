# SKILL: Generic Identifier
**Version:** 1.0
**Trigger:** On product fetch, supplements only
**Input:** Product node ID, primary ingredient name
**Output:** Generic link populated on product node

## WHAT THIS SKILL DOES
Identifies the primary active ingredient of a supplement product.
Finds the generic raw ingredient equivalent on Amazon.
Populates the link_generic field on the product node.
Supplements only — devices and hardware have no generic link.

## INPUTS
- product_id: string
- ingredient_list: string[] — from product packet text or API data
- product_category: string

## PROCESS
1. Parse ingredient list to identify primary active compound
2. Apply primary ingredient rules (see below)
3. Search Amazon for bulk/generic form of that compound
4. Select most relevant generic result (highest relevance + reviews)
5. Generate affiliate-tagged Amazon search link for the compound
6. Populate link_generic on product node

## PRIMARY INGREDIENT RULES
- Single active ingredient: use that ingredient
- Multiple ingredients: use the one present in highest dose
- If two ingredients are within 20% of each other in dose: use both (create two links)
- Proprietary blends with undisclosed doses: use the first-listed ingredient
- If no ingredient can be identified: flag for human review, leave link_generic empty

## GENERIC LINK FORMAT
Amazon search link for the raw compound name.
Example: "Magnesium Glycinate" → amazon.co.uk/s?k=magnesium+glycinate+powder&tag=[tag]
Never link to a specific branded product as the generic alternative.
Always link to a search result, not a specific ASIN.

## RULES
- Devices and hardware: skip this skill entirely
- Never link to the same brand as the product being genericised
- Generic link must be for raw ingredient form (powder, capsule) not branded product
- If ingredient is proprietary extract (KSM-66, LJ100): link to generic root powder

## ERROR HANDLING
- Cannot identify ingredient: flag for human review
- No Amazon results for compound: leave empty, flag
