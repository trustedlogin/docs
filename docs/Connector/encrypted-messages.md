---
title: Encrypted Messages
sidebar_position: 7
---

# Encrypted Messages

When a customer grants you support access, the **Grant Access** form on their site lets them send a short message describing what's wrong:

![The Grant Access form on a customer site, with the "Include a message for support?" panel expanded and a real customer message filled in.](/img/vendor/encrypted-messages/01-grant-access-message.png)

Encrypted Messages is the new transport for that message. The customer's site encrypts the message with your Connector's public key, hands it to TrustedLogin to buffer, and your Connector decrypts and surfaces it inside WordPress — no help-desk integration required to read it.

## How it works

You don't need to change anything. If you're running Connector v1.4+, encrypted messages are enabled automatically.

1. **Customer types a message in the Grant Access form** and clicks Grant.
2. **Their site encrypts the message** with your Connector's public key.
3. **TrustedLogin buffers the encrypted bytes** as an opaque blob — TrustedLogin cannot read them.
4. **Your Connector polls** every 5 minutes, decrypts the message, and stores it.
5. **The decrypted message appears inside the Connector plugin** alongside the access key and team metadata.

The same decrypted payload still fires the `trustedlogin_connector/message_received` action that your Help Scout / FreeScout integration hooks into, so existing workflows keep working without any changes.

## Benefits

- **Customer messages are visible inside the Connector.** Open the team's activity log in WordPress and read the customer's message in plain text — without leaving the plugin.
- **Works behind firewalls.** Customers on VPN-only or firewalled networks can now deliver the message; their site only needs outbound access to `app.trustedlogin.com`, which is already required.
- **Reliable delivery.** Messages are buffered for up to 30 days, so a temporary outage on your side doesn't lose them.
- **No configuration needed.** The Connector polls automatically.

## Polling Interval

Your Connector checks for new messages every 5 minutes via WP-Cron. If you want to fetch immediately, click **Poll now** on the TrustedLogin Settings page.

## FAQ

### Do I need to update the client SDK on customer sites?

No — the webhook keeps working with older client SDK versions. The difference is what you can read:

- **Customer on a client SDK that supports encrypted messages (v1.10+):** the message they typed in the Grant Access form is delivered to your Connector and is readable inside the plugin.
- **Customer on an older client SDK:** the webhook still fires the way it always has (so your Help Scout / FreeScout integration still gets the access key and metadata), but the **message they typed in the form is not accessible from inside the Connector plugin** — it only reaches your help desk through the webhook.

Updating customer sites to v1.10+ unlocks reading the message in WordPress; not updating doesn't break anything.

### Does this replace the webhook?

No. The webhook is part of how TrustedLogin works and isn't going anywhere. Encrypted Messages adds a parallel channel that brings the customer's message into the plugin itself — useful when you want to triage from WordPress without opening a ticket.

### Does this replace Help Scout / FreeScout integration?

No. Encrypted messages are an additional transport — they don't replace help-desk integrations. Once your Connector decrypts a message, it fires the same `trustedlogin_connector/message_received` action your Help Scout or FreeScout integration already hooks into.

### What if app.trustedlogin.com is down?

Messages are buffered on TrustedLogin's servers for up to 30 days. If the application is temporarily unreachable, the customer's site logs the failure and the access grant still succeeds — only the message delivery is delayed.

### Can TrustedLogin read my messages?

No. TrustedLogin stores encrypted bytes it cannot decrypt. Only your Connector's private key can open them.
