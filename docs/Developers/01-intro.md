---
title: Developers
sidebar_label: Overview
sidebar_position: 1
---

# Developer documentation

Everything a developer needs to integrate with TrustedLogin — whether you're embedding the Client SDK in your own plugin, extending the Connector plugin's behavior, or building tooling against the HTTP API.

## Client SDK

The Client SDK is the PHP library you ship inside your own plugin or theme so customers can grant your support team time-limited access to their site.

- [Get started](./Client/intro)
- [Installation](./Client/installation)
- [Configuration](./Client/configuration)
- [Customization](./Client/customization)
- [Hooks](./Client/hooks)
- [Troubleshooting](./Client/troubleshooting)

## Connector internals

Reference for engineers extending or hardening a Connector deployment — hooks, secrets, signing, and infrastructure topics that don't belong in the customer-facing Connector docs.

- [Connector development](./Connector-development)
- [Connector hooks](./Connector-hooks)
- [Encrypted messages](./Connector-encrypted-messages)
- [Envelope signature verification](./Connector-envelope-signature-verification)
- [Secrets management](./Connector-secrets)
- [Running behind a proxy](./Connector-running-behind-a-proxy)

## HTTP API

Programmatic access to the same operations the dashboard exposes — for custom integrations, automation, and your own tooling.

- [HTTP API reference](./http-api)
