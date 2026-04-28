# Running behind a reverse proxy or CDN

If TrustedLogin Connector sits behind Cloudflare, a reverse proxy (nginx, HAProxy, AWS ALB), or a load balancer, this page is for you. It covers **why** the plugin doesn't trust forwarded IP headers by default, **what you'll see if you skip configuration**, and **how to configure it** for common setups — including a copy-paste snippet for Cloudflare.

## The short version

By default the Connector trusts only `$_SERVER['REMOTE_ADDR']` (the TCP peer address) when determining the requester's IP. If you run behind a proxy, `REMOTE_ADDR` is your proxy's IP for every request — which degrades two things:

- **Per-IP rate limits** on the Secrets endpoints bucket by proxy IP, so unrelated recipients behind the same proxy can collide in a single bucket.
- **`actor_ip`** on the Secrets audit log shows the proxy IP, not the recipient's real IP, making after-the-fact incident response harder.

To fix both, add your proxy's IPs to the `trustedlogin/connector/trusted-proxies` filter. The plugin will then read `X-Forwarded-For` or `CF-Connecting-IP` (the forwarded headers that carry the real client IP) — **but only for requests that actually came from a proxy you listed.**

## Why the opt-in default?

A request's HTTP headers are plain text in the request body. Any client can send `CF-Connecting-IP: 1.2.3.4` from anywhere — it's not validated by TCP or TLS. The only field an attacker **can't** forge over a real HTTPS connection is `REMOTE_ADDR`, because the TCP three-way handshake won't complete if they can't actually receive packets at the address they claim to be sending from.

So HTTP headers are trustworthy **only because of where they came from.** If Cloudflare set `CF-Connecting-IP`, it's accurate — Cloudflare fills in the value from data it can see and strips anything the original client tried to send. If anyone else set it, it's whatever they typed.

The rule the plugin uses:

> Trust a forwarded header **only when** the TCP peer (`REMOTE_ADDR`) is a proxy you've pre-declared.

Pre-1.4, those headers were trusted unconditionally, which let any unauthenticated client burn a different IP's rate-limit bucket by sending a spoofed `X-Forwarded-For` — a rate-limit bypass. That's the hole closed in 1.4.

## What breaks without the filter

Nothing dangerous — the defaults are **safe but degraded**:

| Surface | Default behavior (filter empty) | With filter configured |
|---|---|---|
| Secrets per-IP rate limit | Bucketed by proxy IP — two unrelated recipients behind the same edge share a bucket | Bucketed by real client IP |
| `wp_tl_secret_audit.actor_ip` | Proxy IP | Real client IP |
| Spoofing resistance | Attacker can't spoof — forwarded headers are ignored | Attacker can't spoof from outside the proxy either (the `REMOTE_ADDR` gate still applies) |

If you're a small-volume self-hoster, the degraded state may be fine. If you run a busy support operation behind Cloudflare, configure the filter.

## Configuring for Cloudflare

