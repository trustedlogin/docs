---
title: Client SDK Intro
sidebar: auto
sidebar_position: 1
---

# TrustedLogin SDK
Easily and securely log in to your customers sites when providing support.

## Our priority: Be secure and  [don't crash sites](https://www.bugsnag.com/blog/sdks-should-not-crash-apps) {#our-priority-sdks-should-not-crash-sites}

When you integrate TrustedLogin into your project (theme, plugin, or custom code), you are counting on us not to mess up your customer or clients' sites. We take that extremely seriously.

-------

## Including in your plugin or theme {#including-in-your-plugin-or-theme}

:::info
### When you see ⚠️, make sure to replace with your own namespace!
In the examples below, we're going to pretend your plugin or theme is named "Pro Block Builder" and your business is named Widgets, Co. These should not be the names you use—make sure to update the sample code below to match your business and plugin/theme name!
:::

### Install Strauss & update your composer.json file

1. [Install Strauss](https://github.com/BrianHenryIE/strauss#use). Strauss is used for namespacing the Client to prevent conflicts with other plugins or themes that are using TrustedLogin. We recommend installing via the `strauss.phar` method.
   1. `cd` into your plugin or theme directory
   1. Run `curl -o strauss.phar -L -C - https://github.com/BrianHenryIE/strauss/releases/latest/download/strauss.phar`
1. Run `composer require trustedlogin/client:dev-main` to install the TrustedLogin Client SDK
1. Run `composer require scssphp/scssphp --dev` to install `scssphp` as a dev dependency. This is used to generate and namespace the CSS used by TrustedLogin. If you already have `scssphp` installed, or are [using an alternative way to namespace the CSS](/Client/css-namespacing.md), skip this step.
1. Update your `composer.json` file to integrate with Strauss. Follow the instructions as detailed in the [Strauss documentation](https://github.com/BrianHenryIE/strauss#configuration) for namespacing your plugin and theme. See example below. 

```json
[...]
  "require": {
    "trustedlogin/client": "dev-main"
  },
  "require-dev": {
    "brianhenryie/strauss": "dev-master",
    "scssphp/scssphp": "^v1.11.0"
  },
  "autoload": {
    "classmap": [
      "vendor"
    ]
  },
  "extra": {
    "strauss": {
      "target_directory": "vendor-namespaced",
      "namespace_prefix": "⚠ProBlockBuilder\\",
      "classmap_prefix": "⚠PBB_",
      "classmap_output": true,
      "packages": [
        "trustedlogin/client"
      ]
    }
  },
  "scripts": {
    "strauss": [
      "@php strauss.phar"
    ],
    "trustedlogin": [
      "@php vendor/bin/build-sass --namespace=️⚠ProBlockBuilder"
    ],
    "post-install-cmd": [
      "@strauss",
      "@trustedlogin"
    ],
    "post-update-cmd": [
      "@strauss",
      "@trustedlogin"
    ]
  }
[...]
```
4. Run `composer update` to update your dependencies. Strauss should generate a `vendor-namespaced/` directory. If it doesn't, you may need to run `composer install` first.
5. Follow [these directions to configure and instantiate the client](./configuration)

#### To manually include the autoloader

If you chose to set `classmap_output` to `false` in the Strauss configuration, you will need to include the autoloader in your code. If using the sample above, it would be located at `vendor-namepaced/autoload.php`; the code would be something like:

```php
// For a plugin or theme:
include_once trailingslashit( dirname( __FILE__ ) ) . 'vendor-namespaced/autoload.php';
```

#### Vendor directory cleanup

If you find the TrustedLogin directories in your `vendor/` directory to be undesirable for some reason, you may use this configuration for the `trustedlogin` script in Composer. 

Replace this:

```json
"trustedlogin": [
  "@php vendor/bin/build-sass --namespace=️⚠ProBlockBuilder"
 ],
```

With this:

```json
"trustedlogin": [
  "@php vendor/bin/build-sass --namespace=️⚠ProBlockBuilder",
   "[ -d 'vendor/trustedlogin' ] && rm -rf vendor/trustedlogin || true",
   "[ -d 'vendor/scssphp' ] && rm -rf vendor/scssphp || true",
   "[ -d 'vendor/bin' ] && rm -rf vendor/bin/build-sass && rm -rf vendor/bin/pscss || true"
 ],
```

The script modification will now remove the `trustedlogin`, `scssphp`, and TrustedLogin-related files inside `bin`.

### No-Conflict mode {#no-conflict-mode}

Some plugins like Gravity Forms and GravityView have a "no-conflict mode" to limit script and style conflicts. If you see
scripts and styles not loading on your Grant Support Access page, that's what's going on.

The WordPress script and style handles registered by TrustedLogin are formatted as `trustedlogin-{namespace}`.
Here's an example of how GravityView (with a namespace of `gravityview`) allows TrustedLogin scripts:

```php
add_filter( 'gravityview_noconflict_scripts', function ( $allowed_scripts = array() ) {

	$allowed_scripts[] = 'trustedlogin-gravityview'; // ⚠️ GravityView's namespace is `gravityview`

	return $allowed_scripts;
} );
```

### Testing on local environments {#testing-on-local-environments}

TrustedLogin won't work in local environments unless using a tunnel such as ngrok. Thus, TrustedLogin will display a warning when attempting to generate a login when in a local environment.

To disable the warning, define `TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE` and set it to true:

```php
define( 'TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE', true );
```

## Reference IDs {#reference-ids}

Reference IDs are useful when you want to attach a specific ticket ID or conversation ID to a login.

Reference IDs can be passed via URL like so: `wp-login.php?action=trustedlogin&ns={namespace}&ref=[123]`

When a Reference ID exists, users will see the reference while granting access:

![Reference ID is shown below the footer links in the Grant Access screen](/img/client/reference-id.png)

## Logging {#logging}

We recommend disabling logging by default, but sometimes logs are necessary.

1. TrustedLogin creates a `trustedlogin-logs` directory inside the `wp-content/uploads/` directory.
2. An empty `index.html` file is placed inside the directory to prevent browsing.
3. New log files are created daily for each TrustedLogin namespace. The default log `filename` format is `client-{namespace}-{Y-m-d}-{hash}.log`
   - `{namespace}` is the namespace of your business, plugin, or theme name
   - `{date}` is `YYYY-MM-DD` format
   - The hash is generated using `wp_hash()` using on the `vendor/namespace`, site `home_url()`, and the day of the year (`date('z')`). The point of the hash is to make log names harder to guess (security by obscurity).

### Using your own logging library {#using-your-own-logging-library}

If you add an action for `trustedlogin/{namespace}/logging/log`, TrustedLogin will let you handle logging. The `trustedlogin-logs` directory and log files will not be created.
