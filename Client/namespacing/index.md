---
title: Namespacing
---

Namespacing is vital for any instance of TrustedLogin to not conflict with other code running TrustedLogin.

There are two parts of the code that must be namespaced for TrustedLogin to function properly:

## PHP

- [Strauss](/Client/namespacing/strauss) (recommended)
- [PHP-Scoper](/Client/namespacing/php-scoper)

## CSS

- [CSS Namespacing](/Client/namespacing/css-namespacing)

## Integrating into a plugin that already has a `composer.json`

- [Merging into an existing composer.json](/Client/namespacing/merging-into-existing-composer) — host-side gotchas (platform PHP, classmap-authoritative, dependency conflicts, audit advisories, stale lockfile, autoload.files traps).
