# Integration recipe tests

End-to-end tests that validate the namespacing recipes documented in `docs/Client/namespacing/strauss.md` and `docs/Client/namespacing/php-scoper.md` against a Hello-Dolly-style sample plugin.

Each test:

1. Creates a temp directory.
2. Generates a minimal WordPress plugin with the documented integration applied.
3. Runs `composer install`.
4. Asserts the integration produces the expected artifacts and that the namespaced classes are reachable while the bare un-namespaced classes are not.
5. Cleans up.

If the docs change, run these tests to verify the documented recipe still produces a working integration.

## Requirements

- PHP ≥ 7.4 (Strauss `dev-master` requirement; runtime is unaffected — see [Merging into an existing composer.json](../docs/Client/namespacing/merging-into-existing-composer.md)).
- Composer 2.x.
- `git` (Composer requires a git identity for some operations).

The tests assume `php`, `composer`, and `git` are on `PATH`. Override via env vars if needed:

```bash
PHP_BIN=/path/to/php COMPOSER_BIN=/path/to/composer ./tests/integration-strauss.sh
```

## Running

```bash
./tests/integration-strauss.sh
./tests/integration-php-scoper.sh
```

Set `KEEP_TEMP=1` to keep the test working tree after the run for inspection:

```bash
KEEP_TEMP=1 ./tests/integration-strauss.sh
```

The path is printed at the end.

## What's tested

### Strauss test (`integration-strauss.sh`)

Validates the recipe in [`docs/Client/namespacing/strauss.md`](../docs/Client/namespacing/strauss.md):

- `composer install` exits 0 on a fresh install.
- `vendor-namespaced/trustedlogin/client/src/Client.php` exists with `namespace HelloTrustedLogin\TrustedLogin;`.
- `vendor/trustedlogin/` is deleted (per `delete_vendor_packages: true`).
- Generated CSS contains prefixed class selectors (`tl-hellotrustedlogin-*`).
- `php -l` clean on the bootstrap and the namespaced Client class.
- Smoke harness loading **only** `vendor-namespaced/autoload.php` resolves `\HelloTrustedLogin\TrustedLogin\Client` and confirms `\TrustedLogin\Client` is unreachable.

### PHP-Scoper test (`integration-php-scoper.sh`)

Validates the recipe in [`docs/Client/namespacing/php-scoper.md`](../docs/Client/namespacing/php-scoper.md):

- `composer install` exits 0 on a fresh install.
- `build/` contains the prefixed SDK with `namespace HelloTrustedLogin\TrustedLogin;`.
- `vendor/trustedlogin/` is deleted post-install (per the documented cleanup script).
- `php -l` clean on the bootstrap.
- Smoke harness loading `vendor/autoload.php` resolves the prefixed `\HelloTrustedLogin\TrustedLogin\Client` (via the host `autoload.classmap: ["build"]` entry) and confirms `\TrustedLogin\Client` is unreachable.

## When tests fail

The most common reasons for a test to fail are documented in [Troubleshooting](../docs/Client/troubleshooting.md) and [Merging into an existing composer.json](../docs/Client/namespacing/merging-into-existing-composer.md). If you've made the recipes work for your plugin and the test still fails, that's a doc bug — please report it.
