---
title: Vendor Plugin
sidebar_position: 1
---
# TrustedLogin Vendor Plugin

Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations.

## Why it's used

### Incomplete information

The [design of TrustedLogin](/flows) ensures that no site access data stored in the SaaS is sensitive: every access requires that the SaaS and Vendor agree that the credentials are valid.

### Help Desk integration

The Vendor plugin is the bridge used for support desk integrations: when providing customer support in Help Scout, for example, the email address is sent to the Vendor plugin.

The plugin generates a list of licenses that are connected to that email address, generate hashes that are used as Secret IDs, then and ask the SaaS for a list of any matching Secret IDs.

In this way, the SaaS knows nothing about the customer being supported, only the request for matching Secret IDs.

:::info
Articles showing setup and documenting the help desk functionality are in progress. Only developer docs are currently available.
:::

## See developer docs:

- [Local Development](./development)
- [WordPress Hooks](./hooks)