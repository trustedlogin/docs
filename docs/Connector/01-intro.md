---
title: TrustedLogin Connector Plugin
sidebar_position: 1
---
# TrustedLogin Connector Plugin

A plugin to connect TrustedLogin's encrypted storage infrastructure using encrypted access keys.

## Why it's used {#why-its-used}

### Incomplete information {#incomplete-information}

The [design of TrustedLogin](/flows) ensures that no site access data stored in the SaaS is sensitive: every access requires that the SaaS and Connector agree that the credentials are valid.

### Help Desk integration {#help-desk-integration}

The Connector plugin is the bridge used for support desk integrations: when providing customer support in Help Scout, for example, the email address is sent to the Connector plugin.

The plugin generates a list of licenses that are connected to that email address, generate hashes that are used as Secret IDs, then and ask the SaaS for a list of any matching Secret IDs.

In this way, the SaaS knows nothing about the customer being supported, only the request for matching Secret IDs.

#### [Read how to configure the Help Scout integration](./help-scout). {#read-how-to-configure-the-help-scout-integration}

## See developer docs: {#see-developer-docs}

- [Local Development](./development)
- [WordPress Hooks](./hooks)
