---
title: Configuring the TrustedLogin Client SDK
sidebar_label: Client Configuration
sidebar_position: 5
---

# Client Configuration

## Minimal configuration {#minimal-configuration}

When instantiating the TrustedLogin `Client` class, you need to pass a valid `Config` object.

The following is a minimal configuration. It has all the _required_ settings, but not all **recommended** settings!

```php
$config = [
    'auth' => [
        'api_key' => '1234567890',
    ],
    'vendor' => [
        'namespace' => 'pro-block-builder',
        'title' => 'Pro Block Builder',
        'email' => 'support@example.com',
        'website' => 'https://example.com',
        'support_url' => 'https://help.example.com',
    ],
    'role' => 'editor',
];
```

:::note
### When you see `ProBlockBuilder`, this is a placeholder. Make sure to replace with your own namespace! {#when-you-see-problockbuilder-make-sure-to-replace-with-your-own-namespace}
In the examples on this page, we're going to pretend your plugin or theme is named "Pro Block Builder" and your business is named Widgets, Co. These should not be the names you use—make sure to update the sample code below to match your business and plugin/theme name!
:::

## A more complete configuration {#a-more-complete-configuration}

The following is a more complete configuration. It includes all the settings that can be configured.

```php
$config = [
    'auth' => [
        'api_key' => '12345678',
    ],
    'vendor' => [
        'namespace' => 'pro-block-builder',
        'title' => 'Pro Block Builder',
        'email' => 'support@example.com',
        'website' => 'https://example.com',
        'support_url' => 'https://help.example.com',
        'logo_url' => plugins_url( 'path/to/logo/image/logo.svg', EXAMPLE_PBB_PLUGIN_FILE_PATH ),
    ],
    'role' => 'editor',
    'clone_role' => false,
    'menu' => [
        'slug' => 'example', // This is the `page` attribute of top-level menu item (eg: `admin.php?page=example`).
        'title' => esc_html__( 'Grant Site Access', 'pro-block-builder' ),
    ],
    'webhook' => [
        'url' => 'https://hooks.zapier.com/hooks/catch/12345/example/silent/', // Zapier webhook URL.
        'debug_data' => true,
        'create_ticket' => true,
    ],
];
```

## All configuration options {#all-options}

