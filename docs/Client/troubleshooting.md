---
title: Troubleshooting
sidebar_label: Troubleshooting
---

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
