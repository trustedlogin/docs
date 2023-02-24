# Webhooks

There are webhooks that are fired at key customer life-cycle events so that TrustedLogin can integrate with Mailchimp and other sorts of marketing automation or reporting tools without modifying the codebase.

## Editing Webhook Settings {#editing-webhook-settings}
There is a nova page called "Settings". It has settings pages

## Getting Webhook Settings {#getting-webhook-settings}

The class `App\Contracts\GetSettingsContract` is a wrapper for the settings these webhooks use.

```php
use App\Contracts\GetSettingsContract;
use App\Interactions\GetSettings;
$settings = app()->get(GetSettingsContract::class);
$webhookUrl = $settings->getWebhook( 'webhook_site_created' );
```

## Technical Details {#technical-details}
The webhook server is built with [spatie/laravel-webhook-server](https://github.com/spatie/laravel-webhook-server)

The site events are triggered inside the `SiteObserver`.

The account webhooks are triggered using listeners attached to Spark events.

## Site-Related Webhooks {#site-related-webhooks}
The payload for these webhooks looks like this:

```json
{
    "id" : "7",
    "account" : "901",
    "url": "https://industry.io"
}
```

### Site Created {#site-created}
This event fires after a new site is created.

### Site Deleted {#site-deleted}
This event fires after a site is deleted.

### Account Created {#account-created}
This event fires after an account is created.

## Account-Related Webhooks {#account-related-webhooks}
The payload for these webhooks looks like this:

```json
{
    "id" : 7,
    "name" : "Thunder Bubble",
    "publicKey" : "1234-7890-12345",
    "namespace" : "thunder-bubble",
    "ownerName" : "Trover DuChamps",
    "ownerEmail" : "trover@industry.io",
    "trial" : false,
    "hasCard" : true,
    "isSubscribed" : true
}
```

### Account Cancelled {#account-cancelled}
This event fires after an account is updated.

### Account Renewed {#account-renewed}
This event fires after an account subscription is renewed.

## User-Realted Webhook {#user-realted-webhook}
The payload for these webhooks looks like this:

## User Created {#user-created}

```json
{
    "id" : 7,
    "name" : "Duke Corknelius Von Canadia",
    "email" : "hiroy@electronic-email-service.com"
}
```

## User Deleted {#user-deleted}

```json
{
    "id" : 7,
    "name" : "Duke Corknelius Von Canadia",
    "email" : "hiroy@electronic-email-service.com"
}
```