---
title: Troubleshooting
---

## Redirects happen from the Connector plugin, but logins aren't happening.

This can be caused by Client SDK initialization that is either too late, or initialization that doesn't occur on the front-end. (such as `admin_init`).

- Check to make sure your initialization hook is early enough in the process. `init` is a good default. The `template_redirect` hook is the last possible hook you can use. [Here is an ordered list of WordPress hooks](https://developer.wordpress.org/apis/hooks/action-reference/).
- Make sure your initialization hook is also running on the front-end. If you are using `admin_init`, it will not run on the front-end. Use `init` instead.

### Testing on staging/development servers {#testing-staging}

:::note Development/Testing Only
This section is only relevant if you're testing TrustedLogin on a staging or development server. Production use cases don't require this configuration.
:::

If you see "Cannot reach [domain]" errors when testing TrustedLogin on a staging server that uses a production domain name, you may need to configure your hosts file.

**Quick fix:**

Edit your hosts file on the machine running the Connector plugin (the support person's computer):

**Mac/Linux:** `sudo nano /etc/hosts`
**Windows:** `C:\Windows\System32\drivers\etc\hosts`

Add:
```
192.168.1.100 example.com www.example.com
```

Replace `192.168.1.100` with your staging server IP and `example.com` with the actual domain.

**Why:** When staging uses a production domain name but runs on a different IP address than DNS points to, your browser needs to be told where to connect. The hosts file overrides DNS on your local machine only.

**Important:**
- Include both www and non-www (DNS treats them as different hosts)
- Remove this entry when done testing to access production normally
- Each team member needs their own hosts file entry

### Nginx: Login requests fail with 301 redirect

If you're using Nginx and login attempts fail silently, the issue may be a trailing slash redirect. Nginx (or WordPress) may be 301-redirecting requests to your TrustedLogin endpoint to add a trailing slash.

The problem: 301 redirects convert POST requests to GET requests, which loses the authentication data needed for login.

**How to diagnose:** Check your server logs or browser network tab for a 301 redirect on the login request URL. The URL will be redirected from a path without a trailing slash to one with a trailing slash.

**The fix:** Add a 307 redirect rule to your Nginx configuration for the path being redirected. Unlike 301, a 307 redirect preserves the original HTTP method (POST stays POST).

```nginx
# Replace "/your-path" with the actual path being 301-redirected
# This could be a subdirectory where WordPress is installed,
# or the TrustedLogin endpoint path itself
location = /your-path {
    return 307 /your-path/;
}
```

After adding this rule, reload Nginx:

```bash
sudo nginx -t && sudo nginx -s reload
```

### Check the TrustedLogin SDK log

- Enable [logging in the configuration array](/Client/configuration) by setting `logging/enabled` to `true` and `logging/threshold` to `debug`.
- Attempt a login.
- Check the log file (the default location of the log is located at `wp-content/uploads/trustedlogin-logs/trustedlogin-client-debug-{date}-{hash}-.log`)

If there are no new log items, then the Client SDK is not being initialized, likely due to the initialization hook not being early enough in the process or not running on the front-end.

## Troubleshooting the Grant Support Access screen

First things first: make sure you have the [latest version of TrustedLogin](https://github.com/trustedlogin/client/releases) installed.

Make sure you are logged in as an administrator and then add `&debug=true` to the end of the URL. That will activate Debug Mode, which shows more information about what's happening behind the scenes.

### Verify the Vendor public encryption key

If access keys are generated, but the keys aren't working to log into a site, it may be a mismatched Vendor public encryption key. This is the key that TrustedLogin uses to encrypt the data sent to the Vendor. If this key is incorrect, the Vendor won't be able to decrypt the data and the Grant Support Access screen won't work.

1. With the debug information showing, click the "Verify Public Key" link.
2. This will open a new tab with the public key displayed in a JSON response:  
   ```json
   {
    "publicKey": "a12bcd34e56db687a153b0a1aee26b196a75zba064ac62d8d41440455a8fb40f"
   }
    ```
3. Check that the `publicKey` value matches the public key displayed in the debug information.

**What to do if the public key doesn't match:** wait 10 minutes and try again. The Vendor public key is cached for a maximum of 10 minutes. If you check it again after 10 minutes, and it still doesn't match, contact TrustedLogin support.

### If the CSS isn't loading on the Grant Support Access page {#if-the-css-isnt-loading-on-the-grant-support-access-page}

If you have [modified the CSS namespacing](/Client/namespacing/css-namespacing), that is the likley culprit.

Otherwise, this is likely an issue with the `build-sass` script not being passed the same `namespace` flag as the Client is using.

Make sure the `--namespace=` setting in the Composer file:

```javascript
  "trustedlogin": [ 
    // highlight-next-line
    "@php vendor/bin/build-sass --namespace=example-namespace"
  ],
```

Matches the `vendor/namespace` setting in the Config settings array:

```php
$config = [
    // ...
	'vendor' => [
	    // highlight-next-line
		'namespace' => 'example-namespace',
    // ...
];
```

If those are not the same, the CSS rules will not match the HTML generated and won't be applied.

## Security plugins blocking webhook requests {#security-plugins-blocking-webhooks}

Some security plugins like Wordfence may block TrustedLogin webhook POST requests, flagging them as potential XSS attacks. This happens because the form-encoded POST body can trigger false positives in firewall rules.

### Symptoms

- Webhooks aren't being received by your endpoint
- Wordfence logs show "XSS: Cross Site Scripting in POST body" blocks
- The webhook URL is correct but no data arrives

### Solution: Use JSON format

Set the `webhook/format` configuration option to `'json'`. This sends the webhook data as JSON with a proper `Content-Type: application/json` header, which is less likely to trigger security plugin false positives.

```php
$config = [
    // ...
    'webhook' => [
        'url'    => 'https://hooks.example.com/webhook/',
        'format' => 'json', // Use JSON format to avoid security plugin blocks
    ],
];
```

Alternatively, use the filter:

```php
add_filter( 'trustedlogin/your-namespace/webhook/request_args', function( $args, $webhook_url, $data, $format ) {
    $args['body'] = wp_json_encode( $data );
    $args['headers']['Content-Type'] = 'application/json';
    return $args;
}, 10, 4 );
```

:::note
If your webhook endpoint is already configured to receive form-encoded data, you may need to update it to parse JSON instead when switching formats.
:::

## Composer-related issues with the namespacing setup

### Strauss isn't running — `vendor/bin/strauss` doesn't exist after `composer install`

This is usually a stale `composer.lock`. Composer replays the existing lockfile and silently ignores newly-added requirements. Two fixes:

- Delete `composer.lock` before running `composer install` so Composer re-resolves from scratch.
- Or run `composer update brianhenryie/strauss scssphp/scssphp trustedlogin/client` to re-resolve only the packages you added.

### `composer install` fails with "Your requirements could not be resolved" mentioning packages I didn't change

Composer 2.9+ enforces security advisories at install time. If your plugin pins old major versions of dev dependencies (commonly `phpunit/phpunit ^7.5` or `yoast/phpunit-polyfills 1.x`) with known advisories, `composer install` fails with an error naming those packages — even though they're unrelated to your TrustedLogin integration.

The error includes the advisory ID (e.g. `PKSA-z3gr-8qht-p93v`). Two fixes:

- **Bump the offending dev dep** (preferred — addresses the actual security issue).
- **Skip the specific advisory** in `composer.json`:

  ```json
  "config": {
      "audit": {
          "ignore": ["PKSA-z3gr-8qht-p93v"]
      }
  }
  ```

  Replace the advisory ID with whatever Composer reports.

### Strauss runs but produces no output (exit 0)

This is usually `config.classmap-authoritative: true` in your `composer.json`. Under classmap-authoritative, Composer ignores PSR-4 lookups, so Strauss can't resolve `Composer\Factory` and exits silently. Set:

```json
"config": {
    "classmap-authoritative": false
}
```

You can restore it after install if your release pipeline relies on it.

### `composer install` fatals on plugin code that references WordPress classes

Symptom: install fatals mid-Strauss-run with a confusing error like `Class WP_Widget not found`. This happens when your `composer.json` has `autoload.files` entries that reference WordPress-only classes — Composer eagerly loads `autoload.files` during install, *before* WordPress is loaded.

**Don't add the TrustedLogin bootstrap to `autoload.files`.** Require it from your plugin's main file instead (which already has an ABSPATH check).

If you have *other* `autoload.files` entries that reference WP classes, guard them:

```php
<?php
if ( ! defined( 'ABSPATH' ) ) {
    return;
}
// rest of file
```

Use `return;` (not `exit;`) — `exit` aborts the entire `composer install` process; `return;` just skips loading the one file.

For a deeper walkthrough of these and other host-side gotchas, see [Merging into an existing composer.json](/Client/namespacing/merging-into-existing-composer).

### If scripts aren't loading, check for a No-Conflict mode {#no-conflict-mode}

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
