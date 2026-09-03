---
sidebar_label: Monthly value digest
sidebar_position: 8.7
---

<!-- Hand-written — NOT auto-generated. This documents a transactional
     email (PR #1059 / TL-133 in trustedlogin-ecommerce), not a browser
     UI flow, so there's no doc-flow spec or screenshot to capture.
     Keep this in sync with app/Mail/MonthlyValueDigest.php if the copy
     changes. -->

# Monthly value digest

On the 1st of each month, the team owner gets one email summarizing what TrustedLogin did for your team the previous calendar month.

## What's in it

- **Support logins delivered** that month.
- **Distinct customer sites accessed.**
- **Access grants issued** — each one a password that never had to travel through a support ticket.
- **Access grants closed out**, when any closed during the month.
- **Your remaining login allotment** for the current period against your plan (Enterprise instead gets a note that it has no monthly login cap).
- A link to the team activity dashboard for the full detail behind the numbers.

## When you won't get one

If your team had zero logins, zero grants issued, and zero grants closed out for the month, no digest is sent that month — a digest with nothing in it isn't worth your inbox space.

## Frequently-asked concerns

**Does this cost anything or count against my plan?** No — it's a summary email only, sent to the team owner.

**Can I see this data any time, not just once a month?** Yes — the link in the email goes to your team activity dashboard, which has the full history, not just the previous month's totals.

**Does this show average grant duration, or how many grants expired on schedule versus were revoked early?** Not in this release — computing either would need data TrustedLogin doesn't currently record against a grant. If that changes, this page and the email will be updated.
