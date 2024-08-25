---
title: Namespacing with Strauss
sidebar: auto
sidebar_label: Strauss
sidebar_position: 1
---

## Using Strauss

Strauss is used for namespacing the Client to prevent conflicts with other plugins or themes that are using TrustedLogin. We recommend installing via the `strauss.phar` method.

### 1. Install Strauss

[Install Strauss](https://github.com/BrianHenryIE/strauss#use). Strauss is used for namespacing the Client to prevent conflicts with other plugins or themes that are using TrustedLogin. We recommend installing via the `strauss.phar` method.
    1. `cd` into your plugin or theme directory
    1. Run `curl -o strauss.phar -L -C - https://github.com/BrianHenryIE/strauss/releases/latest/download/strauss.phar`

## Using PHP-Scoper

If you prefer to use PHP-Scoper, you can follow the instructions [on the PHP-Scoper page](/Client/php-scoper.md).

### 2. Install the TrustedLogin Client SDK

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
      "namespace_prefix": "ProBlockBuilder\\",
      "classmap_prefix": "ProBlockBuilder_",
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
      "@php vendor/bin/build-sass --namespace=ProBlockBuilder"
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

## 3. Run `composer update` 

Run `composer update` to update your dependencies. Strauss should generate a `vendor-namespaced/` directory. If it doesn't, you may need to run `composer install` first.

### 4. Include the autoloader 

When using Composer, you likely already have added an autoloader to your code using something like `require_once 'vendor/autoload.php';`. If not, do so: 
    
```php
require_once 'vendor/autoload.php';
```

If you set `classmap_output` to `false` in the Strauss configuration, you will need to include the autoloader in your code. If using the sample configuration above, the autoloader would be located at `vendor-namepaced/autoload.php` and the code would be:

```php
// For a plugin or theme:
include_once trailingslashit( dirname( __FILE__ ) ) . 'vendor-namespaced/autoload.php';
```
### 5. Follow [these directions to configure and instantiate the client](../configuration)
