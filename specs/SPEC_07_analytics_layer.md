# SPEC 07 — ANALYTICS LAYER
## Behaviour Capture, Anonymisation, Data Licensing

---

## Purpose

Capture what users do on Supplifyed. Aggregate and anonymise. License to brands and manufacturers who cannot get this signal from their own analytics — their site only sees decided buyers. Supplifyed sees undecided ones.

## What Is Captured

| Event | What It Tells You |
|-------|------------------|
| page_view | Which ingredients attract attention |
| tier_view | Which tier they spent time on |
| link_click | Which link closed the decision (official/amazon/generic) |
| compare_add | Which products are compared together most |
| builder_select | Which compound combinations are searched |
| section_expand | Which source section (evidence, label, marketing) influences decisions |

## What Is NOT Captured

- User identities (no accounts)
- Cross-session tracking (session ID is per-visit only)
- IP addresses
- Device fingerprints
- Any PII of any kind

## Implementation

`src/lib/analytics.ts` — client-side event capture. Session ID generated per visit via sessionStorage. Events batched and sent to `/api/analytics`. Stripped of session ID before persistence.

## GA4 Integration

Events forwarded to GA4 for traffic analysis. GA4 receives ingredient and tier context, not user identity.

## The Data Product

Aggregate and anonymised only. Brands cannot get this signal from their own analytics. Supplifyed sees behaviour before the purchase decision — uncontaminated by the sale.

What gets licensed:
- Time on aspiration vs rational vs economic tier by category
- Which source section closes the decision
- Drop-off points in compare tool
- Most compared product pairs
- Conversion patterns by subcategory

## Legal

GDPR compliant by design. Privacy policy wording:
*"We sell anonymised category behaviour data to brands and manufacturers."*
No consent required for anonymised aggregate data. Cookie consent still required for GA4.
