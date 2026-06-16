# SKILL: Brand Intake
**Version:** 1.0
**Trigger:** On manufacturer submission received
**Input:** Submission package from manufacturer
**Output:** Product node enriched with submission data, or rejected with reason

## WHAT THIS SKILL DOES
Processes manufacturer product submissions.
Validates submission against all rules.
Enriches existing product node (if ASIN already exists) or creates new draft product node.
Enforces brand marketing cap.
Never allows submission to suppress generic ingredient link.

## REQUIRED SUBMISSION FIELDS
- manufacturer_name: string (must match registered brand)
- product_name: string
- asin: string (Amazon ASIN)
- affiliate_conversion_link: string (required — no link, no submission)
- official_store_url: string
- packet_text: string (verbatim label text)
- ingredients: array of {name, dose, unit, form}
- certifications: string[]
- rrp: decimal
- rrp_currency: string

## OPTIONAL SUBMISSION FIELDS (capped)
- brand_marketing_copy: string (max BRAND_MARKETING_CHAR_LIMIT characters)
- press_mentions: array of {title, source, date, url}
- instructional_content: string (max 500 characters)

## VALIDATION RULES
1. ASIN must be valid and resolvable on Amazon
2. affiliate_conversion_link must be a working URL
3. brand_marketing_copy must not exceed BRAND_MARKETING_CHAR_LIMIT
4. brand_marketing_copy must pass opinion language check
5. Submission cannot set link_generic to null or empty
6. Submission cannot modify evidence_rating field
7. Submission cannot modify competitor product data
8. manufacturer_name must be verified against brand registry

## REJECTION CRITERIA
- No affiliate_conversion_link: REJECTED — "Conversion link required for submission"
- Opinion language in marketing copy: REJECTED — "Marketing copy contains opinion language: [words found]"
- Attempts to suppress generic link: REJECTED — "Generic ingredient link cannot be modified"
- ASIN mismatch with product name: FLAG for human review
- Brand not verified: REJECTED — "Manufacturer identity must be verified before submission"

## PROCESS
1. Validate all required fields present
2. Run opinion language check on all text fields
3. Check brand marketing does not exceed cap
4. Verify ASIN exists on Amazon
5. Check if product already exists in database
   - If yes: enrich existing node with submission data
   - If no: create new draft node
6. Never overwrite existing evidence, FAQ, or tier data
7. Confirm submission accepted or rejected with specific reason

## RULES
- One submission per ASIN — duplicate submissions update the existing one
- Submission data is badged as BRAND_MARKETING or LABEL depending on field
- Platform publishes submission content as received — does not validate claims
- All submissions logged with timestamp and manufacturer identity
