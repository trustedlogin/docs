---
title: SaaS Intro
sidebar: auto
sidebar_position: 1
---

# TrustedLogin SaaS (Hosted Application)

The application handles account management, profiles, and billing. The SaaS receives and **processes login and validation requests** from the [Client SDK](../Client/intro) and [Vendor plugin](../Vendor/intro).

## SLA {#service-level-agreement}

We have a 99.99% uptime commitment for our Enterprise-level customers. Please [read the SLA on our website](https://www.trustedlogin.com/service-level-agreement/).

## HTTP API {#http-api}

The TrustedLogin API is [documented on the TrustedLogin website](https://app.trustedlogin.com/docs/api/):

- [Authenticating requests](https://app.trustedlogin.com/docs/api/#authenticating-requests)
- [Accounts API](https://app.trustedlogin.com/docs/api/#accounts-api)
- [Endpoints](https://app.trustedlogin.com/docs/api/#endpoints)
- [Sites API](https://app.trustedlogin.com/docs/api/#sites-api)

There's also a [Postman collection](https://app.trustedlogin.com/docs/collection.json) available.

## Server Setup {#server-setup}

The TrustedLogin application is powered by Laravel and run on a Dockerized, high-availability, Kubernetes cluster.

**[Learn more about the Server Setup](./server-setup)**