Cloudflare publishes their edge IPs as CIDR ranges at [cloudflare.com/ips/](https://www.cloudflare.com/ips/). As of this writing, the public list is 15 IPv4 CIDRs and a handful of IPv6 CIDRs.

The `trustedlogin/connector/trusted-proxies` filter expects an array of exact `REMOTE_ADDR` strings. When paired with the CIDR-matching support added alongside this page, you can list CIDRs directly:

```php
<?php
/**
 * Trust Cloudflare's edge proxies so `CF-Connecting-IP` carries
 * the real visitor IP into rate limits and audit logs.
 *
 * IPs pulled from https://www.cloudflare.com/ips/ — review that
 * page periodically and refresh if Cloudflare rotates ranges.
 */
add_filter( 'trustedlogin/connector/trusted-proxies', function ( $proxies ) {
    $cloudflare = array(
        // IPv4
        '173.245.48.0/20',
        '103.21.244.0/22',
        '103.22.200.0/22',
        '103.31.4.0/22',
        '141.101.64.0/18',
        '108.162.192.0/18',
        '190.93.240.0/20',
        '188.114.96.0/20',
        '197.234.240.0/22',
        '198.41.128.0/17',
        '162.158.0.0/15',
        '104.16.0.0/13',
        '104.24.0.0/14',
        '172.64.0.0/13',
        '131.0.72.0/22',

        // IPv6
        '2400:cb00::/32',
        '2606:4700::/32',
        '2803:f800::/32',
        '2405:b500::/32',
        '2405:8100::/32',
        '2a06:98c0::/29',
        '2c0f:f248::/32',
    );

    return array_merge( $proxies, $cloudflare );
} );
```

Drop that into a must-use plugin (`wp-content/mu-plugins/trusted-proxies.php`) or the end of your theme's `functions.php`.

:::warning
Cloudflare rotates edge ranges occasionally. If your audit logs start showing Cloudflare-owned IPs instead of real client IPs, compare your list against [cloudflare.com/ips/](https://www.cloudflare.com/ips/) and update. The default empty-filter behavior (degraded but safe) kicks in automatically if your list goes stale — nothing silently breaks security.
:::

## Configuring for other proxies

The same pattern works for any proxy — list the IPs the plugin should treat as a trusted upstream.

**nginx reverse proxy (single host):**

```php
add_filter( 'trustedlogin/connector/trusted-proxies', function ( $proxies ) {
    $proxies[] = '192.0.2.10';  // your nginx front-end
    return $proxies;
} );
```

**HAProxy HA pair:**

```php
add_filter( 'trustedlogin/connector/trusted-proxies', function ( $proxies ) {
    return array_merge( $proxies, array(
        '192.0.2.10',
        '192.0.2.11',
    ) );
} );
```

**AWS Application Load Balancer:** ALBs have dynamic IPs. Either use `set_real_ip_from` at nginx/Apache (recommended — see below), or allowlist the ALB's VPC subnet as a CIDR.

**Fastly, Akamai, CloudFront:** each publishes their edge ranges. Find the current list in their documentation and add them the same way.

## When NOT to use this filter

If your web server (nginx, Apache, Litespeed) is already configured with a directive like `set_real_ip_from` (nginx) or `mod_remoteip` (Apache), `$_SERVER['REMOTE_ADDR']` already reflects the real client IP by the time PHP runs. The plugin's filter becomes a no-op — which is fine; the web server is the correct layer for this rewrite.

**In general:**

| Your stack has… | Do this |
|---|---|
| nginx `set_real_ip_from` already set by host | Nothing — `REMOTE_ADDR` is already correct |
| Apache `mod_remoteip` already set | Nothing — same |
| No server-level config, but you can edit nginx | Prefer adding `set_real_ip_from` to nginx (not the PHP filter). The fix applies to every PHP app on the box, not just TrustedLogin |
| Shared/managed host where you can't change nginx | Use this filter |

## How the filter handles the match

For each entry in the filter array:

1. If the entry is a plain IP (`192.0.2.10`), it's compared exactly against `REMOTE_ADDR`.
2. If the entry looks like a CIDR (`192.0.2.0/24` or `2a06:98c0::/29`), `REMOTE_ADDR` is tested for membership.
3. Invalid entries are ignored (they won't match; they also won't error).

Only if one entry matches does the plugin go on to read `CF-Connecting-IP` and then (if absent) `X-Forwarded-For`. Both are validated as IP addresses before being used.

## Pairing with rate-limit configuration

The [`trustedlogin/connector/secrets/rate-limit/enabled`](./hooks.md#secrets-rate-limit-enabled) filter is **not** a substitute for configuring trusted proxies. Disabling rate limits removes your primary brute-force defense on passphrase-protected secrets. Configure trusted proxies so rate limits bucket correctly instead.

## See also

- [`trustedlogin/connector/trusted-proxies` filter reference](./hooks.md#trusted-proxies)
- [`trustedlogin/connector/secrets/rate-limit/enabled` filter reference](./hooks.md#secrets-rate-limit-enabled)
- [Secrets overview](./secrets.md)
- [Cloudflare IP Ranges](https://www.cloudflare.com/ips/)
