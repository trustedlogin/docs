---
title: Encrypted Messages
---

# Encrypted Messages

TrustedLogin now encrypts the notifications your customers' sites send to yours when they grant, extend, or revoke support access.

## What Changed

Previously, when a customer clicked "Grant Access," their site sent a plaintext webhook to your Connector — the access key, site URL, and optional debug data were visible in transit and in your server logs.

Now, those notifications are **encrypted before they leave the customer's site** and buffered on the TrustedLogin SaaS until your Connector picks them up. Your Connector is the only system that can decrypt them.

## How It Works

You don't need to change anything. If you're running Connector v1.4+, encrypted messages are enabled automatically alongside the existing webhook for backward compatibility.

1. **Customer grants access** → their site encrypts the notification with your Connector's public key.
2. **Notification is stored** on TrustedLogin's servers as an opaque blob — TrustedLogin cannot read it.
3. **Your Connector polls** every 5 minutes and decrypts the messages.
4. **Help desk integrations** (Help Scout, FreeScout) receive the decrypted data, same as before.

## Benefits

- **No more plaintext in server logs.** The access key and debug data are encrypted end-to-end.
- **Works behind firewalls.** Customers on VPN-only or firewalled networks can now send notifications — they only need outbound access to `app.trustedlogin.com`, which they already have.
- **Reliable delivery.** Messages are buffered for up to 30 days, so a temporary outage on your side doesn't lose notifications.
- **No configuration needed.** The Connector handles polling automatically.

## Polling Interval

Your Connector checks for new messages every 5 minutes via WP-Cron. If you need real-time delivery, the TrustedLogin SaaS can push a notification to your Connector to trigger an immediate poll (coming in a future update).

You can also click "Poll now" on the TrustedLogin Settings page to check immediately.

## Key Rotation Safety

If you run "Reset All" on your Connector (which generates new encryption keys), there's a brief window where customer sites may still be using the old public key. TrustedLogin now handles this gracefully — old keys are retained for 20 minutes after rotation, so messages encrypted with the old key can still be decrypted.

## Backward Compatibility

During the transition period, the client SDK sends **both** a traditional webhook POST (if configured) and an encrypted message. You can remove your webhook URL from client SDK settings once you've confirmed encrypted messages are working.

## FAQ

### Do I need to update the client SDK on customer sites?

Yes — customers need to be running a client SDK version that supports encrypted messages (v1.10+). Older client SDK versions continue to send plaintext webhooks, which still work.

### Does this replace Help Scout / FreeScout integration?

No. Encrypted messages are the *transport* — they replace the plaintext webhook, not the help desk integration. Once your Connector decrypts a message, it fires the same `trustedlogin_connector/message_received` action that your Help Scout or FreeScout integration hooks into.

### What if the TrustedLogin SaaS is down?

Messages are buffered on the SaaS for up to 30 days. If the SaaS is temporarily unreachable, the customer's site logs the failure and moves on — the access grant still works, only the notification is delayed.

### Can TrustedLogin read my messages?

No. The SaaS stores encrypted bytes it cannot decrypt. Only your Connector's private key can open them.
