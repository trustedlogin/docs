#!/usr/bin/env bash
# Integration test for the PHP-Scoper recipe documented at docs/Client/namespacing/php-scoper.md.
# Generates a Hello-Dolly-style sample plugin, applies the documented recipe, runs composer install,
# and verifies the namespaced SDK is reachable while the bare un-namespaced classes are not.

set -euo pipefail

readonly TEST_DIR="$(mktemp -d -t tl-php-scoper-XXXXXX 2>/dev/null || mktemp -d "${TMPDIR:-/tmp}/tl-php-scoper-XXXXXX")"
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

echo "=== PHP-Scoper integration test ==="
echo "Working dir: $TEST_DIR"
echo ""

# ---------------------------------------------------------------------------
# Sample plugin.
# ---------------------------------------------------------------------------

cat > hello-trustedlogin.php <<'PHP'
<?php
/**
 * Plugin Name: Hello TrustedLogin (PHP-Scoper test)
 * Plugin URI:  https://example.com/
 * Description: Minimal plugin that exercises the TrustedLogin PHP-Scoper integration recipe.
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

// PHP-Scoper recipe: load vendor/autoload.php (the host's autoload.classmap
// points at build/, so the prefixed classes resolve through Composer's
// classmap autoloader after `composer dump-autoload --classmap-authoritative`).
require_once __DIR__ . '/../vendor/autoload.php';

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
# scoper.inc.php — verbatim from docs/Client/namespacing/php-scoper.md.
# ---------------------------------------------------------------------------

cat > scoper.inc.php <<'PHP'
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
PHP

# ---------------------------------------------------------------------------
# composer.json — verbatim from docs/Client/namespacing/php-scoper.md.
# ---------------------------------------------------------------------------

cat > composer.json <<'JSON'
{
  "name": "test/hello-trustedlogin-php-scoper",
  "description": "PHP-Scoper integration test fixture",
  "type": "wordpress-plugin",
  "license": "GPL-2.0-or-later",
  "minimum-stability": "dev",
  "prefer-stable": true,
  "require": {
    "trustedlogin/client": "dev-main"
  },
  "require-dev": {
    "humbug/php-scoper": "^0.18 || ^0.19 || ^0.20 || ^0.21 || ^0.22 || ^0.23 || ^0.24 || ^0.25 || ^0.26 || ^0.27 || ^0.28 || ^0.29 || ^0.30 || ^1.0",
    "scssphp/scssphp": "^1.11.0"
  },
  "config": {
    "allow-plugins": {
      "composer/installers": true
    },
    "classmap-authoritative": true
  },
  "autoload": {
    "classmap": ["build"]
  },
  "scripts": {
    "tl-php-scoper": [
      "vendor/bin/php-scoper add-prefix --prefix=HelloTrustedLogin --force --quiet",
      "rm -rf vendor/trustedlogin",
      "@composer dump-autoload --classmap-authoritative"
    ],
    "post-install-cmd": [ "@tl-php-scoper" ],
    "post-update-cmd":  [ "@tl-php-scoper" ]
  }
}
JSON

# ---------------------------------------------------------------------------
# Run composer install.
# ---------------------------------------------------------------------------

# PHP-Scoper writes to build/ in post-install-cmd. Composer's autoload generation
# runs BEFORE post-install-cmd and tries to scan autoload.classmap entries —
# create build/ as empty so the initial scan finds zero classes (the post-install
# script will populate it and re-dump the autoload).
mkdir -p build

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

assert "build/ directory exists" \
    "[ -d build ]"

# PHP-Scoper outputs Client.php to build/src/Client.php (it strips the
# vendor/trustedlogin/client prefix because the finder's `in()` was that path).
client_under_build="build/src/Client.php"
assert "build contains a prefixed Client.php" \
    "[ -f \"$client_under_build\" ]"

assert "Client.php declares namespace HelloTrustedLogin\\TrustedLogin" \
    "grep -q 'namespace HelloTrustedLogin\\\\TrustedLogin;' \"$client_under_build\""

assert "vendor/trustedlogin/ does not exist (post-install rm)" \
    "[ ! -d vendor/trustedlogin ]"

assert "php -l clean on bootstrap" \
    "$PHP_BIN -l inc/trustedlogin-bootstrap.php > /dev/null 2>&1"

assert "php -l clean on prefixed Client.php" \
    "$PHP_BIN -l \"$client_under_build\" > /dev/null 2>&1"

# Smoke harness: load vendor/autoload.php; verify prefixed class is reachable
# (via host classmap pointing at build/), bare class is unreachable.
cat > _smoke.php <<'PHP'
<?php
// SDK source files have an `if ( ! defined( 'ABSPATH' ) ) { exit; }` guard at the top
// (standard WP plugin practice). Define it before triggering autoload so file
// loading proceeds — we're verifying class wiring, not running WP.
define( 'ABSPATH', __DIR__ . '/' );

require __DIR__ . '/vendor/autoload.php';

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