| Key                     | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default                                                                                                                                                  | Required? |
|-------------------------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|
| `auth/api_key`          | `string`                | The TrustedLogin key for the vendor, found in "API Keys" on https://app.trustedlogin.com.                                                                                                                                                                                                                                                                                                                                                                                                                          | `null`                                                                                                                                                   |     ✅     |
| `auth/license_key`      | `string`, `null`        | If enabled, the license key for the current client. This is used as a lookup value when integrating with help desk support widgets. If not defined, a cryptographic hash will be generated to use as the Access Key.                                                                                                                                                                                                                                                                                               | `null`                                                                                                                                                   |           |
| `role`                  | `string`                | The role to clone when creating a new Support User.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `editor`                                                                                                                                                 |     ✅     |
| `clone_role`            | `bool`                  | If true, create a new role with the same capabilites as the `role` setting. If false, use the defined `role` setting.                                                                                                                                                                                                                                                                                                                                                                                              | `true`                                                                                                                                                   |           |
| `vendor/namespace`      | `string`                | Slug for vendor. Must be unique. Must be shorter than 96 characters. Cannot be a reserved namespace. ([learn more about the vendor namespace setting below](#vendor-namespace))                                                                                                                                                                                                                                                                                                                                    | `null`                                                                                                                                                   |     ✅     |
| `vendor/title`          | `string`                | Name of the vendor company. Used in text such as `Visit the %s website`                                                                                                                                                                                                                                                                                                                                                                                                                                            | `null`                                                                                                                                                   |     ✅     |
| `vendor/email`          | `string`                | Email address for support. Used when creating usernames. Recommended: use `{hash}` dynamic replacement ([see below](#email-hash)).                                                                                                                                                                                                                                                                                                                                                                                 | `null`                                                                                                                                                   |     ✅     |
| `vendor/website`        | `string`                | URL to the vendor website. Must be a valid URL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `null`                                                                                                                                                   |     ✅     |
| `vendor/support_url`    | `string`                | URL to the vendor support page. Shown to users in the Grant Access form and also serves as a backup to redirect users if the TrustedLogin server is unreachable. Must be a valid URL.                                                                                                                                                                                                                                                                                                                              | `null`                                                                                                                                                   |     ✅     |
| `vendor/display_name`   | `string`                | Optional. Display name for the support team. See "Display Name vs Title" below.                                                                                                                                                                                                                                                                                                                                                                                                                                    | `null`                                                                                                                                                   |           |
| `vendor/logo_url`       | `string`                | Optional. URL to the vendor logo. Displayed in the Grant Access form. May be inline SVG. Must be local to comply with WordPress.org.                                                                                                                                                                                                                                                                                                                                                                               | `null`                                                                                                                                                   |           |
| `caps/add`              | `array`                 | An array of additional capabilities to be granted to the Support User after their user role is cloned based on the `role` setting.<br/><br/>The key is the capability slug and the value is the reason why it is needed. Example: `[ 'gf_full_access' => 'Support will need to see and edit the forms, entries, and Gravity Forms settings on your site.' ]`                                                                                                                                                       | `[]`                                                                                                                                                     |           |
| `caps/remove`           | `array`                 | An array of capabilities you want to _remove_ from Support User. If you want to remove access to WooCommerce, for example, you could remove the `manage_woocommerce` cap by using this setting: `[ 'manage_woocommerce' => 'We don\'t need to manage your shop!' ]`.                                                                                                                                                                                                                                               | `[]`                                                                                                                                                     |           |
| `decay`                 | `int`                   | If defined, how long should support be granted access to the site? Defaults to a week in seconds (`604800`). Minimum: 1 day (`86400`). Maximum: 30 days (`2592000`). If `decay` is not defined, support access will not expire.                                                                                                                                                                                                                                                                                    | `604800`                                                                                                                                                 |           |
| `menu/slug`             | `string`,`null`,`false` | TrustedLogin adds a submenu item to the sidebar in the Dashboard. The `menu/slug` setting is the slug name for the parent menu (or the file name of a standard WordPress admin page). If `null`, the a top-level menu will be added. If `false`, a menu item will not be added. If a string, it will be used as the `$parent_slug` argument passed to the [`add_submenu_page()` function](https://developer.wordpress.org/reference/functions/add_submenu_page/).                                                  | `null`                                                                                                                                                   |           |
| `menu/title`            | `string`                | The title of the submenu in the sidebar menu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `Grant Support Access`                                                                                                                                   |           |
| `menu/icon_url`         | `string`                | The URL to the icon to be used for this menu. The value is passed as `$icon_url` to the [`add_menu_page()` function](https://developer.wordpress.org/reference/functions/add_menu_page/).                                                                                                                                                                                                                                                                                                                          | `''` (empty string)                                                                                                                                      |           |
| `menu/priority`         | `int`                   | The priority of the `admin_menu` action used by TrustedLogin.                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `100`                                                                                                                                                    |           |
| `menu/position`         | `int`, `float`, `null`  | The `$position` argument passed to the [`add_submenu_page()` function](https://developer.wordpress.org/reference/functions/add_submenu_page/) function.                                                                                                                                                                                                                                                                                                                                                            | `null`                                                                                                                                                   |           |
| `logging/enabled`       | `bool`                  | If enabled, logs are stored in `wp-content/uploads/trustedlogin-logs`                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`                                                                                                                                                  |           |
| `logging/directory`     | `null`,`string`         | Override the directory where logs are stored. See [Logging](logging/) for more information.                                                                                                                                                                                                                                                                                                                                                                                                                        | `null`                                                                                                                                                   |           |
| `logging/threshold`     | `string`                | Define what [PSR log level](https://www.php-fig.org/psr/psr-3/#5-psrlogloglevel) should be logged. To log everything, set the threshold to `debug`.                                                                                                                                                                                                                                                                                                                                                                | `notice`                                                                                                                                                 |           |
| `logging/options`       | `array`                 | Array of [KLogger Additional Options](https://github.com/katzgrau/klogger#additional-options)                                                                                                                                                                                                                                                                                                                                                                                                                      | `['extension' => 'log', 'dateFormat' => 'Y-m-d G:i:s.u', 'filename' => null, 'flushFrequency' => false, 'logFormat' => false, 'appendContext' => true ]` |           |
| `paths/css`             | `string`                | Where to load CSS assets from. By default, the bundled TrustedLogin CSS file will be used. Must be local to comply with WordPress.org.                                                                                                                                                                                                                                                                                                                                                                             | `{plugin_dir_url() to Config.php}/assets/trustedlogin.css`                                                                                               |           |
| `paths/js`              | `string`                | Where to load JS assets from. By default, the bundled TrustedLogin JS file will be used. Must be local to comply with WordPress.org.                                                                                                                                                                                                                                                                                                                                                                               | `{plugin_dir_url() to Config.php}/assets/trustedlogin.js`                                                                                                |           |
| `reassign_posts`        | `bool`                  | When the Support User is revoked, should posts & pages be re-assigned to a site administrator? If `false`, posts and pages created by the user will be deleted. Passed as the second argument to [the `wp_delete_user()` function](https://developer.wordpress.org/reference/functions/wp_delete_user/). <br/><br/>When `reassign_posts` setting is enabled, TrustedLogin will attempt to assign posts created by the user to the best-guess administrator: the user with the longest-active `administrator` role. | `true`                                                                                                                                                   |           |
| `require_ssl`           | `bool`                  | Whether to use TrustedLogin when the site isn't served over HTTPS. TrustedLogin will still work, but the requests may not be secure. If `false`, the TrustedLogin "Grant Access" button will take users to the `vendor/support_url` URL directly.                                                                                                                                                                                                                                                                  | `true`                                                                                                                                                   |           |
| `terms_of_service/url`  | `null`,`string`         | The URL to the vendor's Terms of Service. If defined, a message "By granting access, you agree to the Terms of Service." will be added below the Grant Access button. Added in 1.6.0.                                                                                                                                                                                                                                                                                                                              | `null`                                                                                                                                                   |           |
| `webhook/url`           | `string`                | If defined, TrustedLogin will send a `POST` request to the defined URL. Must be a valid URL if defined. See the Webhooks section below.                                                                                                                                                                                                                                                                                                                                                                            | `null`                                                                                                                                                   |           |
| `webhook/debug_data`    | `bool`                  | Whether to show the user an opt-in consent checkbox to send debugging data (the Site Health report) to the Webhook. Only relevant if `webhook/url` is defined and a valid URL.                                                                                                                                                                                                                                                                                                                                     | `false`                                                                                                                                                  |           |
| `webhook/create_ticket` | `bool`                  | Whether to show the user a form to send a message to support via the Webhook. Only relevant if `webhook/url` is defined and a valid URL.                                                                                                                                                                                                                                                                                                                                                                           | `false`                                                                                                                                                  |           |


## Logging {#logging}

**We recommend disabling logging.** 

When logging is enabled, TrustedLogin logs to the `wp-content/uploads/trustedlogin-logs/` directory by default.

1. TrustedLogin creates a `trustedlogin-logs` directory inside the `wp-content/uploads/` directory.
2. An empty `index.html` file is placed inside the directory to prevent browsing.
3. New log files are created daily for each TrustedLogin namespace. The default log `filename` format is `client-debug-{Y-m-d}-{hash}.log`
    - `{namespace}` is the namespace of your business, plugin, or theme name
    - `{date}` is `YYYY-MM-DD` format
    - The hash is generated using `wp_hash()` using on the `vendor/namespace`, site `home_url()`, and the day of the year (`date('z')`). The point of the hash is to make log names harder to guess (security by obscurity).

### Using your own logging library {#using-your-own-logging-library}

If you add an action for `trustedlogin/{namespace}/logging/log`, TrustedLogin will let you handle logging. The `trustedlogin-logs` directory and log files will not be created.

### Default settings: {#default-settings}
```php
'logging' => [
    'enabled' => false,
    'directory' => null,
    'threshold' => 'debug',
    'options' => [],
],
```

### logging/enabled {#loggingenabled}

_Optional._ Default: `false`

Whether to enable logging TrustedLogin activity to a file. Helpful for debugging.

To enable logging in TrustedLogin, the minimum configuration necessary is:

```php
'logging' => [
    'enabled' => true,
],
```

### `logging/directory` {#loggingdirectory}

_Optional._ Default: `null`

If `null`, TrustedLogin will generate its own directory inside the `wp-content/uploads/` directory. The path for logs is
`/wp-content/uploads/trustedlogin-logs/`. Created directories are protected by an `index.html` file to prevent browsing.

### `logging/threshold` {#loggingthreshold}

_Optional._ Default: `debug`

This setting defines the level of logging that should be recorded.

The default setting if logging is to record all logs (`debug`).

The available options include the logging levels defined in
[PSR-3 `Psr\Log\LogLevel`](https://www.php-fig.org/psr/psr-3/#5-psrlogloglevel):

- `emergency`
- `alert`
- `critical`
- `error`
- `warning`
- `notice`
- `info`
- `debug`

Setting `logging/threshold` to `error` will record logs with the level of `error` and above (`error`, `critical`,
`alert`, and `emergency`).

### `logging/options` {#loggingoptions}

_Optional._ Default: `[]`

This setting can be used to pass additional options to the `Logger` class. The TrustedLogin Logger class is based on KLogger. See [the KLogger docs
for more information](https://github.com/katzgrau/KLogger#additional-options).

### Log file names {#log-file-names}

There is one log file generated per day. Log file names use a hash to make them more secure by obscurity, in this format:
`trustedlogin-debug-{{Date in Y-m-d format}}-{{hash}}.log`

Example: `trustedlogin-debug-2020-07-27-39dabe12636f200938bbe8790c0aef94.log`

## Vendor namespaces {#vendor-namespace}

Namespaces are used to isolate your TrustedLogin configuration from other plugins or themes that may also use TrustedLogin. They must be unique.

Some of the places the namespace is used include:

- The default dashboard URL for the Grant Access page: `/wp-admin/admin.php?page=grant-{namespace}-access`
- The WP Login Grant access URL: `wp-login.php?action=trustedlogin&ns={namespace}`
- The user role created for support access: `{namespace}-support`
- The CSS classes used in the Grant Access form
- Actions and filters (eg: `trustedlogin/{namespace}/access/created`)
- The name of the constant to disable TrustedLogin (eg: `TRUSTEDLOGIN_DISABLE_{NAMESPACE}`)
- As part of a hash for the log file name

### Reserved namespaces {#reserved-namespaces}

The following namespaces are reserved and cannot be used:

- `trustedlogin`
- `trusted-login`
- `client`
- `vendor`
- `admin`
- `administrator`
- `wordpress`
- `support`

## Display Name vs Title {#display-name-vs-title}

If `vendor/title` is set to `GravityView`, the default confirmation screen will say `Grant GravityView access to your site.`

When `vendor/display_name` is also defined, the text will read `GravityView Support`, the default confirmation screen will say `Grant GravityView Support access to your site.`

## Task-specific email addresses {#task-specific-email-addresses}

In order to prevent email address collision, we recommend using "plus addresses" (also called "task-specific email addresses") for your `vendor/email` setting.

Rather than `support@example.com`, use `support+{hash}@example.com`. `{hash}` will be dynamically replaced when used in
the email address.

This is supported by many email providers, including [Gmail](https://docs.microsoft.com/en-us/exchange/recipients-in-exchange-online/plus-addressing-in-exchange-online), [Microsoft](https://docs.microsoft.com/en-us/exchange/recipients-in-exchange-online/plus-addressing-in-exchange-online), [Fastmail](https://www.fastmail.com/help/receive/addressing.html), and [ProtonMail](https://protonmail.com/support/knowledge-base/creating-aliases/).

## Invalid capabilities {#invalid-capabilities}

The Support User will be created based on the role defined in the configuration (see configuration above).

The following capabilities are never allowed when creating users through TrustedLogin, regardless of the role:

- `create_users`
- `delete_users`
- `edit_users`
- `promote_users`
- `delete_site`
- `remove_users`

A goal for TrustedLogin is to instill confidence in the end user that they are not creating security holes when granting
support access to their site.

## Webhooks {#webhooks}

If the `webhook_url` setting is set and is a valid URL, the URL will be sent a `POST` request when creating a Support User, extending access, or revoking access.

| Key          | Type            | Description                                                                                                                                                                      |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`        | `string`        | The site URL from where the webhook was triggered, as returned by `get_site_url()`                                                                                               |
| `action`     | `string`        | The type of trigger: `created`, `extended`, or `logged_in`, or `revoked`                                                                                                         |
| `ref`        | `string`,`null` | A sanitized reference ID, if passed. Otherwise, null.                                                                                                                            |
| `debug_data` | `string`        | The Site Health report in Markdown formatting. This key is only set for the `trustedlogin/{namespace}/access/created` action, and only if the user opted-in. Added in 1.4.0.     |
| `ticket`     | `array`         | The unmodified message created by the user. This key is only set for the `trustedlogin/{namespace}/access/created` action, and only if the message is not empty. Added in 1.5.0. |

The default actions that trigger webhooks to run are:

- `trustedlogin/{namespace}/access/created`
- `trustedlogin/{namespace}/access/extended`
- `trustedlogin/{namespace}/access/revoked`
- `trustedlogin/{namespace}/logged_in`

See [hook documentation](/Client/hooks).
