---
title: CSS Namespacing
sidebar: auto
---
# Namespacing the CSS files

TrustedLogin CSS files are namespaced so that they don't conflict with other plugins or themes that are using TrustedLogin. To namespace the files, you can use the `build-sass` script included with the TrustedLogin client inside the `bin/` directory. 

The `build-sass` script accepts the following arguments:

- `--namespace`: The namespace to use for the CSS files. This is required.
- `--path`: The path to the TrustedLogin client directory. This is optional, and defaults to `vendor/trustedlogin/client/src/assets/`.
- `--export_dir`: The path to the output directory. This is optional, and defaults to `vendor/trustedlogin/client/src/assets/`.
- `--relative_images_dir`: The path to the images directory, relative to the output directory. This is optional, and defaults to `./`.

The default way to namespace files is [as a Composer script](/Client/01-intro.md), but this may not work with your build process: the default implementation shown adds the required SCSS package (`scssphp/scssphp`) to the `require-dev` array, which may not work with your release flow. If you move `scssphp/scssphp` to the `require` array, the scssphp library will be included in your autoloader, which adds bloat for something that should be used one-time.

So here are alternate ways to namespace the CSS files:

## Manually namespacing the CSS files

If you'd like to manually namespace the CSS files (for instance, in a GitHub Actions workflow), first `cd` into your plugin or theme directory. Then use the following command (update it to match your namespace and path to TrustedLogin client directory):

```bash
php vendor-namesaced/trustedlogin/client/bin/build-sass --namespace=️⚠ProBlockBuilder
```

This will generate the namespaced CSS files in the `vendor-namespaced/trustedlogin/client/src/assets/` directory. You can then copy the files to your plugin or theme directory.

If this fails with a message `command not found: php`, then PHP isn't installed on your machine. [Install PHP](https://www.php.net/manual/en/install.php) and try again.

## Namespacing via an SCSS mixin

If you'd like to use an SCSS mixin to namespace CSS files, you can use the following code:

```scss
@import "vendor-namesaced/trustedlogin/client/src/assets/src/variables"; // Variables used in the mixins (all !default)
@import "vendor-namesaced/trustedlogin/client/src/assets/src/auth"; // Mixins for authentication screen
@import "vendor-namesaced/trustedlogin/client/src/assets/src/buttons"; // Mixins for buttons
@import "vendor-namesaced/trustedlogin/client/src/assets/src/global";

$namespace: "⚠ProBlockBuilder";
$path: "example/different/assets/path/"; // Path to assets directory (for loading and lock images)

@include trustedlogin-auth( $namespace );
@include trustedlogin-button( $namespace );
```
