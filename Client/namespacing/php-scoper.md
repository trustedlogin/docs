---
title: Namespacing with PHP-Scoper
---

# Namespacing with PHP-Scoper

PHP-Scoper is an alternative to [Strauss](./strauss) for namespacing the TrustedLogin Client SDK. Both achieve the same goal: prevent class collisions when multiple plugins ship the SDK.

PHP-Scoper rewrites the SDK into a `build/` directory with a prefixed namespace, leaving the original `vendor/` alone. You'll then point Composer's classmap at `build/`, regenerate the autoloader, and remove the un-namespaced original from `vendor/`.

:::info
### When you see `ProBlockBuilder`, replace with your own namespace
The examples below use "Pro Block Builder" / "Widgets, Co." as a placeholder. Use a unique prefix for your business or plugin.
:::

If you're integrating into a plugin that already has its own `composer.json`, also see [Merging into an existing composer.json](./merging-into-existing-composer) for common host-side gotchas.

## Step 1. Install PHP-Scoper

```bash
composer require --dev humbug/php-scoper
```

This installs PHP-Scoper at `vendor/bin/php-scoper`.

## Step 2. Install the TrustedLogin Client SDK

```bash
composer require trustedlogin/client:dev-main
composer require scssphp/scssphp --dev
```

`scssphp` is used to namespace the bundled CSS. Skip if you've already installed it or are [using an alternative way to namespace CSS](/Client/namespacing/css-namespacing).

## Step 3. Create `scoper.inc.php`

Create `scoper.inc.php` in your project root:

```php
<?php

declare( strict_types=1 );

use Isolated\Symfony\Component\Finder\Finder;

return [
    'finders' => [
        Finder::create()->files()->in( 'vendor/trustedlogin/client' )->name( [ 'LICENSE', 'composer.json' ] ),
        Finder::create()->files()->in( 'vendor/trustedlogin/client/src' )->name( [ '*.php', '*.css', '*.js' ] ),
    ],
    'patchers' => [
        function ( $file_path, $prefix, $content ) {
            // Classes and functions that TrustedLogin uses that should NOT be prefixed.
            $allowlist = [
                'DateTime', 'Exception', 'ImagickException', 'RuntimeException',
                'WP_Admin_Bar', 'WP_Debug_Data', 'WP_Error', 'WP_Filesystem_Base',
                'WP_Filesystem', 'WP_User', 'wp_get_environment_type',
            ];
            foreach ( $allowlist as $class ) {
                $content = str_replace(
                    [ $prefix . '\\' . $class, $prefix . '\\\\' . $class ],
                    $class,
                    $content
                );
            }
            return $content;
        },
    ],
];
```

## Step 4. Update your `composer.json`

Add the `autoload.classmap` entry pointing at `build/`, the `classmap-authoritative` setting (so bare-namespace lookups can't fall through to PSR-4), and the build script:

```json
"autoload": {
    "classmap": ["build"]
},
"config": {
    "allow-plugins": {
        "composer/installers": true
    },
    "classmap-authoritative": true
},
"scripts": {
    "php-scoper": [
        "@php vendor/trustedlogin/client/bin/build-sass --namespace=ProBlockBuilder --assets_dir=vendor/trustedlogin/client/src/assets --export_dir=vendor/trustedlogin/client/src/assets",
        "vendor/bin/php-scoper add-prefix --prefix=ProBlockBuilder --force --quiet",
        "rm -rf vendor/trustedlogin",
        "@composer dump-autoload --classmap-authoritative"
    ],
    "post-install-cmd": [ "@php-scoper" ],
    "post-update-cmd": [ "@php-scoper" ]
}
```

:::warning
**Do not include `"vendor"` in this classmap.** Adding `vendor` re-exposes the bare un-namespaced `\TrustedLogin\` classes alongside your prefixed ones, defeating the namespacing. Point the classmap at `build/` only.
:::

:::note Cross-platform note
The `rm -rf vendor/trustedlogin` line is shell, not PHP, so it requires Mac/Linux/WSL. On native Windows you'll need to substitute the equivalent (`rmdir /S /Q vendor\trustedlogin` from `cmd`, or `Remove-Item -Recurse -Force vendor\trustedlogin` from PowerShell), or replace it with a small PHP cleanup script committed to your plugin.
:::

## Step 5. Create the empty `build/` directory before the first install

Composer's autoload generation scans the `autoload.classmap` entries during `composer install`, *before* `post-install-cmd` runs. If `build/` doesn't exist on the first install, the scan errors out. Create it once:

```bash
mkdir -p build
```

(After the first run, `build/` is populated by PHP-Scoper and stays present across subsequent installs. The `mkdir` is only needed once per fresh checkout.)

## Step 6. Run `composer install`

```bash
composer install
```

This installs the dependencies, then triggers the `php-scoper` script via `post-install-cmd`:

1. `build-sass` compiles the SDK's SCSS sources with your prefix, writing the namespaced CSS to `vendor/trustedlogin/client/src/assets/trustedlogin.css` (selectors like `.tl-problockbuilder-auth` — `build-sass` lowercases the prefix — instead of the default `.tl-test-auth`).
2. PHP-Scoper copies the SDK (including the just-compiled CSS) into `build/`, rewriting PHP namespaces.
3. The shell command removes the un-namespaced original at `vendor/trustedlogin/`.
4. `composer dump-autoload --classmap-authoritative` regenerates the autoload, scanning `build/` for the prefixed classes and skipping the (now missing) `vendor/trustedlogin/`.

After this completes:
- `build/` contains the prefixed SDK with `build/src/assets/trustedlogin.css` carrying your prefixed selectors.
- `vendor/trustedlogin/` is gone.
- `vendor/composer/autoload_classmap.php` resolves your prefixed `\ProBlockBuilder\TrustedLogin\Client` to `build/src/Client.php`.

## Step 7. Include the autoloader

In your plugin's bootstrap:

```php
require_once trailingslashit( dirname( __FILE__ ) ) . 'vendor/autoload.php';
```

After steps 4–6, `vendor/autoload.php` resolves your prefixed classes (via the classmap pointing at `build/`) and the bare un-namespaced classes are unreachable (because `vendor/trustedlogin/` is gone and `classmap-authoritative` disables PSR-4 fallback).

## Step 8. Configure and instantiate the Client

Follow [the directions to configure and instantiate the client](../configuration). Use your prefix:

```php
new \ProBlockBuilder\TrustedLogin\Client(
    new \ProBlockBuilder\TrustedLogin\Config( $config )
);
```
