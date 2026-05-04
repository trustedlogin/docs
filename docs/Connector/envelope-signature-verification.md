---
title: Envelope Signature Verification
sidebar_position: 8
---

# Envelope Signature Verification

When a customer grants you support access, TrustedLogin's SaaS hands your Connector an **envelope** — an encrypted blob carrying the bearer identifier your Connector will use to sign the support session into the customer site. Your Connector decrypts the envelope and redirects the support agent into the customer site.

Envelope **signature verification** is the additional check that proves the envelope you're decrypting actually came from TrustedLogin's SaaS and was not tampered with in transit. The SaaS signs every envelope with an Ed25519 secret key; your Connector verifies the signature with the matching public key before doing anything with the envelope.

## Why this matters

Without signature verification, your Connector trusts whatever envelope the SaaS hands it. If TrustedLogin's SaaS is ever compromised — or if a network position lets an attacker substitute one envelope for another — the Connector has no way to detect the swap and will happily redirect the support agent into the wrong site.

With signature verification configured:

- Every envelope is cryptographically authenticated as coming from TrustedLogin's SaaS.
- A swapped or tampered envelope is rejected before any decryption happens.
- A compromised SaaS cannot trick your Connector into granting access to a site you didn't ask about.

## How it works (the happy path)

You don't have to do anything. As soon as TrustedLogin's SaaS publishes a signing key, your Connector fetches it on the next envelope verification, pins it in the `trustedlogin_vendor_saas_envelope_public_key` option, and verifies every subsequent envelope against that pinned key.

If TrustedLogin ever rotates the signing key (rare, manually-driven event), the Connector detects the change on the next verification, pins the new key, and continues. The rotation is logged for your records.

This is the default. Most integrators never need to touch any setting.

## When you'll see the admin notice

If your Connector cannot verify envelope signatures — for example, because TrustedLogin's SaaS isn't publishing a signing key, or because your Connector couldn't reach the SaaS to fetch one — the TrustedLogin admin pages display a persistent warning:

> **Envelope signature verification is off.** Your Connector currently accepts envelopes from TrustedLogin's SaaS without verifying their signatures. Anyone who could substitute or tamper with an envelope in transit could redirect support sessions to the wrong site.

If you see this notice and TrustedLogin's SaaS *is* signing envelopes, your Connector probably hit a network issue at activation. The next successful envelope verification will retry the fetch and the notice will clear.

## Manually setting the key

You only need to do this if:

- You've disabled automatic key fetching (see below) and want strict out-of-band trust establishment.
- You're running a self-hosted SaaS that publishes the key somewhere other than the standard endpoint.

Two ways to set the key by hand:

### Via WP-CLI

```bash
# Fetch the SaaS's currently-published key.
curl https://app.trustedlogin.com/api/v1/envelope-signing-public-key
# {"publicKey":"a1b2c3...your 64-char hex key here..."}

# Pin it on the Connector.
wp option update trustedlogin_vendor_saas_envelope_public_key 'a1b2c3...'
```

### Via the saas-public-key filter

If you'd rather keep the key out of the database (e.g. you store it in environment variables alongside other secrets), wire it via the filter:

```php
add_filter(
    'trustedlogin/connector/envelope/saas-public-key',
    function () {
        return getenv( 'TRUSTEDLOGIN_SAAS_PUBLIC_KEY' );
    }
);
```

The filter takes precedence over the option when both are set.

## Disabling automatic key fetching

If you want strict out-of-band trust establishment — e.g. you require a human to verify the key fingerprint before the Connector trusts it — you can disable both the trust-on-first-use fetch and the rotation refetch:

```php
add_filter( 'trustedlogin/connector/envelope/auto-fetch-key', '__return_false' );
```

With this filter in place, you must set the key manually via WP-CLI or the `saas-public-key` filter. Rotations also become manual: when TrustedLogin announces a key rotation, you set the new key by hand.

## Soft-mode rollout (escape hatch)

If you've configured a key but you're staging a SaaS deployment that doesn't sign envelopes yet, you can opt into soft-mode temporarily — unsigned envelopes are accepted with a warning logged to debug.log:

```php
add_filter( 'trustedlogin/connector/envelope/require-signature', '__return_false' );
```

This is intended only for short rollout windows. Remove the filter as soon as the SaaS side is signing.

## Hooks reference

### `trustedlogin/connector/envelope/saas-public-key`

Filters the hex-encoded sodium public key used to verify SaaS envelope signatures.

| Parameter | Type | Description |
|---|---|---|
| `$public_key_hex` | `string\|null` | Defaults to the value of the WordPress option `trustedlogin_vendor_saas_envelope_public_key`. Return `null` or an empty string to disable verification entirely (legacy-compat mode). |

### `trustedlogin/connector/envelope/require-signature`

Filters whether envelopes must carry a valid signature before the Connector will decrypt them.

| Parameter | Type | Description |
|---|---|---|
| `$enforce` | `bool` | Defaults to `true` whenever a verification key is configured. Defaults to `false` when no key is configured (you cannot enforce what you cannot verify). Return `false` explicitly to opt back into soft-mode during a rollout. |

### `trustedlogin/connector/envelope/auto-fetch-key`

Filters whether the Connector may fetch the SaaS envelope-signing public key automatically.

| Parameter | Type | Description |
|---|---|---|
| `$enabled` | `bool` | Defaults to `true`. Both trust-on-first-use and the rotation-detection refetch are gated on this filter. Return `false` to require manual key delivery via the option or the `saas-public-key` filter. |
