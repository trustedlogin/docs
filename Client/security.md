# Security Details

## Logging in {#logging-in}

Every time a login occurs using a TrustedLogin link, the login is also verified by the TrustedLogin service. See [TrustedLogin Flow](/flows) for details.

## Auto-expiring access {#auto-expiring-access}

Accounts created with TrustedLogin auto-expire after a period of time defined in the Client configuration.

Also, secrets stored in the Vault contain expiration timestamps. If the secret is older than the configured expiration time, the secret is deleted the next time it is requested.

## Capabilities {#capabilities}

When creating a support user in TrustedLogin using the default `clone_role=true` configuration, it's not possible to assign these capabilities to the generated users:

- `create_users`
- `delete_users`
- `edit_users`
- `promote_users`
- `delete_site`
- `remove_users`

In order to maintain a higher level of security, users created by TrustedLogin with the `clone_role` configuration enabled are not able to create other users. This will help prevent the possibility for support agents to create secret users for themselves.

## Access control {#access-control}

At any time, a website administrator may revoke TrustedLogin access. When access is revoked locally, the secret is also deleted from the SaaS.

## Lockdown mode {#lockdown-mode}

TrustedLogin should not generate multiple User Identifiers in frequent succession. If many User Identifiers are being used to attempt a login, it may be the sign of a brute force attack on the website.

When TrustedLogin identifies more than 3 User Identifiers have been used in 10 minutes, TrustedLogin enables lockdown mode for the plugin for 20 minutes.

**Lockdown mode:**

- Prevents all site access using the plugin's TrustedLogin link
- Notifies the TrustedLogin service of the lockdown
- Runs the `trustedlogin/{namespace}/lockdown/after` action so developers can customize behavior

### Preventing sites from going into lockdown: {#preventing-sites-from-going-into-lockdown}

When setting up TrustedLogin on a testing site, it may be helpful to temporarily disable lockdown mode.

Security checks will automatically be disabled for `local` and `development` sites based on the value of the [`wp_get_environment_type()`](https://developer.wordpress.org/reference/functions/wp_get_environment_type/) function.

You can also define a `TRUSTEDLOGIN_TESTING_{NAMESPACE}` constant in the site's `wp-config.php` file.

```php
define( 'TRUSTEDLOGIN_TESTING_EXAMPLE', true );
```
