---
title: Merging into an existing composer.json
sidebar_label: Merging into existing composer.json
sidebar_position: 4
---

# Merging into an existing `composer.json`

If your plugin already ships a `composer.json`, you'll merge the TrustedLogin integration into the host's setup rather than create one from scratch. Several host-side configurations can conflict with the namespacing tools — here's what to look for.

If your plugin has no prior Composer setup, skip this page — the [Strauss](./strauss) and [PHP-Scoper](./php-scoper) recipes work cleanly out of the box.

## Platform PHP version

If the host pins `config.platform.php` below `7.4`, Composer refuses to install Strauss `dev-master` (which requires `nikic/php-parser ^5`, needing PHP ≥ 7.4).

This is a **build-time** concern only — your shipped, namespaced SDK supports PHP 5.3+ at runtime regardless of what version Strauss ran on. Two options:

- Bump `config.platform.php` to `7.4`. This doesn't change customer-site runtime requirements (those come from your plugin's `Requires PHP` header, not Composer's platform setting).
- Pin `"brianhenryie/strauss": "^0.21"` for the legacy `nikic/php-parser ^4` line. You'll lose newer Strauss features but install will work on lower platform versions.

Either way, customers can still run PHP 5.3+. Strauss only runs on the *building* machine.

## Dependency conflicts

Old static-analysis dev deps sometimes cap `nikic/php-parser` at `^4`, which conflicts with Strauss `dev-master`. Common offenders: `exussum12/coverage-checker`, older versions of `phpstan/phpstan-wordpress`. Either remove/upgrade the conflicting dep, or pin Strauss to `^0.21`.

## `classmap-authoritative: true`

This setting is incompatible with running Strauss via composer-bin. Under classmap-authoritative, Composer ignores PSR-4 lookups, so `vendor/bin/strauss` can't resolve `Composer\Factory` — it exits 0 silently with no output, and you'll wonder why nothing happened.

Set `config.classmap-authoritative: false` for the build, or restore it post-install.

## `autoload.files` entries that reference WordPress classes

This is a common host-side trap. **Don't add the TrustedLogin bootstrap to `autoload.files`** — `require_once` it from your plugin's main file instead (which already has an ABSPATH check).

Composer eagerly loads everything in `autoload.files` during `composer install`, *before* WordPress is loaded. Any file there that references WP-only classes (e.g. `class Foo extends WP_Widget`) or short-circuits with `if ( ! defined( 'ABSPATH' ) ) { exit; }` will silently abort the installation mid-run.

If the host plugin already has files in `autoload.files` that reference WP classes, guard them:

```php
<?php
if ( ! defined( 'ABSPATH' ) ) {
    return;
}
// rest of file
```

Use `return;` (not `exit;`) — `exit` aborts the entire `composer install` process; `return;` just skips loading the one file.

## Existing `allow-plugins` blocks

If the host already declares `config.allow-plugins`, add `composer/installers: true` alongside whatever's there rather than overwriting:

```json
"config": {
    "allow-plugins": {
        "dealerdirect/phpcodesniffer-composer-installer": true,
        "composer/installers": true
    }
}
```

## Stale `composer.lock`

After editing `composer.json`, either delete `composer.lock` so Composer re-resolves from scratch, or run `composer update <packages>` to re-resolve only the packages you added:

```bash
composer update brianhenryie/strauss scssphp/scssphp trustedlogin/client
```

`composer install` (without arguments) replays the existing lockfile and silently ignores your new requirements otherwise. Symptom if you don't: "I added Strauss to require-dev but `vendor/bin/strauss` doesn't exist."

## Composer audit advisories

Composer 2.9+ refuses to install if any package in the resolution graph has an open security advisory — even one unrelated to your TrustedLogin integration. If the host pins old major versions of `phpunit/phpunit`, `yoast/phpunit-polyfills`, `symfony/*`, etc., you'll see `Your requirements could not be resolved` naming packages that have nothing to do with TrustedLogin, with a small note about "affected by security advisories." Two fixes:

- Bump the offending dev dep (preferred — but may cascade through other deps).
- Add `"config": { "audit": { "ignore": ["PKSA-xxxx-xxxx-xxxx"] } }` to skip the specific advisory. The advisory ID is in the resolution failure output.

Audit blocks only trigger on `install` / `update`, not at runtime, so customers never see them — but they will wedge your build until resolved.

## Strict `Composer\` autoload (rare)

Some host setups don't expose `Composer\Factory` to consumed scripts even with classmap-authoritative off. Symptom: same as classmap-authoritative — `vendor/bin/strauss` runs to exit 0 with no output. Add to the host `composer.json`:

```json
"autoload-dev": {
    "psr-4": {
        "Composer\\": "vendor/composer/composer/src/Composer/"
    }
}
```

Only add this if you see Strauss exit silently — for most hosts it's unnecessary.

## Repo hygiene

How you handle `vendor/` and `vendor-namespaced/` (or `build/`) in version control depends on the host's existing convention. The rules are:

- **If `/vendor` is already gitignored:** do nothing. Your new artifacts inherit the rule. Also gitignore `/vendor-namespaced/` (or `/build/`) — the host clearly relies on a build pipeline.
- **If the host commits `/vendor`:** don't touch their `.gitignore`. Commit your new artifacts alongside.

Production-zip exclusion follows the host's existing build mechanism — a `.distignore`, `.gitattributes export-ignore`, build allowlist (e.g. `build/file-allowlist.txt`), or release workflow. Add to that mechanism rather than introducing a competing one.
