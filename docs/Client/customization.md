---
title: Template Customization
sidebar: auto
---

# Customizing the TrustedLogin Template

The TrustedLogin template is designed to be easily customized to match your brand. This guide will walk you through the steps to customize the template.

[Reference the hooks](hooks#trustedloginnamespacetemplateauth) doc for more information on how to customize the template using hooks.

:::tip
By removing placeholders you don't need, or replacing the placeholders with your preferred HTML, you can customize all output generated by the TrustedLogin Client.
:::

## The Grant Support Access Template

You can modify the Grant Support Access auth form by using the [`trustedlogin/{{ns}}/template/auth` filter](hooks#trustedloginnamespacetemplateauth).

This is the default HTML structure of the Grant Support Access form:

```html
<div class="tl-{{ns}}-auth tl-{{ns}}-{{has_access_class}}">
    {{header}}
    <section class="tl-{{ns}}-auth__body">
        <h2 class="tl-{{ns}}-auth__intro">
            {{intro}}
        </h2>
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
            {{terms_of_service}}
        </div>
        <div class="tl-{{ns}}-auth__secured_by">{{secured_by_trustedlogin}}</div>
    </section>
    <footer class="tl-{{ns}}-auth__footer">
        {{footer}}
        {{reference}}
    </footer>
    {{admin_debug}}
</div>
```

### `{{header}}` placeholder

The header of the auth form outputs the logo of the vendor.

It is only displayed on the Grant Auth screen, not on the `wp-login.php` screen.

```html
<header class="tl-{{ns}}-auth__header__top">
    <div class="tl-{{ns}}-auth__logo">
        <a href="{{vendor/website}}" title="Visit the {{vendor/title}} website (opens in a new tab)" target="_blank" rel="noreferrer noopener"><img src="{{vendor/logo_url}}" alt="{{vendor/title}}" /></a>
    </div>
</header>
```

#### Screenshots

![A screenshot of the Grant Support Access form with the header highlighted.](/img/client/form/header.png)

### `{{intro}}` placeholder

The `{{intro}}` placeholder is the introductory text displayed at the top of the Grant Support Access form.

Based on the context, the `{{intro}}` placeholder will be replaced with one of the following:

- **Access has been granted:**<br />
`<a href="{{vendor/website}}">Vendor Display Name</a> has site access that expires in [expiration time].`
- **On the login screen:**<br />
`<a href="{{vendor/website}}">Vendor Display Name</a> would like support access to this site.`
- **On the Grant Support Access screen:**<br />
`Grant <a href="{{vendor/website}}">Vendor Display Name</a> access to this site.`

#### Screenshots

![A screenshot of the Grant Support Access form with the intro highlighted.](/img/client/form/intro.png)

### `{{auth_header}}` placeholder

If there are no active Support Users, this placeholder will not be rendered.

If there are, the auth header shows the display name of the Support User, information about who granted access, and the Revoke Access button.

#### Screenshot

![A screenshot of the Grant Support Access form with the placeholder parts highlighted.](/img/client/form/auth-header.png)

### `{{details}}` placeholder

The `{{details}}` placeholder contains the bulk of the content of the Grant Support Access form.

#### Screenshot

![A screenshot of the Grant Support Access form with the placeholder parts highlighted.](/img/client/form/details.png)

```html
<p><span class="dashicons dashicons-info-outline dashicons--small"></span> This will allow <strong>{{name}}</strong> to:</p>
<div class="tl-{{ns}}-auth__roles">
    <h2>
        <span class="dashicons dashicons-admin-users dashicons--large"></span>{{roles_summary}}
    </h2>
    {{caps}}
</div>
<div class="tl-{{ns}}-auth__expire">
    <h2>
        <span class="dashicons dashicons-clock dashicons--large"></span>{{expire_summary}}{{expire_desc}}
    </h2>
</div>
```

#### `{{roles_summary}}` placeholder

If cloning roles is disabled (using the `clone_role` configuration setting), the `{{roles_summary}}` placeholder is replaced by `Create a user with a role of <strong>{{role}}</strong>.`.

##### If cloning roles is enabled

When cloning roles is enabled, `{{roles_summary}}` is replaced by `Create a user with a role based on <strong>{{cloned_role}}</strong>.`. Further, if custom capabilities are defined (using the `caps/remove` or `caps/add` configuration settings) are set, the `{{caps}}` placeholder will be rendered.

#### Screenshot

![The capabilities display, showing additional capabilities that have been added or removed from the cloned role.](/img/client/form/caps.png)

### `{{notices}}` placeholder

The `{{notices}}` placeholder is displayed when TrustedLogin is running on a local website that will not be accessible to support.

It is disabled when `wp_get_environment_type()` is "staging" or "production", so it will not be displayed on a live site.

#### Screenshot

![A screenshot of the Grant Support Access form with the notice circled with a green border.](/img/client/form/notices.png)

#### Settings available

- `vendor/about_live_access_url` - The URL to the vendor's documentation about live access. Defaults to `https://www.trustedlogin.com/about/live-access/`.

#### Constants available

`TRUSTEDLOGIN_DISABLE_LOCAL_NOTICE` - Set to `true` to disable the local notice.

### `{{button}}` placeholder

The button to grant or extend access to the support user. Generated by the `TrustedLogin\Form::generate_button()` placeholder.

- If access **has** been granted to the website, the button text will be "Extend [Vendor Display Name] Support Access". 
- If access **has not** been granted, the button text will be "Grant [Vendor Display Name] Support Access".

Here is sample HTML output for the button:

#### Screenshot

```html
<a href="{{vendor/support_url}}" class="button button-hero authlink button-primary tl-client-grant-button button-trustedlogin-{{ns}}" data-access="grant">Grant [Vendor Display Name] Support Access</a>
```

![A screenshot of the Grant Support Access form with the button circled with a green border.](/img/client/form/button.png)

### `{{reference}}` placeholder

If reference IDs are being displayed (controlled by the [`trustedlogin/{namespace}/template/auth/display_reference`](#trustedloginnamespacetemplateauthdisplay_reference) filter, render the reference ouput.

```html 
<div class="tl-{{ns}}-auth__ref"><p><span class="tl-{{ns}}-auth_ref__id">{{reference_text}}</span></p></div>
```

#### Screenshots

![A screenshot of the Grant Support Access form with the reference ID section circled with a green border.](/img/client/form/reference.png)

#### Filters available

- [`trustedlogin/{{ns}}/template/auth/display_reference`](hooks#trustedloginnamespacetemplateauthdisplay_reference) filter to control whether the reference ID is displayed.

### `{{terms_of_service}}` placeholder

If the [`terms_of_service/url` setting](configuration#all-options) is not defined, the terms of service output will not be rendered.

If there is a URL defined for Terms of Service, a link to terms of service will be rendered. The anchor text defaults to "Terms of Service".

#### HTML output

```html
<div class="tl-{{ns}}-auth__tos">
    <p>
        <a href="{{terms_of_service/url}}" target="_blank" rel="noopener noreferrer">Terms of Service</a>
    </p>
</div>
```

#### Screenshots

![A screenshot of the Grant Support Access form with the Terms of Service link circled with a green border.](/img/client/form/tos.png)

#### Available filters

- [`trustedlogin/{{ns}}/template/auth/terms_of_service/anchor`](hooks#trustedloginnamespacetemplateauthterms_of_serviceanchor) filter to modify the "Terms of Service" anchor text.

### `{{secured_by_trustedlogin}}` placeholder

The "Secured by TrustedLogin" text.

#### HTML output

```html
<p class="tl-{{ns}}-auth__secured_by">{{secured_by_trustedlogin}}</p>
```

#### Screenshots

![A screenshot of the Grant Support Access form with the "Secured by TrustedLogin" text circled with a green border.](/img/client/form/secured-by.png)

### `{{admin_debug}}` placeholder

The admin debug output. Only displayed if the user has `manage_options` capability and `$_GET['debug']` is set.

- TrustedLogin Status: `Online` or `Offline`
- API Key: The API key used to authenticate with the TrustedLogin API
- License Key: If a license key is set, it will be displayed here
- Log URL: A link to download the log file
- Log Level: The log level set in the TrustedLogin settings
- Webhook URL: The URL to the webhook endpoint, if set. `Empty` if not set.
- Vendor Public Key: The public encryption key of the vendor, with a link to verify the key

#### Screenshots

![A screenshot of the Grant Support Access form with the admin debug section circled with a green border.](/img/client/form/admin-debug.png)

## Examples of Customization

### Removing the Header

To customize the Grant Support Access form, you can use the `trustedlogin/{{ns}}/template/auth` filter.

Here is an example of how to customize the Grant Support Access form:

```php
// Replace `{{ns}}` with the namespace of your configuration.
add_filter( 'trustedlogin/{{ns}}/template/auth', 'RENAME_THIS_FUNCTION_remove_header', 10 );

/**
 * Remove the header, including the logo, from the Grant Support Access form.
 *
 * This is an example function name! Replace `RENAME_THIS_FUNCTION_remove_header` with a unique function name.
 * 
 * @param string $auth_screen_template The HTML template of the Grant Support Access form.
 * @return string
 */
function RENAME_THIS_FUNCTION_remove_header( $auth_screen_template ) {
    return str_replace( '{{header}}', '', $auth_screen_template );
}
```