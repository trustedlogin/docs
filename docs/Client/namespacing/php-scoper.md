---
title: Namespacing with PHP-Scoper
sidebar_label: PHP-Scoper
sidebar: auto
sidebar_position: 2
---

## Using PHP-Scoper

PHP-Scoper may be used for namespacing the TrustedLogin client to prevent conflicts with other plugins or themes that are using TrustedLogin.

### 1. Install PHP-Scoper

Follow the instructions in the [PHP-Scoper documentation](https://github.com/humbug/php-scoper/blob/main/docs/installation.md#installation) to install PHP-Scoper.

### 2. Install the TrustedLogin Client SDK

1. Run `composer require trustedlogin/client:dev-main` to install the TrustedLogin Client SDK
1. Run `composer require scssphp/scssphp --dev` to install `scssphp` as a dev dependency. This is used to generate and namespace the CSS used by TrustedLogin. If you already have `scssphp` installed, or are [using an alternative way to namespace the CSS](/Client/namespacing/css-namespacing), skip this step.

## Create or modify the PHP-Scoper Configuration

When using PHP-Scoper to prefix the TrustedLogin client, you will need to update the configuration to include additional files or classes that should not be prefixed.

To update the PHP-Scoper configuration, you create a `scoper.inc.php` file in the root of your project. This file should return an array with the configuration options for PHP-Scoper.

Here is an example of a PHP-Scoper configuration file that includes additional files and classes that should not be prefixed in TrustedLogin:

```php
<?php

declare( strict_types=1 );

use Isolated\Symfony\Component\Finder\Finder;

return [

	/*
	 * By default when running php-scoper add-prefix, it will prefix all relevant code found in the current working
	 * directory. You can however define which files should be scoped by defining a collection of Finders in the
	 * following configuration key.
	 *
	 * For more see: https://github.com/humbug/php-scoper#finders-and-paths
	 */
	'finders'                    => [
		Finder::create()->files()->in( 'vendor/trustedlogin/client' )->name( [
			'LICENSE',
			'composer.json'
		] ),
		Finder::create()->files()->in( 'vendor/trustedlogin/client/src' )->name( [
			'*.php',
			'*.css',
			'*.js',
		] ),
	],

	/*
	 * When scoping PHP files, there will be scenarios where some of the code being scoped indirectly references the
	 * original namespace. These will include, for example, strings or string manipulations. PHP-Scoper has limited
	 * support for prefixing such strings. To circumvent that, you can define patchers to manipulate the file to your
	 * heart contents.
	 *
	 * For more see: https://github.com/humbug/php-scoper#patchers
	 */
	'patchers' => [
		/**
		 * Replaces the Adapter prefixed versions with the original ones.
		 *
		 * @param string $filePath The path of the current file.
		 * @param string $prefix   The prefix to be used.
		 * @param string $content  The content of the specific file.
		 *
		 * @return string The modified content.
		 */
		function( $file_path, $prefix, $content ) {

            // This is a list of classes and functions that TrustedLogin uses that should not be prefixed.
			$trustedlogin_allowlist = [
				'DateTime',
				'Exception',
				'ImagickException',
				'RuntimeException',
				'WP_Admin_Bar',
				'WP_Debug_Data',
				'WP_Error',
				'WP_Filesystem_Base',
				'WP_Filesystem',
				'wp_get_environment_type',
				'WP_User',
			];

			foreach ( $trustedlogin_allowlist as $class ) {
				$content = str_replace( [
					$prefix . '\\' . $class, // Adapter-prefixed.
					$prefix . '\\\\' . $class // Catch double-escaped classes.
				], $class, $content );
			}

			return $content;
		},
	],
];
```

## 3. Run PHP-Scoper

After you have created or updated the PHP-Scoper configuration, you can run PHP-Scoper to prefix the TrustedLogin client. Run the following command:

:::info
### When you see `ProBlockBuilder`, make sure to replace with your own namespace! {#when-you-see-problockbuilder-make-sure-to-replace-with-your-own-namespace}
In the examples below, we're going to pretend your plugin or theme is named "Pro Block Builder" and your business is named Widgets, Co. These should not be the names you use—make sure to update the sample code below to match your business and plugin/theme name!
:::

### Using the PHP-Scoper Phar

```bash
php php-scoper.phar add-prefix --prefix=ProBlockBuilder
```

### Using the PHP-Scoper Composer Package

```bash
composer php-scoper add-prefix --prefix=ProBlockBuilder
```

### Using phive-installed PHP-Scoper

```bash
tools/php-scoper add-prefix --prefix="ProBlockBuilder"
```

PHP-Scoper will prefix the TrustedLogin client files and generate a `build/` directory.

## 4. Update the Composer Autoloader

After PHP-Scoper has prefixed the TrustedLogin client files, you will need to update the Composer autoloader to include the new `build/` directory. To do this, add the following to your `composer.json` file:

```json
"autoload": {
    "classmap": [
        "vendor",
        "build"
    ]
}
```

After updating the Composer autoloader, run `composer dump-autoload` to update the autoloader.

### 5. Include the autoloader

When using Composer, you likely already have added an autoloader to your code, using something like `require_once 'vendor/autoload.php';`.

If your PHP-Scoper build isn't picked up by the autoloader, you may need to include the autoloader in your code.

```php
// For a plugin or theme:
include_once trailingslashit( dirname( __FILE__ ) ) . 'build/autoload.php';
```

## 6. Add a Composer Script

You can also add a Composer script to run PHP-Scoper automatically when you run `composer install` or `composer update`. To do this, add the following to your `composer.json` file:

```json
"scripts": {
    "php-scoper": [
        "@php php-scoper.phar add-prefix --prefix=ProBlockBuilder",
        "composer dump-autoload --working-dir build --classmap-authoritative"
    ],
    "post-install-cmd": [
        "@php-scoper"
    ],
    "post-update-cmd": [
        "@php-scoper"
    ]
}
```

That will run PHP-Scoper and update the autoloader after you run `composer install` or `composer update`. Read more [on the PHP-Scoper documentation](https://github.com/humbug/php-scoper/tree/main?tab=readme-ov-file#step-2-run-php-scoper).

### 6. Follow [these directions to configure and instantiate the client](../configuration)
