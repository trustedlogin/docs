---
title: Installation
---

:::tip Using an AI coding assistant?
Paste the [AI Integration Prompt](./integration-prompt) into Claude Code, Cursor, GitHub Copilot Chat, etc. It bundles every step on this page (plus host-side conflict detection for plugins with an existing `composer.json`, and a verification checklist) into a single self-contained recipe. Distilled from end-to-end testing across real plugins. Also reads as a thorough manual checklist if you want the deepest walkthrough.
:::

## Including in your plugin or theme {#including-in-your-plugin-or-theme}

### 1. Install the TrustedLogin SDK using Composer

Run `composer require trustedlogin/client:dev-main` to install the TrustedLogin Client SDK as a dependency.

### 2. Add SCSS as a dev dependency

Run `composer require scssphp/scssphp --dev` to install `scssphp` as a dev dependency.

This is used to generate and namespace the CSS used by TrustedLogin. If you already have `scssphp` installed, or are [using an alternative way to namespace the CSS](/Client/namespacing/css-namespacing), skip this step.

### 3. Namespace the SDK using [Strauss](/Client/namespacing/strauss) or [PHP-Scoper](/Client/namespacing/php-scoper)

In order to prevent conflicts with other plugins or themes that are using TrustedLogin, you must namespace the TrustedLogin Client SDK.

We support two namespacing tools:

- **[Strauss](/Client/namespacing/strauss) (recommended)** — Composer-installable, uses `delete_vendor_packages: true` to keep the un-namespaced source out of your dev tree.
- [PHP-Scoper](/Client/namespacing/php-scoper) — alternative; rewrites the SDK into `build/`.

If you're integrating into a plugin that already has its own `composer.json`, also see [Merging into an existing composer.json](/Client/namespacing/merging-into-existing-composer) for common host-side gotchas.

If you're using an AI coding assistant (Claude Code, Cursor, etc.) for the integration, paste the [AI Integration Prompt](/Client/integration-prompt) into your assistant — it encodes the full workflow as a single self-contained recipe.

### 4. [Namespace the CSS files](/Client/namespacing/css-namespacing)

TrustedLogin CSS files are namespaced so that they don't conflict with other plugins or themes that are using TrustedLogin.

Follow the [CSS Namespacing](/Client/namespacing/css-namespacing) guide.

### 5. Include the namespaced autoloader

Load the namespaced autoloader on **every** page load (admin and front-end). The exact path depends on which namespacing tool you chose:

- **Strauss:** `vendor-namespaced/autoload.php`
- **PHP-Scoper:** `vendor/autoload.php` after the host classmap is configured (see the PHP-Scoper guide).

```php
// For a plugin or theme using Strauss:
require_once trailingslashit( dirname( __FILE__ ) ) . 'vendor-namespaced/autoload.php';
```

:::warning
**Don't load `vendor/autoload.php` for the SDK when using Strauss** — that resolves to the un-namespaced original (`\TrustedLogin\Client`) via Composer's classmap, which would defeat the namespacing. Strauss writes its own self-contained autoloader to `vendor-namespaced/`. If your plugin already loads `vendor/autoload.php` for its own dependencies, that's fine — both autoloaders can coexist.
:::

### 6. Customize the [TrustedLogin configuration](/Client/configuration) options

The configuration array is where you set up the TrustedLogin Client SDK to work with your plugin or theme. You can customize the configuration to match your needs.

### 7. Instantiate the TrustedLogin Client

:::info
The TrustedLogin client must be initialized on all page loads, both the front-end and the dashboard.
:::

When instantiating the TrustedLogin `Client` class, you need to pass a valid `Config` object.

The following is a minimal configuration. It has all the _required_ settings, but not all **recommended** settings!

```php
/**
 * This is a basic example of how to instantiate the TrustedLogin Client, using the minimum required configuration
 * settings and hooked into the `plugins_loaded` action. Adjust the configuration to match your needs.
 */
add_action( 'plugins_loaded', function() {
    $config = [
        'auth' => [
            'api_key' => '1234567890',
        ],
        'vendor' => [
            'namespace' => 'pro-block-builder',
            'title' => 'Pro Block Builder',
            'email' => 'support@example.com',
            'website' => 'https://example.com',
            'support_url' => 'https://help.example.com',
        ],
        'role' => 'editor',
    ];

    try {
        new \ProBlockBuilder\TrustedLogin\Client(
            new \ProBlockBuilder\TrustedLogin\Config( $config )
        );
    } catch ( \Exception $exception ) {
        error_log( $exception->getMessage() );
    }
} );
```

#### Hooking the TrustedLogin Client instantiation

We recommend instantiating the TrustedLogin Client on the `plugins_loaded` action. This ensures that the TrustedLogin Client is available on all page loads.

TrustedLogin calls the following hooks:
- `init` priority `100`
- `admin_init` priority `100`
- `template_redirect` priority `99`

Instantiating the Client after any of these hooks are called will cause TrustedLogin to not function properly.

:::warning
**Always wrap TrustedLogin Client instantiation in a try/catch block!**
:::

TrustedLogin Client instantiation must be wrapped in a try/catch block. The TrustedLogin Client throws Exceptions when:

- The configuration is invalid.
- TrustedLogin is globally disabled.
- TrustedLogin is disabled for the namespace.
- The current website lacks expected encryption functions (these _should_ be included in WordPress 5.2+ and PHP 7.2+).

Wrapping the instantiation in a try/catch block ensures that the site won't crash if TrustedLogin fails to initialize.

------

## Advanced

### Testing on local environments {#testing-on-local-environments}

TrustedLogin won't work in local environments unless using a tunnel such as ngrok. Thus, TrustedLogin will display a warning when attempting to generate a login when in a local environment.

To disable the warning, define `TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE` and set it to true:

```php
define( 'TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE', true );
```
