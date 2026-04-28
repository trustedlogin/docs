#!/usr/bin/env bash
# Integration test for the Strauss recipe documented at docs/Client/namespacing/strauss.md.
# Generates a Hello-Dolly-style sample plugin, applies the documented recipe, runs composer install,
# and verifies the namespaced SDK is reachable while the bare un-namespaced classes are not.

set -euo pipefail

readonly TEST_DIR="$(mktemp -d -t tl-strauss-XXXXXX 2>/dev/null || mktemp -d "${TMPDIR:-/tmp}/tl-strauss-XXXXXX")"
readonly PHP_BIN="${PHP_BIN:-php}"
readonly COMPOSER_BIN="${COMPOSER_BIN:-composer}"

cleanup() {
    if [ "${KEEP_TEMP:-0}" = "1" ]; then
        echo ""
        echo "Test working tree kept at: $TEST_DIR"
    else
        rm -rf "$TEST_DIR"
    fi
}
trap cleanup EXIT

require_cmd() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "ERROR: $1 not found on PATH. Override via env var if it lives elsewhere." >&2
        exit 2
    fi
}
require_cmd "$PHP_BIN"
require_cmd "$COMPOSER_BIN"
require_cmd git

cd "$TEST_DIR"
git init -q . 2>/dev/null || true
git config user.email "test@example.com"
git config user.name "Integration Test"

echo "=== Strauss integration test ==="
echo "Working dir: $TEST_DIR"
echo ""

# ---------------------------------------------------------------------------
# Sample plugin: Hello-Dolly-style single-purpose plugin with TL bootstrap.
# ---------------------------------------------------------------------------

