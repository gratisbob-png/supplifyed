# SKILL: Label Extractor
**Version:** 1.0
**Trigger:** On product fetch complete
**Input:** Product node ID, raw product data from PA API
**Output:** packet_text field populated on product node

## WHAT THIS SKILL DOES
Extracts verbatim label and packet text from Amazon product data.
Formats it cleanly without editorialising.
Populates the packet_text field on the product node.

## INPUTS
- product_id: string
- api_response: object — full PA API response for the product

## EXTRACTION SOURCES (in priority order)
1. ItemInfo.ContentInfo — editorial content
2. ItemInfo.Features — bullet point features
3. Product description from API response

## RULES
- Extract verbatim — no paraphrasing, no summarising
- Format as clean readable text — remove HTML tags, fix encoding
- Preserve all ingredient names and dose amounts exactly as stated
- If no label text available: leave empty, do not invent content
- Badge as LABEL source

## FORMATTING
- Remove HTML markup
- Normalise whitespace
- Preserve bullet points as plain text with dashes
- Preserve all numbers and units exactly (mg, g, mcg, IU)
- Maximum 2000 characters — truncate at sentence boundary if longer

## ERROR HANDLING
- No text available: leave field empty, do not flag as error
- Garbled encoding: attempt UTF-8 normalisation, flag if still unreadable
