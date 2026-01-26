---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Redirects happen from the Connector plugin, but logins aren't happening.

This can be caused by Client SDK initialization that is either too late, or initialization that doesn't occur on the front-end. (such as `admin_init`).

- Check to make sure your initialization hook is early enough in the process. `init` is a good default. The `template_redirect` hook is the last possible hook you can use. [Here is an ordered list of WordPress hooks](https://developer.wordpress.org/apis/hooks/action-reference/).
- Make sure your initialization hook is also running on the front-end. If you are using `admin_init`, it will not run on the front-end. Use `init` instead.

### Connector cannot reach Client site (staging/development environments) {#connector-cannot-reach-client}

If you're testing TrustedLogin on a staging or development server that uses a production domain name, you may need to configure your hosts file to override DNS resolution.

#### Why this happens

When the Connector plugin attempts to log into a Client site, it makes a POST request to the domain name stored in the Client's WordPress configuration (from `get_site_url()`). If you're testing on a server at a different IP address than what public DNS resolves to, the login will fail because your browser connects to the wrong server.

**Common scenarios:**
- Testing on staging server (e.g., `192.168.1.100`) while DNS points to production (e.g., `203.0.113.10`)
- Server migration testing before DNS cutover
- Local development environment (Local, DDEV, Docker) using production domain
- Accessing backup server at different IP than primary

#### How to diagnose

**Check the browser console** in the Connector plugin when attempting login. Recent versions of the Connector will show:

```
✗ Site connectivity test failed for: www.example.com
```

This indicates your machine cannot reach the Client site at the domain WordPress is configured to use.

**Verify DNS resolution:**

```bash
# Check where DNS currently points
nslookup www.example.com

# Compare with your staging/dev server IP
# If they don't match, you need hosts file override
```

#### The www vs non-www distinction

**Critical:** DNS treats `www.example.com` and `example.com` as completely different hostnames. Your hosts file entry must match the **exact** domain that WordPress is configured to use.

```bash
# Check WordPress site URL
wp option get siteurl
# Example output: https://www.example.com
```

If WordPress returns `https://www.example.com` (with www), your hosts file must include the www. If it returns `https://example.com` (without www), your hosts file must match that exactly.

#### The fix

**Add the Client site domain to your hosts file on the machine running the Connector plugin** (your support machine):

**Mac/Linux:**
```bash
sudo nano /etc/hosts
```

**Windows:**
```
C:\Windows\System32\drivers\etc\hosts
```

**Add this line (adjust IP and domain):**
```
192.168.1.100 example.com www.example.com
```

:::tip Best Practice
Include **both** www and non-www variants to ensure it works regardless of WordPress configuration:
```
192.168.1.100 example.com www.example.com
```
:::

**Replace:**
- `192.168.1.100` with your staging/dev server's actual IP address
- `example.com` with the Client site's domain

#### Example scenario

**Production setup:**
- Domain: `www.example.com`
- Production IP: `203.0.113.10` (what DNS returns)
- WordPress configured as: `https://www.example.com`

**Staging/testing setup:**
- Same domain: `www.example.com`
- Staging IP: `192.168.1.100` (different server)
- WordPress still configured as: `https://www.example.com`

**Without hosts file:**
1. Connector gets access key from Client on staging
2. Access key contains: `https://www.example.com`
3. Connector POSTs to `www.example.com`
4. DNS resolves to `203.0.113.10` (production)
5. POST goes to production server ❌
6. Login fails (wrong server)

**With hosts file on support machine:**
```
192.168.1.100 example.com www.example.com
```

1. Connector gets access key from Client on staging
2. Access key contains: `https://www.example.com`
3. Connector POSTs to `www.example.com`
4. **Hosts file overrides DNS** → resolves to `192.168.1.100` (staging)
5. POST goes to staging server ✓
6. Login succeeds

#### Verifying your configuration

After adding the hosts file entry:

```bash
# Test resolution (should show your staging IP)
ping www.example.com

# Test HTTP connection (should connect to your staging server)
curl -I https://www.example.com

# Check TLS certificate (should match your staging server)
openssl s_client -connect www.example.com:443 -servername www.example.com
```

#### Important notes

- **Hosts file only affects YOUR machine**, not the servers
- Other team members need their own hosts file entries to test
- Remove the entry when done testing or it will prevent accessing production
- Recent Connector versions automatically detect this issue and provide specific guidance in error messages

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
