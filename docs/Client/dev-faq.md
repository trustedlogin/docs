# Developer FAQ

## How do I render the authorization screen? {#how-do-i-render-the-authorization-screen}

You can trigger the `trustedlogin/{namespace}/auth_screen` action to render the authorization screen. The proper JS and CSS files will be enqueued automatically:

```php
<h1>My Plugin</h1>

<p>This is a page inside my plugin.</p>

<?php
    // highlight-start
    // Render the TrustedLogin Grant Support Access screen.
    do_action( 'trustedlogin/{namespace}/auth_screen' );
    // highlight-end
?>

<p>More content here.</p>
```

## What happens if TrustedLogin service is down? {#what-happens-if-trustedlogin-service-is-down}

If the TrustedLogin service is down, the user will be presented with a button to contact support. That button points to the the Support URL (`vendor/support_url`) setting passed to the [`Config` object](configuration/). 

## If my `vendor/namespace` isn't unique, what happens? {#if-my-vendornamespace-isnt-unique-what-happens}

There will be an issue generating the login screen, but it will cause no security problems. The namespace is not used in
encryption or when generating the requests to your website.

## WordPress.org compliance {#wordpressorg-compliance}

TrustedLogin requires user action to provide logins. This is in compliance with WordPress.org.

All files (vendor logo, CSS, and JS files) must be local (using `plugin_dir_url()` or similar) to comply with WordPress.org rules.
