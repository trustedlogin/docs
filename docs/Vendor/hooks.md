# WordPress Hooks

## Filters {#filters}

### Modify default settings<br/>`trustedlogin/vendor/settings/default` {#modify-default-settingsbrtrustedloginvendorsettingsdefault}

```php
[
  'account_id'       => '',
  'private_key'      => '',
  'api_key'       => '',
  'helpdesk'         => [ 'helpscout' ],
  'approved_roles'   => [ 'administrator' ],
  'debug_enabled'    => 'on',
  'enable_audit_log' => 'on',
]
```

### Modify menu location<br/>`trustedlogin/vendor/settings/menu-location` {#modify-menu-locationbrtrustedloginvendorsettingsmenu-location}

| Parameter | Type | Description | Default | Since |
| --- | ---  | --- | --- | -- |
| `$location` | `string` | Where to place the TrustedLogin menu in the WordPress admin sidebar, either `main` or `submenu`. | `main` | `1.0.0` |

Filter: 
Added to allow devs to move options item under 'Settings' menu item in wp-admin to keep things neat.

## Help Scout integration {#help-scout-integration}

### Modify returned licenses array<br/>`trustedlogin/vendor/customers/licenses` {#modify-returned-licenses-arraybrtrustedloginvendorcustomerslicenses}

| Parameter | Type | Description | Default | Since |
| --- | ---  | --- | --- | -- |
| `$licenses` | `\EDD_SL_License[]`,`false` | License keys associated with the passed emails. | `[]` | `1.0.0` |
| `$customer_emails` | `array` | Email addresses Help Scout associates with the customer. | `[]` | `1.0.0` |

return apply_filters( 'trustedlogin/vendor/customers/licenses', $licenses, $customer_emails );

### Help Scout widget template overrides {#help-scout-widget-template-overrides}

You can modify the template output implemented in the Help Scout integration using the following filters:

#### `trustedlogin/vendor/helpdesk/helpscout/template/wrapper` {#trustedloginvendorhelpdeskhelpscouttemplatewrapper}
HTML output of the wrapper HTML elements.

#### `trustedlogin/vendor/helpdesk/helpscout/template/item` {#trustedloginvendorhelpdeskhelpscouttemplateitem}
HTML output of the individual items HTML elements.

#### `trustedlogin/vendor/helpdesk/helpscout/template/no-items` {#trustedloginvendorhelpdeskhelpscouttemplateno-items}
HTML output of the HTML elements when no items are found.

## Actions {#actions}

### `trustedlogin/vendor/add_hooks/after` {#trustedloginvendoradd_hooksafter}

This action is triggered after the plugin adds menu items, initializes settings, and registers scripts and styles.