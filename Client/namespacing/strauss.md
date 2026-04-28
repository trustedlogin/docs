---
title: Namespacing with Strauss
---

# Namespacing with Strauss

Strauss namespaces the TrustedLogin Client SDK so it can ship safely alongside other plugins that also use TrustedLogin without class collisions.

:::info
### When you see `ProBlockBuilder`, replace with your own namespace
The examples below use "Pro Block Builder" / "Widgets, Co." as a placeholder. Use a unique prefix for your business or plugin.
:::

If you're integrating into a plugin that already has its own `composer.json`, also see [Merging into an existing composer.json](./merging-into-existing-composer) for common host-side gotchas.

If you're using an AI coding assistant for the integration, see the [AI Integration Prompt](../integration-prompt) — it bundles this recipe with input collection, host-side conflict detection, and a verification checklist into a single self-contained prompt you paste into the assistant.

## Step 1. Add Strauss as a dev dependency

You'll add `brianhenryie/strauss` to `require-dev` in your `composer.json` (see step 2 below). Composer installs Strauss at `vendor/bin/strauss`, so no manual `curl` of `strauss.phar` is needed.

## Step 2. Update `composer.json`

Update your `composer.json` to require the SDK and configure Strauss:

```json
{
  "require": {
    "trustedlogin/client": "dev-main"
  },
  "require-dev": {
    "brianhenryie/strauss": "dev-master",
    "scssphp/scssphp": "^1.11.0"
  },
  "config": {
    "allow-plugins": {
      "composer/installers": true
    }
  },
  "extra": {
    "strauss": {
      "target_directory": "vendor-namespaced",
      "namespace_prefix": "ProBlockBuilder\\",
      "classmap_prefix": "ProBlockBuilder_",
      "classmap_output": true,
      "delete_vendor_packages": true,
      "packages": ["trustedlogin/client"]
    }
  },
  "scripts": {
    "strauss": ["@php vendor/bin/strauss"],
    "trustedlogin": [
      "@php vendor-namespaced/trustedlogin/client/bin/build-sass --namespace=ProBlockBuilder"
    ],
    "post-install-cmd": ["@strauss", "@trustedlogin"],
    "post-update-cmd":  ["@strauss", "@trustedlogin"]
  }
}
```

### Why each line matters

- **`"@php vendor/bin/strauss"`** — Strauss is installed by Composer when listed in `require-dev`, so the binary lives at `vendor/bin/strauss`. Don't use `@php strauss.phar` — that requires you to manually `curl` the phar separately, and trips a `Could not open input file` fatal on every `composer install` if you don't.

- **`delete_vendor_packages: true`** — after Strauss copies the SDK to `vendor-namespaced/`, this option deletes the original `vendor/trustedlogin/`. Without it, the bare un-namespaced classes are still reachable through Composer's classmap, defeating the purpose of namespacing.

  **Side effect:** Strauss also generates `vendor/composer/autoload_aliases.php`, a dev-time back-compat shim that registers an SPL autoloader for the bare `\TrustedLogin\*` namespace. Per Strauss's own README, this file "should not be included in your production code" — and it isn't, because `/vendor` should be excluded from your release zip via your build pipeline (`.gitattributes export-ignore`, `.distignore`, build allowlist, etc.).

- **`config.allow-plugins.composer/installers: true`** — Composer 2.9+ refuses to install plugin packages without explicit trust. Without this, `composer install` hangs on an interactive prompt (or fails in CI).

- **`classmap_output: true`** — Strauss writes a self-contained classmap autoloader at `vendor-namespaced/composer/autoload_static.php`. You'll load `vendor-namespaced/autoload.php` from your bootstrap.

## Step 3. Run `composer install`

```bash
composer install
```

The `post-install-cmd` script runs Strauss and the CSS namespacing build automatically. After `composer install` completes:

- `vendor-namespaced/trustedlogin/client/` exists with the namespaced SDK.
- `vendor/trustedlogin/` does **not** exist (Strauss deleted it per `delete_vendor_packages: true`).
- The bundled CSS at `vendor-namespaced/trustedlogin/client/src/assets/trustedlogin.css` has been regenerated with prefixed class names.

## Step 4. Include the namespaced autoloader

In your plugin's main file (or wherever you bootstrap), load the Strauss-generated autoloader on every page load:

```php
// For a plugin or theme:
require_once trailingslashit( dirname( __FILE__ ) ) . 'vendor-namespaced/autoload.php';
```

:::warning
**Don't load `vendor/autoload.php` for the SDK** — that resolves to the un-namespaced original (`\TrustedLogin\Client`) via the bare-namespace classmap (or, with `delete_vendor_packages: true`, an autoloader pointing at deleted files). Strauss's own self-contained autoloader is at `vendor-namespaced/autoload.php` regardless of the `classmap_output` setting.
:::

If your plugin uses Composer for its own dependencies and already loads `vendor/autoload.php`, that's fine — both autoloaders can coexist. The namespaced TrustedLogin SDK lives only at `vendor-namespaced/`.

## Step 5. Configure and instantiate the Client

Follow [the directions to configure and instantiate the client](../configuration). Use your prefix when referencing the namespaced classes:

```php
new \ProBlockBuilder\TrustedLogin\Client(
    new \ProBlockBuilder\TrustedLogin\Config( $config )
);
```
