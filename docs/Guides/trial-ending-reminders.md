---
sidebar_label: Trial reminder emails
sidebar_position: 8.6
---

<!-- Hand-written — NOT auto-generated. This documents two transactional
     emails (PR #1056 / TL-129 in trustedlogin-ecommerce), not a
     browser UI flow, so there's no doc-flow spec or screenshot to
     capture. Keep this in sync with app/Mail/TrialEndingReminder.php
     and its two subclasses if the copy changes. -->

# Trial reminder emails

If your team is on a trial, we email the team owner twice before the trial ends and the card on file is charged — once with a week's notice, once with a day's notice.

## When they're sent

- **7 days before** your trial ends.
- **1 day before** your trial ends.

Each stage is sent once, to the team owner only — you won't get a repeat of either email, and if your team already converted to a paid plan or canceled before a stage is due, that stage is skipped.

## What's in them

Each email shows what your team actually did during the trial:

- The number of support logins your team completed.
- The number of distinct customer sites accessed.

If your team hasn't granted a support login yet, the email skips those numbers and links to your dashboard for setup steps instead of showing a zero.

Both emails also say plainly what happens next: the card on file will be charged for the plan you selected at checkout (with the price, when there's a fixed one to show), plus a link to your subscription page if you want to change or cancel your plan before that happens.

## If you want to act before the charge

Use the **Choose a plan** link in either email, or go straight to [Change plan or cancel](change-plan.md).

## Frequently-asked concerns

**Will I get billed if I don't respond to these emails?** Yes — a trial converts to a paid subscription automatically unless you cancel or change plans first. These emails exist so that charge is never a surprise, not to require a reply.

**Does every trial that gets this email have a card on file?** Yes. These reminders only reach teams with a live, trialing Stripe subscription, and a trial only starts with a card on file — so "we'll charge the card on file" is accurate for anyone who receives one.
