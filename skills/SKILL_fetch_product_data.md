# SKILL: Fetch Product Data
**Version:** 1.0
**Trigger:** On new ASIN identified
**Input:** ASIN string
**Output:** Populated product node (draft status)

## WHAT THIS SKILL DOES
Calls Amazon Product Advertising API for a given ASIN.
Extracts all available product data.
Creates a draft product node in the database.
Does NOT publish — product requires tier classification and link generation before publishing.

## INPUTS
- asin: string — Amazon Standard Identification Number

## PROCESS
1. Call PA API GetItems endpoint with ASIN
2. Extract: title, brand, images, features, ingredients list, certifications, price
3. Extract packet text from product description where available
4. Create draft product node in database
5. Trigger tier_classifier skill
6. Trigger label_extractor skill
7. Log result

## OUTPUT
- product_id: string — newly created product node ID
- status: 'draft' — awaiting tier classification and link generation

## PA API RESOURCES TO REQUEST
- ItemInfo.Title
- ItemInfo.Features
- ItemInfo.ContentInfo
- Offers.Listings.Price
- Images.Primary
- BrowseNodeInfo.BrowseNodes

## RULES
- Never publish a product with status 'draft'
- If brand cannot be identified, create brand node as 'Unknown' and flag
- Store raw API response alongside structured data for audit
- Never invent data not present in the API response

## ERROR HANDLING
- ASIN not found: log and skip
- API rate limit: queue for retry after 1 second
- Missing required fields: create node with available data, flag missing fields
