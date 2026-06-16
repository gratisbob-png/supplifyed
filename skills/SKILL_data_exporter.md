# SKILL: Data Exporter
**Version:** 1.0
**Trigger:** Monthly cron
**Input:** Analytics events from previous 30 days
**Output:** Anonymised category behaviour report

## WHAT THIS SKILL DOES
Compiles anonymised behavioural data from the past 30 days.
Aggregates at category level — never individual user level.
Produces licensing report for sale to brands.

## DATA COLLECTED (from analytics layer)
- Time spent on each product tier (aspiration/rational/economic)
- Which source section was viewed last before exit to purchase
- Ingredient builder query patterns (what combinations were searched)
- Comparison tool usage (which products were compared)
- Search query patterns (what questions were asked)
- Subcategory traffic volumes

## AGGREGATION RULES
- All data aggregated at subcategory level minimum
- No individual session data in output
- Minimum 100 sessions per data point before including in report
- Data points below 100 sessions suppressed (not included)
- No device IDs, IP addresses, or any PII in output

## OUTPUT FORMAT
Monthly report per subcategory:
- Top 10 search queries
- Tier conversion pattern (% time on aspiration vs rational vs economic)
- Most compared product pairs
- Source section that most correlates with purchase exit
- Ingredient combination patterns from builder tool
- Traffic trend vs previous month

## GDPR COMPLIANCE
- No individual tracking
- Aggregate only
- Suppression of small sample sizes
- Data retained for 24 months maximum
- Report itself is the product — raw events not sold

## RULES
- Never include any PII in output
- Never include data from sessions with cookie consent declined
- Clearly mark all suppressed data points
- Report must be reviewed by human before sending to any licensee