cat > hello-trustedlogin.php <<'PHP'
<?php
/**
 * Plugin Name: Hello TrustedLogin (Strauss test)
 * Plugin URI:  https://example.com/
 * Description: Minimal plugin that exercises the TrustedLogin Strauss integration recipe.
 * Version:     1.0.0
 * Author:      Integration Test
 * License:     GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'HELLO_TRUSTEDLOGIN_FILE', __FILE__ );

require_once __DIR__ . '/inc/trustedlogin-bootstrap.php';
PHP

mkdir -p inc
cat > inc/trustedlogin-bootstrap.php <<'PHP'
<?php
if ( ! defined( 'ABSPATH' ) ) {
    return;
}

require_once __DIR__ . '/../vendor-namespaced/autoload.php';

add_action( 'plugins_loaded', function () {
    $config = [
        'auth' => [
            'api_key' => '1234567890',
        ],
        'vendor' => [
            'namespace'   => 'hello-trustedlogin',
            'title'       => 'Hello TrustedLogin',
            'email'       => 'support+{hash}@example.com',
            'website'     => 'https://example.com/',
            'support_url' => 'https://example.com/support/',
        ],
        'role'       => 'editor',
        'clone_role' => true,
    ];

    try {
        new \HelloTrustedLogin\TrustedLogin\Client(
            new \HelloTrustedLogin\TrustedLogin\Config( $config )
        );
    } catch ( \Exception $e ) {
        error_log( 'TrustedLogin init failed: ' . $e->getMessage() );
    }
} );
PHP

# ---------------------------------------------------------------------------
# composer.json — verbatim from docs/Client/namespacing/strauss.md.
# ---------------------------------------------------------------------------

cat > composer.json <<'JSON'
{
  "name": "test/hello-trustedlogin-strauss",
  "description": "Strauss integration test fixture",
  "type": "wordpress-plugin",
  "license": "GPL-2.0-or-later",
  "minimum-stability": "dev",
  "prefer-stable": true,
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
      "namespace_prefix": "HelloTrustedLogin\\",
      "classmap_prefix": "HelloTrustedLogin_",
      "classmap_output": true,
      "delete_vendor_packages": true,
      "packages": ["trustedlogin/client"]
    }
  },
  "scripts": {
    "strauss": ["@php vendor/bin/strauss"],
    "trustedlogin": [
      "@php vendor-namespaced/trustedlogin/client/bin/build-sass --namespace=HelloTrustedLogin"
    ],
    "post-install-cmd": ["@strauss", "@trustedlogin"],
    "post-update-cmd":  ["@strauss", "@trustedlogin"]
  }
}
JSON

# ---------------------------------------------------------------------------
# Run composer install.
# ---------------------------------------------------------------------------

echo "--- composer install ---"
if ! "$COMPOSER_BIN" install --no-interaction; then
    echo ""
    echo "FAIL: composer install exited non-zero." >&2
    exit 1
fi
echo ""

# ---------------------------------------------------------------------------
# Assertions.
# ---------------------------------------------------------------------------

PASS=0
FAIL=0
assert() {
    local desc="$1"
    local cond="$2"
    if eval "$cond"; then
        printf "  \033[32mPASS\033[0m  %s\n" "$desc"
        PASS=$((PASS + 1))
    else
        printf "  \033[31mFAIL\033[0m  %s\n" "$desc"
        FAIL=$((FAIL + 1))
    fi
}

echo "--- assertions ---"

assert "vendor-namespaced/trustedlogin/client/src/Client.php exists" \
    "[ -f vendor-namespaced/trustedlogin/client/src/Client.php ]"

assert "namespace declaration is HelloTrustedLogin\\TrustedLogin" \
    "grep -q 'namespace HelloTrustedLogin\\\\TrustedLogin;' vendor-namespaced/trustedlogin/client/src/Client.php"

assert "vendor/trustedlogin/ does not exist (delete_vendor_packages)" \
    "[ ! -d vendor/trustedlogin ]"

CSS_FILE=vendor-namespaced/trustedlogin/client/src/assets/trustedlogin.css

assert "compiled CSS file exists" \
    "[ -f \"$CSS_FILE\" ]"

assert "compiled CSS is non-trivially sized (>= 5KB)" \
    "[ \$(wc -c < \"$CSS_FILE\") -ge 5120 ]"

assert "CSS has many prefixed selectors (>= 100 occurrences of tl-hellotrustedlogin-)" \
    "[ \$(grep -o 'tl-hellotrustedlogin-' \"$CSS_FILE\" 2>/dev/null | wc -l | tr -d ' ') -ge 100 ]"

assert "CSS contains .tl-hellotrustedlogin-auth (auth screen wrapper)" \
    "grep -qE '\\.tl-hellotrustedlogin-auth([^a-z0-9_-]|$)' \"$CSS_FILE\""

assert "CSS contains .tl-hellotrustedlogin-grant-access (CTA button)" \
    "grep -q 'tl-hellotrustedlogin-grant-access' \"$CSS_FILE\""

assert "CSS contains .button-trustedlogin-hellotrustedlogin (button class)" \
    "grep -q 'button-trustedlogin-hellotrustedlogin' \"$CSS_FILE\""

assert "CSS does NOT contain default un-prefixed tl-test- selectors" \
    "! grep -qE 'tl-test-' \"$CSS_FILE\""

assert "CSS does NOT contain default un-prefixed tl-auth selector" \
    "! grep -qE '\\.tl-auth([^a-z0-9_-]|$)' \"$CSS_FILE\""

assert "php -l clean on bootstrap" \
    "$PHP_BIN -l inc/trustedlogin-bootstrap.php > /dev/null 2>&1"

assert "php -l clean on namespaced Client.php" \
    "$PHP_BIN -l vendor-namespaced/trustedlogin/client/src/Client.php > /dev/null 2>&1"

# Smoke harness: load only vendor-namespaced/autoload.php; verify namespaced
# class resolves and bare class is unreachable. Does not load WordPress; we
# only verify class declaration and autoload lookup, not instantiation.

cat > _smoke.php <<'PHP'
<?php
// SDK source files have an `if ( ! defined( 'ABSPATH' ) ) { exit; }` guard at the top
// (standard WP plugin practice). Define it before triggering autoload so file
// loading proceeds — we're verifying class wiring, not running WP.
define( 'ABSPATH', __DIR__ . '/' );

require __DIR__ . '/vendor-namespaced/autoload.php';

$ns_exists   = class_exists( '\\HelloTrustedLogin\\TrustedLogin\\Client', true );
$bare_exists = class_exists( '\\TrustedLogin\\Client', true );

if ( $ns_exists && ! $bare_exists ) {
    echo "SMOKE_PASS\n";
    exit( 0 );
}
echo "SMOKE_FAIL ns_exists=" . ( $ns_exists ? '1' : '0' ) . " bare_exists=" . ( $bare_exists ? '1' : '0' ) . "\n";
exit( 1 );
PHP

assert "smoke: namespaced Client autoloads, bare class unreachable" \
    "$PHP_BIN _smoke.php 2>/dev/null | grep -q SMOKE_PASS"

echo ""
echo "=========================================="
printf "  PASS: %d / FAIL: %d\n" "$PASS" "$FAIL"
echo "=========================================="

if [ "$FAIL" -gt 0 ]; then
    exit 1
fi
exit 0
