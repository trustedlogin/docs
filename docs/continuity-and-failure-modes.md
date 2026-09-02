---
title: Continuity & Failure Modes
description: What still works if TrustedLogin's service is unreachable — or if the company stopped operating it — and what that depends on.
sidebar_label: Continuity & Failure Modes
---

# Continuity & Failure Modes

TrustedLogin is built from three separate components: the **Client SDK**, embedded in the plugin or theme running on the customer's site; the **Connector plugin**, running on the vendor's (support team's) own site; and the **SaaS**, TrustedLogin's own servers at [app.trustedlogin.com](https://app.trustedlogin.com). [See the full flow diagrams](/flows) for how they interact.

That separation is what determines what keeps working, and what doesn't, if any one of them becomes unavailable.

## If TrustedLogin's service is unreachable {#if-trustedlogins-service-is-unreachable}

### The Grant Access button doesn't dead-end

The button's link defaults to the vendor's own configured support URL (`vendor/support_url`), not to anything TrustedLogin operates ([`Form::get_button()`](https://github.com/trustedlogin/client/blob/main/src/Form.php#L1428)). If the AJAX grant request itself fails — including because the SaaS can't be reached — the client JS's `remote_error()` handler ([`assets/trustedlogin.js#L264`](https://github.com/trustedlogin/client/blob/main/src/assets/trustedlogin.js#L264)) surfaces a message asking the user to click through to the vendor's support site instead of failing silently, using copy built in [`Form::translations()`](https://github.com/trustedlogin/client/blob/main/src/Form.php#L1549).

### A grant that's already been issued keeps working

Logging in with an existing grant never calls out to the SaaS. [`Endpoint::maybe_login_support()`](https://github.com/trustedlogin/client/blob/main/src/Endpoint.php#L163) verifies the incoming request entirely on the customer's own site — a local `hash_equals()` comparison against a hash stored in WordPress user meta. Nothing about completing a login depends on TrustedLogin being reachable.

### Expiry still fires

Access windows are enforced by the customer's own site, on its own WP-Cron — not by a check-in with the SaaS. [`Cron::schedule()`](https://github.com/trustedlogin/client/blob/main/src/Cron.php#L218) registers the expiration as a native `wp_schedule_single_event()` at grant time, and [`Cron::revoke()`](https://github.com/trustedlogin/client/blob/main/src/Cron.php#L289) deletes the support user locally when that event runs — regardless of whether the SaaS can be reached at that moment. A separate, best-effort job ([`Cron::retry_saas_revoke()`](https://github.com/trustedlogin/client/blob/main/src/Cron.php#L173)) only *notifies* the SaaS afterward that the secret can be cleaned up there too, retrying with backoff for up to five attempts; it has no effect on whether the local account actually expires.

### What doesn't work while the SaaS is down

- **Obtaining a new grant through the normal vendor-side flow.** Creating a grant involves the Client syncing the encrypted envelope to the SaaS Vault, and a support agent retrieving it from there to log in ([see steps 2–6 of the Support Access Flow](/flows#support-access-flow)). Both legs need the SaaS reachable.
- **The hosted dashboard.** The Sites list, site records, and "Log in to site" button are served by app.trustedlogin.com itself.

:::note
The Connector also exposes a **"Login as support"** entry directly inside the *customer's* wp-admin, for a grant that's already been issued and already sitting on that site — this path doesn't touch the SaaS at all and keeps working under the same conditions as any other already-issued grant above.
:::

## If TrustedLogin the company shut down {#if-trustedlogin-the-company-shut-down}

### What keeps working

Nothing above is time-limited to "until TrustedLogin comes back." A grant already issued keeps behaving exactly as described in the previous section — local login verification, local WP-Cron expiry — for as long as it's valid, with no dependency on the SaaS ever being reachable again. And customers can revoke access themselves at any time, from their own site (see below), whether or not TrustedLogin's service exists.

### What you'd lose

- **The hosted dashboard** — the Sites list, per-site records, and one-click "Log in to site" affordance are all served by the SaaS.
- **The cross-site, cross-customer audit log.** TrustedLogin's servers keep their own record of who logged in to which site and when, independent of the Connector's local record on each individual site — that's what lets an agent see "every log-in to this particular site" in one dashboard view across every customer they support. That aggregate record only exists on TrustedLogin's servers.
- **Help-desk integrations that round-trip through the SaaS.** The Help Scout and FreeScout ticket-sidebar login affordances work by having the Connector ask the SaaS for the Secret IDs matching a customer's email address; without the SaaS, that lookup has nothing to answer it. Team-level notifications (e.g. Slack) are configured and delivered entirely inside the SaaS as well.

### Revoking access yourself, from your own site

You don't need TrustedLogin's service to be reachable to shut off access. From wp-admin, on the **Users** screen, every active support account has its own **Revoke Access** row action ([`Admin::user_row_action_revoke()`](https://github.com/trustedlogin/client/blob/main/src/Admin.php#L216)); the same action is also available from the admin toolbar while logged in as the support user itself ([`Admin::admin_bar_add_toolbar_items()`](https://github.com/trustedlogin/client/blob/main/src/Admin.php#L241)). Both act locally, on your own site — see [Client Security: Access control](/Client/security#access-control).

### The code doesn't disappear either

- **The Client SDK** — the code running on the customer's site — is public and GPL-licensed on GitHub: [`github.com/trustedlogin/client`](https://github.com/trustedlogin/client).
- **The Connector plugin** — the code running on the vendor's site — is GPL-licensed (`License: GPLv2 or later`) and, as a plugin hosted on WordPress.org, its full source ships publicly through the [WordPress.org plugin page](https://wordpress.org/plugins/trustedlogin-connector/) regardless of where its development repository lives.

## Who holds which key {#who-holds-which-key}

| Location | What it stores | What it can decrypt |
| --- | --- | --- |
| **Customer's site** (Client SDK) | The vendor's *public* key, cached for 10 minutes before being re-fetched; a hash of the support user's identifier, in WordPress user meta | Nothing. The Client only ever *encrypts*, using the vendor's public key, and compares an already-decrypted identifier via `hash_equals()` — it never holds or uses a private key. |
| **Vendor's site**, via the Connector plugin | The long-term Sodium keypair used to decrypt access-grant envelopes, generated and stored locally on install ([`Encryption`](https://plugins.trac.wordpress.org/browser/trustedlogin-connector/trunk/php/Encryption.php), "owns the long-term keypair used to decrypt access-grant envelopes"). A retired key stays valid for a 20-minute grace window so in-flight envelopes still decrypt after rotation ([`Encryption::KEYPAIR_RETENTION_SECONDS`](https://plugins.trac.wordpress.org/browser/trustedlogin-connector/trunk/php/Encryption.php#L135)). | The access-grant envelope. This is the only place the plaintext login credential is ever decrypted ([`TrustedLoginService::decryptCryptoBox()` call site](https://plugins.trac.wordpress.org/browser/trustedlogin-connector/trunk/php/TrustedLoginService.php#L781)). |
| **TrustedLogin's servers** (SaaS) | The encrypted envelope (ciphertext), in Vault; unencrypted site metadata — see below | Nothing. No private decryption key is ever stored server-side; the SaaS relays and stores ciphertext it cannot open. |

## What TrustedLogin's servers can see {#what-trustedlogins-servers-can-see}

Per [Security: Encryption](/security#encryption), the following is stored **unencrypted** on TrustedLogin's servers:

- The ID of the user who granted access
- The URL of the website access was granted on
- Vendor-defined metadata attached to the grant

Also visible to the SaaS, separately from the encrypted envelope itself:

- Login-attempt records — who logged in, to which site, and when — retained for a 90-day window by default, then pruned nightly
- The IP address of the person logging in with a Site Access Key, in application logs

**Not visible at any point:** the plaintext login credential itself. There's no step in the flow where it passes through anything TrustedLogin operates — decryption happens only inside the Connector plugin, on the vendor's own site.
