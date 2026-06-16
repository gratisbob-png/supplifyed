# SKILL: Link Checker
**Version:** 1.0
**Trigger:** Weekly cron
**Input:** All published product nodes
**Output:** Link status updated, dead links flagged

## WHAT THIS SKILL DOES
Checks all affiliate links across all published products.
Updates link_status field on each product node.
Flags dead or redirected links for review.
Does not automatically remove or replace links — flags for human decision.

## PROCESS
1. Query all published products with link_status = 'live'
2. For each product, check all populated links (amazon, official, generic)
3. Update link_status based on HTTP response
4. Create exception report for dead and redirected links
5. Pass to quality_flagger for human review queue

## LINK STATUS RULES
- live: HTTP 200 response
- redirected: HTTP 301 or 302 — may still work but check destination
- dead: HTTP 4xx, 5xx, or connection failure

## RATE LIMITING
- Maximum 1 request per second to avoid triggering bot detection
- Check Amazon links separately from brand links
- Use HEAD requests not GET to minimise bandwidth

## OUTPUT REPORT
For each flagged link:
- product_id
- link_type (amazon | official | generic)
- previous_status
- new_status
- url
- http_response_code
- checked_at

## RULES
- Never automatically remove a link — flag for human decision
- Amazon ASIN changes must be verified manually before updating
- Run weekly minimum — daily during first month of operation
- Log all checks with timestamp for audit trail

## ERROR HANDLING
- Network timeout: retry once after 5 seconds, then mark as unknown
- All links for a product fail: escalate immediately to quality_flagger
