---
title: Installation
sidebar: auto
sidebar_position: 2
---

## Including in your plugin or theme {#including-in-your-plugin-or-theme}

### 1. Install the TrustedLogin SDK using Composer

Run `composer require trustedlogin/client:dev-main` to install the TrustedLogin Client SDK as a dependency.

### 2. Add SCSS as a dev dependency

Run `composer require scssphp/scssphp --dev` to install `scssphp` as a dev dependency.

This is used to generate and namespace the CSS used by TrustedLogin. If you already have `scssphp` installed, or are [using an alternative way to namespace the CSS](/Client/css-namespacing.md), skip this step.

### 3. Namespace the SDK using [Strauss](/Client/namespacing/strauss) or [PHP-Scoper](/Client/namespacing/php-scoper).

In order to prevent conflicts with other plugins or themes that are using TrustedLogin, you must namespace the TrustedLogin Client SDK.

We support two namespacing tools: Strauss and PHP-Scoper. Choose the one that best fits your needs: 

- [Strauss](/Client/namespacing/strauss)
- [PHP-Scoper](/Client/namespacing/php-scoper)

### 4. [Namespace the CSS files](/Client/Namespacing/css-namespacing)

TrustedLogin CSS files are namespaced so that they don't conflict with other plugins or themes that are using TrustedLogin. 

Follow the [CSS Namespacing](/Client/css-namespacing.md) guide.

### 4. Include the autoloader

Make sure you have the Composer autoloader included in your plugin or theme. If you already have the autoloader included, you can skip this step.

```php
// Include the Composer autoloader.
require_once trailingslashit( dirname( __FILE__ ) ) . 'vendor/autoload.php';
```

Make sure to **include the autoloader on all page loads** to ensure the TrustedLogin SDK is available when needed.

### 5. Customize the [TrustedLogin configuration](/Client/configuration) options

The configuration array is where you set up the TrustedLogin Client SDK to work with your plugin or theme. You can customize the configuration to match your needs.

### 6. Instantiate the TrustedLogin Client

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
- The current website lacks expected encryption functions (these _should_ be included in all WordPress installations as well as PHP 7.2).

Wrapping the instantiation in a try/catch block ensures that the site won't crash if TrustedLogin fails to initialize.

------

## Advanced

### Vendor directory cleanup

If you find the TrustedLogin directories in your `vendor/` directory to be undesirable for some reason, you may use this configuration for the `trustedlogin` script in Composer.

:::info
### When you see `ProBlockBuilder`, make sure to replace with your own namespace!
In the examples below, we're going to pretend your plugin or theme is named "Pro Block Builder" and your business is named Widgets, Co. These should not be the names you use—make sure to update the sample code below to match your business and plugin/theme name!
:::

Replace this:

```json
"trustedlogin": [
  "@php vendor/bin/build-sass --namespace=ProBlockBuilder"
 ],
```

With this:

```json
"trustedlogin": [
  "@php vendor/bin/build-sass --namespace=ProBlockBuilder",
   "[ -d 'vendor/trustedlogin' ] && rm -rf vendor/trustedlogin || true",
   "[ -d 'vendor/scssphp' ] && rm -rf vendor/scssphp || true",
   "[ -d 'vendor/bin' ] && rm -rf vendor/bin/build-sass && rm -rf vendor/bin/pscss || true"
 ],
```

The script modification will now remove the `trustedlogin`, `scssphp`, and TrustedLogin-related files inside `bin`.

### Testing on local environments {#testing-on-local-environments}

TrustedLogin won't work in local environments unless using a tunnel such as ngrok. Thus, TrustedLogin will display a warning when attempting to generate a login when in a local environment.

To disable the warning, define `TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE` and set it to true:

```php
define( 'TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE', true );
```
