# WordPress Hooks

## Filters {#filters}

## Secrets & infrastructure {#secrets-infrastructure}

### Trusted proxies<br/>`trustedlogin/connector/trusted-proxies` {#trusted-proxies}

Array of proxy `REMOTE_ADDR` values whose `X-Forwarded-For` and `CF-Connecting-IP` headers the plugin will trust when determining the client IP.

**Default:** empty array — no forwarded headers are honored, `REMOTE_ADDR` wins.

| Parameter | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| `$proxies` | `string[]` | Exact-match `REMOTE_ADDR` values of trusted proxies/edges. | `[]` | `1.4` |

This filter gates every use of `TrustedLogin\Vendor\Utils::get_ip()`, which feeds:

- Per-IP rate limiting on the Secrets fetch (`GET /wp-json/trustedlogin/v1/secrets/{token}`), passphrase verification (`POST …/verify`), and reveal-nonce generation (`POST …/prepare`).
- The `actor_ip` column on `wp_tl_secret_audit` rows.

**If you run TrustedLogin Connector behind Cloudflare, a reverse proxy, or a load balancer, add your proxy IPs here.** Otherwise rate-limit buckets and audit logs will show the proxy/edge IP instead of the actual client. That's safe (unauthenticated attackers can't spoof out of their bucket by sending an `X-Forwarded-For` header) but can cause shared rate-limit collisions between unrelated recipients sitting behind the same edge.

```php
add_filter( 'trustedlogin/connector/trusted-proxies', function ( $ips ) {
    return array_merge( $ips, [
        '192.0.2.10',  // reverse proxy
        '192.0.2.11',  // reverse proxy (HA pair)
    ] );
} );
```

For Cloudflare, pull [the current edge IP list](https://www.cloudflare.com/ips/) and expand the CIDRs into individual `REMOTE_ADDR` values — only exact string matches against the incoming `REMOTE_ADDR` count.

### Disable Secrets rate limiting<br/>`trustedlogin/connector/secrets/rate-limit/enabled` {#secrets-rate-limit-enabled}

Boolean gate on per-IP rate limits for the Secrets endpoints. Return `false` to disable.

**Default:** `true`.

| Parameter | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| `$enabled` | `bool` | Whether to apply rate limiting to the current request. | `true` | `1.4` |
| `$action` | `string` | The rate-limit bucket: `'fetch'` or `'verify'`. | — | `1.4` |
| `$ip` | `string` | The requester's IP (after `trusted-proxies` resolution). | — | `1.4` |

Only intended for controlled environments (e2e stacks, internal load tests). **Must remain `true` in production** — it's the primary brute-force defense on passphrase-protected secrets.

```php
add_filter( 'trustedlogin/connector/secrets/rate-limit/enabled', '__return_false' );
```

### Override the debug constant<br/>`trustedlogin/connector/debug-constant` {#debug-constant}

Overrides the effective value of the `TRUSTEDLOGIN_DEBUG` constant at runtime. Useful for forcing debug logging on or off in environments where the constant has already been defined and cannot be modified.

| Parameter | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| `$debug` | `bool` | The effective debug state. | Value of `TRUSTEDLOGIN_DEBUG`, or `false` | `1.3` |

```php
add_filter( 'trustedlogin/connector/debug-constant', '__return_true' );
```

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
