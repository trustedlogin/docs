# Hooks

## Actions {#actions}

### `trustedlogin/{namespace}/auth_screen` {#trustedloginnamespaceauthscreen}

Renders the Grant Access/Revoke Access screen.

Note: TrustedLogin uses the `20` priority to print the auth screen. 

### `trustedlogin/{namespace}/logging/log` {#trustedloginnamespacelogginglog}

| Parameter  | Type     | Description                                                                                                                                                            |
|------------|----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$message` | `string` | Message to log. Pre-processed to convert `WP_Error` and exceptions into strings.                                                                                       |
| `$method`  | `string` | Method that called the hook.                                                                                                                                           |
| `$level`   | `string` | A [PSR-3 log level](https://github.com/php-fig/log/blob/master/Psr/Log/LogLevel.php) ('emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug') |
| `$data`    | `array`  | Additional error data.                                                                                                                                                 |

### `trustedlogin/{namespace}/login/before` {#trustedloginnamespaceloginbefore}

The support user login flow has begun. **This is run before validation.** If you want to a hook that runs only after
successful login, use [`trustedlogin/{namespace}/login/after`](#trustedloginnamespaceloginafter) instead.

| Key                | Type     | Description                         |
|--------------------|----------|-------------------------------------|
| `$user_identifier` | `string` | Unique identifier for support user. 

### `trustedlogin/{namespace}/login/refused` {#trustedloginnamespaceloginrefused}

The identifier fails security checks.

| Key                | Type       | Description                                          |
|--------------------|------------|------------------------------------------------------|
| `$user_identifier` | `string`   | Unique identifier for support user.                  
| `$is_verified`     | `WP_Error` | The error encountered when verifying the identifier. 

Can be triggered with the following error codes:

- `brute_force_detected`: Due to the current request triggering brute force checks, the site has entered lockdown mode.
- `in_lockdown`: The site is currently in lockdown mode for a period of time.

### `trustedlogin/{namespace}/login/error` {#trustedloginnamespaceloginerror}

A support user fails to log in.

| Key                | Type       | Description                                          |
|--------------------|------------|------------------------------------------------------|
| `$user_identifier` | `string`   | Unique identifier for support user.                  
| `$is_verified`     | `WP_Error` | The error encountered when verifying the identifier. 

Can be triggered with the following error codes:

- `user_not_found`: There is no longer an existing support user (perhaps possibly because access has been revoked)
- `access_expired`: Access has expired due to configuration expiration settings

### `trustedlogin/{namespace}/login/after` {#trustedloginnamespaceloginafter}

A support user has logged-in.

| Key                | Type     | Description                         |
|--------------------|----------|-------------------------------------|
| `$user_identifier` | `string` | Unique identifier for support user. |

### `trustedlogin/{namespace}/access/created` {#trustedloginnamespaceaccesscreated}

Access has been granted.

| Key           | Type            | Description                                                                                                                                                                                     |
|---------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$url`        | `string`        | The site URL from where the access was granted, as returned by `get_site_url()`                                                                                                                 |
| `$action`     | `string`        | The type of trigger: `created`, `extended`, or `revoked`                                                                                                                                        |
| `$ref`        | `string`,`null` | A sanitized reference ID, if passed. Otherwise, null.                                                                                                                                           |
| `$debug_data` | `array`         | (Not always set) An array of site data generated by `Client::get_debug_data()`. Similar to `\WP_Debug_Data::debug_data()` output with Markdown formatting improvements applied. Added in 1.4.0. |

### `trustedlogin/{namespace}/access/extended` {#trustedloginnamespaceaccessextended}

Existing access has been extended.

| Key       | Type            | Description                                                                        |
|-----------|-----------------|------------------------------------------------------------------------------------|
| `$url`    | `string`        | The site URL from where the webhook was triggered, as returned by `get_site_url()` |
| `$action` | `string`        | The type of trigger: `created`, `extended`, or `revoked`                           |
| `$ref`    | `string`,`null` | A sanitized reference ID, if passed. Otherwise, null.                              

