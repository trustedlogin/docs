---
title: Envelope Signature Verification
sidebar_position: 8
---

# Envelope Signature Verification

When a customer grants you support access, TrustedLogin's SaaS hands your Connector an **envelope** — an encrypted blob carrying the bearer identifier your Connector will use to sign the support session into the customer site. Your Connector decrypts the envelope, then redirects the support agent into the customer site.

Envelope **signature verification** is the additional check that proves the envelope you're decrypting actually came from TrustedLogin's SaaS and was not tampered with in transit. The SaaS signs every envelope with an Ed25519 secret key; your Connector verifies the signature with the matching public key before doing anything with the envelope.

## Why this matters

Without signature verification, your Connector trusts whatever envelope the SaaS hands it. If TrustedLogin's SaaS is ever compromised — or if a network position lets an attacker substitute one envelope for another — the Connector has no way to detect the swap and will happily redirect the support agent into the wrong site.

With signature verification configured:

- Every envelope is cryptographically authenticated as coming from TrustedLogin's SaaS.
- A swapped or tampered envelope is rejected before any decryption happens.
- A compromised SaaS cannot trick your Connector into granting access to a site you didn't ask about.

## How to enable it

You need three things:

1. **The TrustedLogin SaaS public key.** Find it in your TrustedLogin account settings under **Vendor Site → Envelope Signing Key**. It's a 64-character hex string.
2. **A way to store the key on the Connector.** Either save it as a WordPress option named `trustedlogin_vendor_saas_envelope_public_key`, or return it from the `trustedlogin/connector/envelope/saas-public-key` filter.
3. **Confirmation that hard-mode enforcement is on.** This is the default whenever a key is configured — you don't have to do anything else.

### Storing the key as an option

The simplest approach. Save the key once via WP-CLI:

```bash
wp option update trustedlogin_vendor_saas_envelope_public_key 'a1b2c3d4...your 64-char hex key here...'
```

After that, every envelope verification on the Connector reads from this option.

### Storing the key in code

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

## What happens when verification is disabled

If no key is configured (no option, no filter), your Connector cannot enforce signatures it has nothing to verify against — so signed envelopes are accepted on trust.

When this is the case, the TrustedLogin admin pages display a persistent warning:

> **Envelope signature verification is off.** Your Connector currently accepts envelopes from TrustedLogin's SaaS without verifying their signatures. Anyone who could substitute or tamper with an envelope in transit could redirect support sessions to the wrong site.

The warning links back to this page. It only shows on TrustedLogin admin pages and is only visible to administrators.

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
| `$enforce` | `bool` | Defaults to `true` whenever a verification key is configured (i.e. whenever `EnvelopeVerifier::is_enabled()` returns true). Defaults to `false` when no key is configured (you cannot enforce what you cannot verify). Return `false` explicitly to opt back into soft-mode during a rollout. |
