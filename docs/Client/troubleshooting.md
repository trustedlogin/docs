---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Redirects happen from the Connector plugin, but logins aren't happening.

This can be caused by Client SDK initialization that is either too late, or initialization that doesn't occur on the front-end. (such as `admin_init`).

- Check to make sure your initialization hook is early enough in the process. `init` is a good default. The `template_redirect` hook is the last possible hook you can use. [Here is an ordered list of WordPress hooks](https://developer.wordpress.org/apis/hooks/action-reference/).
- Make sure your initialization hook is also running on the front-end. If you are using `admin_init`, it will not run on the front-end. Use `init` instead.

### Check the TrustedLogin SDK log

- Enable [logging in the configuration array](/Client/configuration) by setting `logging/enabled` to `true` and `logging/threshold` to `debug`.
- Attempt a login.
- Check the log file (the default location of the log is located at `wp-content/uploads/trustedlogin-logs/trustedlogin-client-debug-{date}-{hash}-.log`)

If there are no new log items, then the Client SDK is not being initialized, likely due to the initialization hook not being early enough in the process or not running on the front-end.

## Troubleshooting the Grant Support Access screen

First things first: make sure you have the [latest version of TrustedLogin](/Client/updating.md) installed.

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

If you have [modified the CSS namespacing](/Client/css-namespacing.md), that is the likley culprit.

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
