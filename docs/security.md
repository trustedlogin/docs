---
title: Security
sidebar: auto
sidebar_position: 2
---

# Security

:::info
For Client SDK security, see [Client SDK](/Client/security).
:::

## Encryption {#encryption}

The ID of the user who granted access to the website, the URL of the website where access is being granted as well as vendor-defined array of metadata are stored unencrypted.

Login credentials are encrypted using Sodium [sealed boxes](https://libsodium.gitbook.io/doc/public-key_cryptography/sealed_boxes) using keys generated using on the Vendor website.

Because cryptobox encryption cannot verify the identity of the sender, during decryption requests, the clients send additional headers (`X-TL-TOKEN`) with each request. The `X-TL-TOKEN` hash includes private keys only known to the Vendor and SaaS. Those private keys, if compromised, can be cycled SaaS-side.

## Encrypted-at-rest data storage {#encrypted-at-rest-data-storage}

Secrets are encrypted and stored using the [Sodium Secret Box](https://libsodium.gitbook.io/doc/public-key_cryptography/sealed_boxes) algorithm in the Hashicorp Vault.

:::note
For more information around data storage, see [SaaS Data Storage](/SaaS/data-storage).
:::

## SaaS application security {#saas-application-security}

### IP restrictions {#ip-restrictions}

The SaaS Vault, Elasticsearch, and Kibana are protected behind IP restrictions using Traefik. [See how Traefik is used](/SaaS/server-setup#traefik).

### Strong-password policy {#strong-password-policy}

The TrustedLogin application has a minimum password length of 12 characters. Passwords are required to meet [zxcvbn level 4](https://github.com/dropbox/zxcvbn): "very unguessable: strong protection from offline slow-hash scenario."

### 2FA {#2fa}

The application requires two-factor authentication (2FA) to create an account and 2FA is required on every login.

## Cleanup {#cleanup}

When accounts are deleted, the secrets associated with the team are deleted from the Vault.

Deleting a team triggers the `Laravel\Spark\Events\Teams\TeamDeleted` event. 

The following listeners are triggered by the `Laravel\Spark\Events\Teams\TeamDeleted` event:

- `\App\Listeners\RemoveTeamFromVault`
- `\App\Listeners\DeleteTeamElasticSearchData`

:::note
Team-specific data is removed from Elasticsearch, but non-identifiable usage data is kept for administrative reporting purposes.  
:::