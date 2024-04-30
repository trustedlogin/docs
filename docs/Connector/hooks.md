# WordPress Hooks

## Filters {#filters}

## Help Scout integration {#help-scout-integration}

### Modify returned licenses array<br/>`trustedlogin/connector/customers/licenses` {#modify-returned-licenses-arraybrtrustedloginvendorcustomerslicenses}

| Parameter | Type | Description | Default | Since |
| --- | ---  | --- | --- | -- |
| `$licenses` | `\EDD_SL_License[]`,`false` | License keys associated with the passed emails. | `[]` | `1.0.0` |
| `$customer_emails` | `array` | Email addresses Help Scout associates with the customer. | `[]` | `1.0.0` |

### Widget template overrides {#widget-template-overrides}

You can modify the template output implemented in the support desk (Help Scout or FreeScout) integrations using the following filters.

Replace the `(helpscout|freescout)` placeholder in the filter name with the support desk you are using (`helpscout` with `freescout`).

#### `trustedlogin/connector/helpdesk/(helpscout|freescout)/template/wrapper` {#trustedloginvendorhelpdeskhelpscouttemplatewrapper}
HTML output of the wrapper HTML elements.

#### `trustedlogin/connector/helpdesk/(helpscout|freescout)/template/item` {#trustedloginvendorhelpdeskhelpscouttemplateitem}
HTML output of the individual items HTML elements.

#### `trustedlogin/connector/helpdesk/(helpscout|freescout)/template/no-items` {#trustedloginvendorhelpdeskhelpscouttemplateno-items}
HTML output of the HTML elements when no items are found.

## Actions {#actions}

### `trustedlogin_connector` {#trustedlogin_connector}

This action is triggered after the plugin is initialized.

### `trustedlogin_connector_settings_saved` {#trustedlogin_connector_settings_saved}

This action is triggered after the settings are saved or reset.
