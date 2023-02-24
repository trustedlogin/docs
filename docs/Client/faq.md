# User FAQ

## What user data does TrustedLogin collect? {#what-user-data-does-trustedlogin-collect}

The only user data we collect is the website URL. The website URL is stored unencrypted in our database.

Other than that, we do not collect any user data.

When a support user logs into the website, we store the user's WordPress ID on the Vendor's website.

## What happens if I don't want to use TrustedLogin on my website? {#what-happens-if-i-dont-want-to-use-trustedlogin-on-my-website}

To disable TrustedLogin, define a `TRUSTEDLOGIN_DISABLE` constant in the site's `wp-config.php` file. That will prevent all code that uses TrustedLogin from loading TrustedLogin.

To prevent a single TrustedLogin installation, you will need to know the namespace. Once you have the namespace,  define a `TRUSTEDLOGIN_DISABLE_{NAMESPACE}` constant in the site's `wp-config.php` file. The namespace must be in all caps.

## Is TrustedLogin WordPress.org compliant? {#is-trustedlogin-wordpressorg-compliant}

Yes. TrustedLogin requires user action to provide logins. This is in compliance with WordPress.org.

When distributing TrustedLogin on WordPress.org, all files (logo, CSS, and JS files) must be local (using `plugin_dir_url()` or similar) to comply with WordPress.org rules.
