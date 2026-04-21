---
title: One-Time Secrets
sidebar_position: 6
---

# Sharing Secrets Securely

Need to send an API key, password, or other sensitive info to a customer — or receive one from them? TrustedLogin's built-in secret sharing lets you do it without relying on third-party services like onetimesecret.com.

## Why Use This Instead of Pasting in a Ticket

When you paste a password into a Help Scout reply, it lives in that ticket forever — in your mailbox, in backups, in any integration that syncs your conversations. If someone gains access to your help desk months later, every secret you ever shared is sitting right there.

TrustedLogin's secret sharing works differently:

- You choose the lifetime: **single-use** (destroyed the moment the recipient reveals it) or **reusable** (available to anyone with the link until it expires — for credentials multiple teammates need).
- Every secret has a hard **expiration** between 1 hour and 30 days. After that the link becomes unusable, whether it was opened or not.
- Your WordPress site **never stores the readable version**. The decryption key only exists in the URL fragment — the part after `#` — which your server never receives.
- There's a full **audit trail** so you can see when the link was opened and from what IP (the recipient is anonymous — the link carries no identity).

## How to Share a Secret

1. Go to **TrustedLogin > Secrets** in your WordPress admin.
2. Paste the sensitive information into the text area.
3. Optionally set an expiration time (default: 24 hours) and a passphrase for extra protection.
4. Click **Create secret link**.
5. Copy the generated URL and paste it into your Help Scout reply, Slack message, or wherever you communicate with the customer.

That's it. When the customer opens the link, they'll see a confirmation page, click "Reveal," and the secret appears. Once they close the page, the secret is gone forever.

## Passphrase Protection

For extra-sensitive secrets, you can set a passphrase. The customer will need to type it before seeing the secret.

**Important:** Share the passphrase through a *different channel* than the link. If you send both in the same email, the passphrase doesn't add any protection.

After 5 wrong passphrase attempts, the secret is automatically destroyed.

## What the Customer Sees

When a customer opens your link, they see a simple, clean page:

1. **"Click to reveal"** — a big button confirming they want to view the secret. This prevents link-preview bots (Slack, iMessage) from accidentally consuming the secret.
2. **The secret** — displayed in a read-only text box with a "Copy to clipboard" button.
3. **"You can close this window"** — once they've copied what they need.

If they try to open the link again, they'll see: *"Information no longer available. Contact the person who sent you this link and ask them to create a new secret."*

## Expiration Options

| Duration | Best for |
|----------|----------|
| 1 hour | Quick credential handoff during a live chat |
| 24 hours (default) | Normal support ticket response |
| 3 days | Customer who might not check email right away |
| 7 days | Multi-day integrations or staging setups |
| 14 days | Sprint-length or trial-length workflows |
| 30 days (max) | Long-running projects |

If the customer doesn't open the link before it expires, you'll see "unopened, expired" in your history — and you'll know to send a new one.

## Your Secret History

Below the creation form, you'll see a table of your recent secrets with their status:

- **Active** — the secret exists and hasn't been opened yet.
- **Viewed** — the recipient successfully saw the secret.
- **Expired** — the secret expired before anyone opened it.
- **Burned** — you (or the system) destroyed it before it was viewed.

## Running Behind a Proxy or CDN

If your site is behind Cloudflare, a reverse proxy, or a load balancer, tell TrustedLogin which proxies to trust so rate-limit buckets and the audit log can show the real client IP instead of the edge.

Without this, every request from the same edge collapses into a single rate-limit bucket, which means one abusive recipient can trip the limit for everyone else sitting behind the same CDN — and `actor_ip` values in **TrustedLogin → Secrets → History** will all look like the edge.

Add the filter from your theme's `functions.php`, a must-use plugin, or a site-specific plugin:

```php
add_filter( 'trustedlogin/connector/trusted-proxies', function ( $ips ) {
    return array_merge( $ips, [
        '192.0.2.10',  // your reverse proxy / load balancer
    ] );
} );
```

Entries can be exact IP strings or CIDR ranges (e.g. `192.0.2.0/24`, `2a06:98c0::/29`). Forwarded headers (`X-Forwarded-For`, `CF-Connecting-IP`) are only read when `REMOTE_ADDR` matches an entry here — this prevents unauthenticated clients from spoofing their IP to sidestep rate limits.

For Cloudflare specifically, along with a full explanation of the trust model, see [Running behind a reverse proxy or CDN](./running-behind-a-proxy.md) — it includes a copy-paste snippet covering all Cloudflare edge CIDRs and guidance for nginx / Apache / HAProxy / cloud load balancers.

## Hardening (Optional)

For maximum security, your site admin can add a dedicated security key to `wp-config.php`:

```php
define( 'TRUSTEDLOGIN_SECRETS_HMAC_KEY', 'your-random-key-here' );
```

Generate a key by running this in your terminal:

```bash
php -r "echo bin2hex(random_bytes(32));"
```

This ensures that even a full database breach can't tamper with your secrets. Without this, TrustedLogin derives the key from your existing WordPress secret keys — still secure against most attacks, but this is an extra layer.

## FAQ

### Can I view my own secret?

Yes, but you'll see a warning: *"You created this secret. If you view it, the recipient will not be able to see it."* Viewing your own secret consumes it — the customer won't be able to open it after you do.

### What if the customer's link doesn't work?

The most common reason is that someone (or a bot) already opened it. Ask the customer to confirm, and create a new secret if needed. The audit trail in your history will show exactly what happened.

### Is the secret stored in my database?

Only in encrypted form, and only temporarily. Your WordPress site stores ciphertext that it literally cannot decrypt — the key is in the URL fragment, which your server never receives. Once the secret is viewed or expires, even the ciphertext is permanently deleted.

### Does this work if my site has a Redis cache?

Yes. TrustedLogin's secret storage intentionally bypasses WordPress's object cache to prevent cache eviction from silently destroying secrets.