### `trustedlogin/{namespace}/access/revoked` {#trustedloginnamespaceaccessrevoked}

Access has been revoked.

| Key       | Type     | Description                                                                        |
|-----------|----------|------------------------------------------------------------------------------------|
| `$url`    | `string` | The site URL from where the webhook was triggered, as returned by `get_site_url()` |
| `$action` | `string` | The type of trigger: `created`, `extended`, or `revoked`                           |

### `trustedlogin/{namespace}/logged_in` {#trustedloginnamespacelogged_in}

A support user has logged-in to a site.

| Key       | Type     | Description                                                                        |
|-----------|----------|------------------------------------------------------------------------------------|
| `$url`    | `string` | The site URL from where the webhook was triggered, as returned by `get_site_url()` |
| `$action` | `string` | Set to `logged_in`                                                                 

## Filters {#filters}

### `trustedlogin/{namespace}/admin/menu/menu_slug` {#trustedloginnamespaceadminmenuslug}

Override the menu slug used for the Grant Support Access screen.

| Key          | Type     | Default                      | Description                                                                                                                            |
|--------------|----------|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `$menu_slug` | `string` | `'grant-{namespace}-access'` | Value passed to [`add_menu_page()`](https://developer.wordpress.org/reference/functions/add_menu_page/) as the `$menu_slug` parameter. |

### `trustedlogin/{namespace}/template/auth` {#trustedloginnamespacetemplateauth}

Override the structure of the auth form HTML.

| Key                     | Type     | Default                            | Description                                              |
|-------------------------|----------|------------------------------------|----------------------------------------------------------|
| `$auth_screen_template` | `string` | HTML with placeholders (see below) | The structure for the auth form HTML, with placeholders. |

```html

<div class="tl-{{ns}}-auth tl-{{ns}}-{{has_access_class}}">
    {{header}}
    <section class="tl-{{ns}}-auth__body">
        <h2 class="tl-{{ns}}-auth__intro">{{intro}}</h2>
        <div class="tl-{{ns}}-auth__content">
            <header class="tl-{{ns}}-auth__header">
                {{auth_header}}
            </header>
            <div class="tl-{{ns}}-auth__details">
                {{details}}
            </div>
            <div class="tl-{{ns}}-auth__response" aria-live="assertive"></div>
            {{notices}}
            <div class="tl-{{ns}}-auth__actions">
                {{button}}
            </div>
        </div>
        <div class="tl-{{ns}}-auth__secured_by">{{secured_by_trustedlogin}}</div>
    </section>
    <footer class="tl-{{ns}}-auth__footer">
        {{footer}}
        {{reference}}
    </footer>
</div>
```

### `trustedlogin/{namespace}/template/auth/display_reference` {#trustedloginnamespacetemplateauthdisplay_reference}

Toggles whether the reference ID, if set, is shown in the auth form. Since Version 1.3.

| Key                  | Type     | Default | Description                                                                                 |
|----------------------|----------|---------|---------------------------------------------------------------------------------------------|
| `$display_reference` | `bool`   | `true`  | Whether to display the reference ID on the auth screen.                                     |
| `$is_login_screen`   | `bool`   |         | Whether the auth form is being displayed on the login screen. Set by Admin::login_screen(). |
| `$ref`               | `string` |         | The reference ID.                                                                           |

### `trustedlogin/{namespace}/template/auth/terms_of_service/anchor` {#trustedloginnamespacetemplateauthterms_of_serviceanchor}

| Key       | Type     | Default            | Description                                   |
|-----------|----------|--------------------|-----------------------------------------------|
| `$anchor` | `string` | `Terms of Service` | The anchor text of the Terms of Service link. |

### `trustedlogin/{namespace}/template/auth/footer_links` {#trustedloginnamespacetemplateauthfooter_links}

Override the footer links shown below the auth form.

| Key             | Type    | Default                                                                                                                                         | Description                                                              |
|-----------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| `$footer_links` | `array` | `[ 'Learn About TrustedLogin' => 'https://www.trustedlogin.com/about/easy-and-safe/', 'Visit {vendor/title} support' => {vendor/support_url} ]` | Array of links to show in auth footer (Key is anchor text; Value is URL) |

### `trustedlogin/{namespace}/support_role` {#trustedloginnamespacesupport_role}

Change the name (slug) of the role created for the support user. Will be sanitized using `sanitize_title_with_dashes()`.

| Key          | Type                  | Default                                   | Description                                        |
|--------------|-----------------------|-------------------------------------------|----------------------------------------------------|
| `$role_name` | `string`              | `'{namespace}-support'`                   | The name of the role, which is more like the slug. |
| `$config`    | `TrustedLogin\Config` | Current TrustedLogin configuration object |

### `trustedlogin/{namespace}/support_role/display_name` {#trustedloginnamespacesupport_roledisplay_name}

Change the display name of the role created for support users. This will be displayed in the filter menu above the Users
table in the Dashboard, as well as in a list of site roles.

| Key             | Type                  | Default                                   | Description                                                                                                                          |
|-----------------|-----------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `$display_name` | `string`              | `'%s Support'`                            | A string prepared for localization where `%s` is replaced by the `vendor/title` configuration setting (for example, "Acme Support"). |
| `$config`       | `TrustedLogin\Config` | Current TrustedLogin configuration object |

### `trustedlogin/{namespace}/license_key` {#trustedloginnamespacelicense_key}

Modify the license key assigned to the current user. This should ideally be defined using the `auth/license_key`
configuration setting.

| Key            | Type             | Default | Description                               |
|----------------|------------------|---------|-------------------------------------------|
| `$license_key` | `string`, `null` | `null`  | Get the license key for the current user. |

### `trustedlogin/{namespace}/support_url/query_args` {#trustedloginnamespacesupport_urlquery_args}

If TrustedLogin fails to grant access to users, a button appears that will link directly to the `vendor/support_url`
configuration setting.

This filter exists to modify parameters added to that URL.

| Key           | Type    | Default                      | Description |
|---------------|---------|------------------------------|-------------|
| `$query_args` | `array` | See default array keys below |             |

#### $query_args array value {#query_args-array-value}

| Key                  | Type             | Default                                 | Description                                               |
|----------------------|------------------|-----------------------------------------|-----------------------------------------------------------|
| `query_args/message` | `string`         | `Could not create TrustedLogin access.` | What error message should be appended to the support URL. |
| `query_args/ref`     | `string`, `null` | `null`                                  | A sanitized reference ID, if passed. Otherwise, null.     |

### `trustedlogin/{namespace}/envelope/meta` {#trustedloginnamespaceenvelopemeta}

Adds custom metadata to be synced via TrustedLogin and stored in the Envelope. **Limited to 1MB.**

:::warning
Metadata is transferred and stored in plain text. **Do not add any unencrypted sensitive data or identifiable information**!
:::

| Key         | Type                  | Default                                   |
|-------------|-----------------------|-------------------------------------------|
| `$metadata` | `array`               | `[]` (empty array)                        |
| `$config`   | `TrustedLogin\Config` | Current TrustedLogin configuration object |

### `trustedlogin/{namespace}/logging/enabled` {#trustedloginnamespaceloggingenabled}

Toggles whether logging is enabled. It can be helpful to have a filter to override logging outside the configuration
array!

| Key           | Type   | Default | Description                                             |
|---------------|--------|---------|---------------------------------------------------------|
| `$is_enabled` | `bool` | `false` | Whether debug logging is enabled in TrustedLogin Client |

### `trustedlogin/{namespace}/vendor/public_key/website` {#trustedloginnamespacevendorpublic_keywebsite}

:::warning
Only use this filter if the `vendor/website` setting is not the same as the website where the TrustedLogin Connector plugin
is running.
:::

If the `vendor/website` setting and the website running the TrustedLogin Connector plugin are not the same, use this
filter.

For example, if the `vendor/website` setting is `https://www.parentcompany.com` but TrustedLogin is running on
the `https://child.parentcompany.com`, you would use this filter to point to `https://child.parentcompany.com`.

| Key                   | Type     | Default                                    | Description                                                     |
|-----------------------|----------|--------------------------------------------|-----------------------------------------------------------------|
| `$public_key_website` | `string` | The `vendor/website` configuration setting | The root URL of the website where the Connector plugin is running. |

### `trustedlogin/{namespace}/vendor/public_key/endpoint` {#trustedloginnamespacevendorpublic_keyendpoint}

:::warning
Only use this filter if the REST API endpoint has changed on the Vendor website.
:::

Override the path to TrustedLogin's WordPress REST API endpoint. If there have been customizations to the REST API
endpoint structure on the Vendor, the path may need to be modified.

For example, if the [`rest_url_prefix` filter is used](https://developer.wordpress.org/reference/hooks/rest_url_prefix/)
to change the REST API URL from `/wp-json/`, you will need to update the endpoint.

| Key                    | Type     | Default                              | Description                                                                                                    |
|------------------------|----------|--------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `$public_key_endpoint` | `string` | `wp-json/trustedlogin/v1/public_key` | The vendor's signature key REST API endpoint, which will be added to the vendor/website configuration setting. |

## 🛑 Advanced Internal Use Only {#-advanced-internal-use-only}

:::warning
These filters should not be used in production code. They are included here as helpful developer reference only, and
they may change.
:::

### 🚫 You really don't need these filters! 🚫 {#-you-really-dont-need-these-filters-}

Using these filters incorrectly may **break everything and make a site insecure**. They are used for advanced use cases
like automated end-to-end testing. They're only included here so our documentation is complete. Only use if you know
what you're doing!

### `trustedlogin/{namespace}/meets_ssl_requirement` {#trustedloginnamespacemeets_ssl_requirement}

Logins will not be synced with TrustedLogin if the site doesn't have proper SSL support. Sometimes, when testing, it's
helpful to have a filter to override this behavior.

| Key       | Type   | Default                              | Description                              |
|-----------|--------|--------------------------------------|------------------------------------------|
| `$return` | `bool` | `is_ssl() && $config['require_ssl']` | Does this site meet the SSL requirement? |

### `trustedlogin/{namespace}/api_url` {#trustedloginnamespaceapi_url}

Modifies the endpoint URL for the TrustedLogin service. This allows pointing requests to test servers.

| Key         | Type     | Default                                | Description             |
|-------------|----------|----------------------------------------|-------------------------|
| `$base_url` | `string` | `https://app.trustedlogin.com/api/v1/` | URL of TrustedLogin API |

:::warning
These filters should not be used in production code. They are included here as helpful developer reference only, and
they may change.
:::

### `trustedlogin/{namespace}/vendor_public_key` {#trustedloginnamespacevendor_public_key}

Override the public key functions. Encryption will break if this is changed.

| Key           | Type                  | Default                                   |
|---------------|-----------------------|-------------------------------------------|
| `$remote_key` | `string`              | Varies                                    | The signature key returned by the Connector plugin's REST API endpoint, acessible at https://www.example.com/wp-json/trustedlogin/v1/signature_key |
| `$config`     | `TrustedLogin\Config` | Current TrustedLogin configuration object |

:::warning
These filters should not be used in production code. They are included here as helpful developer reference only, and
they may change.
:::

### `trustedlogin/{namespace}/options/endpoint` {#trustedloginnamespaceoptionsendpoint}

Modify the namespaced setting name for storing part of the auto-login endpoint. **The endpoint value must be treated
carefully.** It is one of the two parts required to log in.

| Key            | Type                  | Default                                   |
|----------------|-----------------------|-------------------------------------------|
| `$option_name` | `string`              | `tl_{namespace}_endpoint`                 | The name for storing the endpoint value in the options table |
| `$config`      | `TrustedLogin\Config` | Current TrustedLogin configuration object |
