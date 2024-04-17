# Remote User Authentication

In the [TrustedLogin Connector plugin](../Connector/) (the support-side plugin), users must log into the SaaS app. This document explains how.

## Get The Account's ClientId and Client Secret {#get-the-accounts-clientid-and-client-secret}

### Get The Client ID and Secret {#get-the-client-id-and-secret}
Each account has an oAuth client of the [password grant type](https://laravel.com/docs/5.8/passport#password-grant-tokens). The vendor side plugin should have settings for API key, Public Key and account id. These are all visible in team settings in SaaS app.

To obtain this information, make a GET request to `/api/accounts/<accountId>` where accountId is the ID of the account. This request should set, in the `X-TL-TOKEN` header, the `sha256` hash of the public key joined, without spaces to the api key.

```php
$hash = hash( 'sha256', $publicKey . $apiKey );
```

That response will include `clientId` and `clientSecret`. You will need them to login. It also includes the readToken for the team.

![team-keys](https://user-images.githubusercontent.com/1994311/63133352-dddeb000-bf92-11e9-96a5-8b99b5d1b378.PNG)


### Login a User {#login-a-user}

Then you can use that to make a POST request to request an oath token and the accounts read token to `/oauth/token`.  With this body:

```json
{
        'grant_type' => 'password',
        'client_id' => 'client-id', // this is the clientId from above
        'client_secret' => 'client-secret', //this is the clientSecret from above
        'username' => 'roy@hiroy.club', //user name
        'password' => 'my-password', //userpassword,
        'scopes' => '*'
}
```

If the login is successful, a `200` status code and a response like this will be returned:

```json
{
    "token_type": "Bearer",
    "expires_in": 259199,
    "access_token": "very-long-string",
    "refresh_token": "also-very-long"
}
```

The `access_token` is very long, and should be stored for later. 


### Verify Token {#verify-token}

To verify that a token is still valid, use it as a bearer token to request user details by making a GET request to `api/user`.

Headers:
```php
[
    'Accept' => 'application/json',
    'Authorization' => 'Bearer '. $accessToken,
],
```

This will return the current username, ID, and email if valid.
