---
sidebar_label: Troubleshooting
---

### If the CSS isn't loading on the Grant Support Access page {#if-the-css-isnt-loading-on-the-grant-support-access-page}

If you have [modified the CSS namespacing](/Client/css-namespacing.md), that is the likley culprit.

Otherwise, this is likely an issue with the `build-sass` script not being passed the same `namespace` flag as the Client is using.

Make sure the `--namespace=` setting in the Composer file:

```json
"trustedlogin": [
  "@php vendor/bin/build-sass --namespace=example-namespace"
],
```

Matches the `vendor/namespace` setting in the Config settings array:

```php
$config = [
    // ...
	'vendor' => [
		'namespace' => 'example-namespace',
    // ...
];
```

If those are not the same, the CSS rules will not match the HTML generated and won't be applied.
