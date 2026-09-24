---
title: Cleaning up on uninstall
sidebar_label: Uninstall cleanup
sidebar: auto
sidebar_position: 8
---

# Cleaning up when your plugin is deleted

:::info
Available in the TrustedLogin Client **1.11.0** and later.
:::

The TrustedLogin Client is a library inside your plugin, not a plugin of its own. When a customer deletes your plugin, WordPress runs your plugin's `uninstall.php`, and the Client gets no chance to clean up. Unless you call it, everything the Client stored stays in the customer's database: support users and their role, the login endpoint, the cached webhook URL, settings and log files.

`Client::uninstall()` removes all of it for your plugin, and leaves other plugins that use TrustedLogin alone.

## Add the call to `uninstall.php`

Create `uninstall.php` in your plugin's root folder, or add to the one you have. Load the same namespaced autoloader your main plugin file loads (see [Installation](./02-installation.md)), then call `uninstall()` with your prefixed class name.

```php
<?php
// uninstall.php runs when the customer deletes your plugin.

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

require_once __DIR__ . '/vendor-namespaced/autoload.php';

try {
	\ProBlockBuilder\TrustedLogin\Client::uninstall( 'pro-block-builder' );
} catch ( \Exception $exception ) {
	error_log( 'TrustedLogin cleanup failed: ' . $exception->getMessage() );
}
```

The argument is your `vendor/namespace` value. That is enough for the default setup, but it can't tell TrustedLogin the access is gone. For that, pass your Config (next section).

`uninstall()` doesn't start a `Client`, so it also runs when `TRUSTEDLOGIN_DISABLE` or `TRUSTEDLOGIN_DISABLE_{NAMESPACE}` is defined, and on sites without sodium. It is safe to call when nothing is stored and safe to call more than once. It throws only when the namespace is empty.

## Pass your Config

Pass the same `Config` your plugin starts the Client with, instead of the namespace string, when any of these apply:

- **You want the access revoked in your TrustedLogin dashboard.** This needs the `auth/api_key` from your Config. With only a namespace, support users are deleted from the site, but their sites stay listed in your dashboard.
- You set `clone_role` to `false`, or set `role` to something other than `editor`.
- You set `logging/directory`.

```php
$config = new \ProBlockBuilder\TrustedLogin\Config( pro_block_builder_trustedlogin_config() );

\ProBlockBuilder\TrustedLogin\Client::uninstall( $config );
```

:::caution Filters must be added again
WordPress doesn't load your main plugin file before it runs `uninstall.php`. If your plugin filters `trustedlogin/{namespace}/support_role`, `trustedlogin/{namespace}/options/endpoint` or `trustedlogin/{namespace}/options/vendor_public_key`, add those filters in `uninstall.php` before calling `uninstall()`. Otherwise it looks for the default names and leaves your renamed ones behind.
:::

### Revoking in your TrustedLogin dashboard

With an API key, `uninstall()` tells TrustedLogin about each support user it removes, and sends any revokes that were still waiting to be retried. It keeps the customer waiting as little as possible:

- Each request gets 3 seconds.
- All requests together get at most 20 seconds.
- After the first failed request, no more are sent.
- Nothing is sent when the request deleting the plugin isn't on HTTPS, unless your Config sets `require_ssl` to `false`.

The site data is deleted either way. Revokes that weren't sent are listed in the return value under `saas_revokes_failed`. Remove those sites from your TrustedLogin dashboard by hand.

## Return value

`uninstall()` returns what it removed, which is useful if you log the cleanup:

```php
[
	'support_users'       => 1,        // support users removed
	'role'                => true,     // cloned support role removed
	'endpoint'            => true,     // login endpoint removed
	'options'             => [ ... ],  // names of the option rows removed
	'cron_events'         => 2,        // scheduled events cleared
	'log_files'           => 1,        // log files deleted
	'sites'               => 1,        // sites visited (multisite)
	'network_skipped'     => false,    // true when a large network limited the run to the current site
	'saas_revokes'        => 1,        // revokes TrustedLogin accepted
	'saas_revokes_failed' => [],       // secret IDs not revoked in your dashboard
]
```

## What gets deleted

Only data stored for **your** namespace. Other plugins that use TrustedLogin on the same site keep theirs.

| What | Where |
| --- | --- |
| Support users (users with `tl_{namespace}_id` meta), their meta and their expiry events | Users, user meta, scheduled events |
| The cloned support role, `{namespace}-support` | Roles |
| The login endpoint, `tl_{namespace}_endpoint` | Site option (network-wide on multisite) |
| The cached webhook URL, `tl_{namespace}_webhook_url` | Options |
| The log salt, `tl_{namespace}_log_salt` | Options |
| Revokes waiting to be retried, `tl_{namespace}_pending_saas_revoke`, and the `trustedlogin/{namespace}/site/retry_revoke` event | Options, scheduled events |
| Cached and temporary values: `tl_{namespace}_vendor_public_key`, `tl-{namespace}-used_accesskeys`, `tl-{namespace}-in_lockdown`, `tl_{namespace}_reconcile_ran`, `tl_{namespace}_reconcile_failures` | Options |
| Your namespace's `client-debug-*.log` files | `wp-content/uploads/trustedlogin-logs/`, or your `logging/directory` |

To keep the log files, pass `[ 'delete_logs' => false ]` as the second argument.

The cached and temporary values are stored as options with an expiry date, but that date is only checked when a value is read. Rows nobody reads again stay forever, which is why `uninstall()` deletes them.

## What stays

- **`tl_permalinks_flushed`.** Every plugin that uses TrustedLogin shares it.
- **The `trustedlogin-logs/` folder and its `index.html`.** Also shared.
- **Log files renamed with `logging/options`.** Only the default file names are matched.
- **A stock WordPress role.** When `clone_role` is `false`, support users get an existing role such as `editor`, and that role is never removed.
- **Anything stored for another namespace.**

## Multisite

Deleting a plugin removes it from the whole network, so by default `uninstall()` cleans every site.

- **Large networks.** When `wp_is_large_network()` is true (more than 10,000 sites), the run cleans only the current site and returns `network_skipped => true`. Pass `[ 'network' => true ]` to clean every site anyway, and make sure the request is allowed to run long enough.
- **Current site only.** Pass `[ 'network' => false ]`. Support users on other sites, and the login endpoint they use, stay in place.
- **Members of other sites.** A support user who is also a member of another site is removed from the sites that are cleaned, with their posts reassigned when `reassign_posts` is on. Their account is deleted from the network only once they belong to no site at all.

```php
\ProBlockBuilder\TrustedLogin\Client::uninstall(
	$config,
	[
		'network'     => false, // null (default): every site unless the network is large; true: every site; false: current site only
		'delete_logs' => true,  // false keeps your log files
	]
);
```

## Don't call it on deactivation

:::danger
Call `uninstall()` from `uninstall.php` only. Never hook it to `register_deactivation_hook()`.
:::

Customers often deactivate plugins for a short time, for example while looking for a plugin conflict. Running the cleanup then would end any support session in progress and delete settings the plugin expects to find when it comes back.

Expired access doesn't need uninstall or deactivation to be removed. Since 1.11.0, the Client removes expired support users on WordPress's hourly scheduled-task run, including access that ran out while your plugin was inactive, as soon as your plugin is active again.
