# Working with Vault

An instance of [HashiCorp Vault](https://www.vaultproject.io) is used to store all sensitive data about customer sites.

:::info
* The URL of Vault is: `https://vault.trustedlogin.com`
* The "app's auth token" Refers to the token used to identify this app, with Vault.
    * This token should grant the ability to take these actions and no others.
* The "SaaS Token" is [documented here](./vault-sass-token.md)
:::

## Check TTL Of Auth Token {#check-ttl-of-auth-token}
To check the TTL of the current token used by the app to authenticate against vault:

* [API Docs](https://www.vaultproject.io/api/auth/token/index.html#lookup-a-token-self-)
* URI - `/v1/auth/token/lookup-self` 
* HTTP Method - `GET`
* Required Headers `'X-Vault-Token':<token>`
* Request Body: None

* Example Response:
```json
{
    "request_id": "ac4a1ed6-64f7-6cca-2f38-182efdf37e4a",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": {
        "accessor": "X9H1u4IrPFgbUmjhToXtH5mq",
        "creation_time": 1557336326,
        "creation_ttl": 0,
        "display_name": "root",
        "entity_id": "",
        "expire_time": null,
        "explicit_max_ttl": 0,
        "id": "s.KODayxpVxBLBw8MxZdRKTU7r",
        "meta": null,
        "num_uses": 0,
        "orphan": true,
        "path": "auth/token/root",
        "policies": [
            "root"
        ],
        "ttl": 0,
        "type": "service"
    },
    "wrap_info": null,
    "warnings": null,
    "auth": null
}
```

## Renew Auth Token {#renew-auth-token}
To renew the app's auth token for longer use:

* [API Docs](https://www.vaultproject.io/api/auth/token/index.html#renew-a-token-self-)
* URI - `/v1/auth/token/renew-self` 
* HTTP Method - `POST`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
  "increment": "42h" 
}
```

* Example Response:
```json
{
    "request_id": "e113b883-0241-e8f0-39a9-b1fded129c63",
    "lease_id": "",
    "renewable": false,
    "lease_duration": 0,
    "data": null,
    "wrap_info": null,
    "warnings": null,
    "auth": {
        "client_token": "s.XWBIrPzWxZaobgtZRwwV0der",
        "accessor": "DSHxCZA9fWVjtKIBmNhEsQ1x",
        "policies": [
            "default",
            "saas-policy"
        ],
        "token_policies": [
            "default",
            "saas-policy"
        ],
        "metadata": null,
        "lease_duration": 151200,
        "renewable": true,
        "entity_id": "",
        "token_type": "service",
        "orphan": false
    }
}
```

## Request That A Key Store Be Created For Vendor {#request-that-a-key-store-be-created-for-vendor}
Vault can have a specific database or key store per vendor. When a vendor signs up, a new key store is created.

:::note 
The Key Store will be called `<namespace>-store` where `<namespace>` is a variable identifying the Client's project. (eg Key Store name = `gravityview-store` for `GravityView` project.). It is in the URI.
:::

To request a new key store for a vendor:

* [API Docs](https://www.vaultproject.io/api/system/mounts.html#enable-secrets-engine)
* URI - `/sys/mounts/<namespace>-store` 
* HTTP Method - `POST`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
    "type": "kv",
    "description":"Key Store for client X",
    "options": {
        "version": "1"
    }
}
```

* Example Response: 204 - No Content

Once this is received, create policies for Client Plugin Token and Delete Site permissions:

:::note
1. Policy will be called `<namespace>-write-policy` where `<namespace>` is a variable identifying the Client's project. (eg Policy name = `gravityview-write-policy` for `GravityView` project.). This is in the URI.
2. The Key Store name from before `<namespace>-store` is used in the Request Body. 
:::

* [API Docs](https://www.vaultproject.io/api/system/policies.html#create-update-acl-policy)
* URI - `/v1/sys/policies/acl/<namespace>-write-policy`
* HTTP Method - `PUT`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	"policy": "path \"<namespace>-store/*\" { capabilities = [\"create\", \"update\", \"delete\"]}"
}
```

* Example Response: 204 - No Content

and:

:::note
1. Policy will be called `<namespace>-delete-policy` where `<namespace>` is a variable identifying the Client's project. (eg Policy name = `gravityview-delete-policy` for `GravityView` project.). This is in the URI.
2. This policy is used to create a token that extends SaaS privileges to be able to remove Sites from Key Store.
3. The Key Store name from before `<namespace>-store` is used in the Request Body. 
:::

* [API Docs](https://www.vaultproject.io/api/system/policies.html#create-update-acl-policy)
* URI - `/v1/sys/policies/acl/<namespace>-delete-policy`
* HTTP Method - `PUT`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	"policy": "path \"<namespace>-store/*\" { capabilities = [\"delete\"]}"
}
```

* Example Response: 204 - No Content

and:

:::note
1. Policy will be called `<namespace>-read-policy` where `<namespace>` is a variable identifying the Client's project. (eg Policy name = `gravityview-read-policy` for `GravityView` project.). This is in the URI.
2. This policy is used to create a token for Support-side plugin to read secrets from ONLY `<namesspace>-store`.
3. The Key Store name from before `<namespace>-store` is used in the Request Body.
:::

* [API Docs](https://www.vaultproject.io/api/system/policies.html#create-update-acl-policy)
* URI - `/v1/sys/policies/acl/<namespace>-read-policy`
* HTTP Method - `PUT`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	"policy": "path \"<namespace>-store/*\" { capabilities = [\"read\"]}"
}
```

* Example Response: 204 - No Content


## Request Short-Term Token For Client Plugin To Create Site With {#request-short-term-token-for-client-plugin-to-create-site-with}
The client plugin will make requests to this app's `POST /api/site` endpoint to request a token it can use to create site in Vault.

To get that token from Vault:

:::note
`<namespace>-write-policy` in Request Body was defined above and tells the token what it can/can't access
:::

* [API Docs](https://www.vaultproject.io/api/auth/token/index.html#create-token)
* URI - `/v1/auth/token/create`
* HTTP Method - `POST`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	  "policies": [
	    "<namespace>-write-policy"
	  ],
	  "metadata": {
	    "key": "value",
	  },
	  "ttl": "7d",
	  "renewable": true,
	  "display_name": "Write Token",
	}
```

* Example Response:
```json
{
    "request_id": "...", // string
    "wrap_info": null,
    "warnings": null,
    "auth": {
        "client_token": "...", // string
        "accessor": "...", // string
        "policies": [
            "default",
            "gravityview-write-policy" // the policy defining permissions
        ],
        "token_policies": [
            "default",
            "gravityview-write-policy" // the policy defining permissions
        ],
        "metadata": null,
        "lease_duration": 1296000,
        "renewable": true,
        "entity_id": "",
        "token_type": "service",
        "orphan": false
    }
}
```

## Request Access Logs For A Site {#request-access-logs-for-a-site}
To get access logs for a specific site, app can make a this request to Vault:

:::warning
This documentation is incomplete. We are working on it.
:::

* URI - `/v1/...`
* HTTP Method - ...
* Required Headers ...
* Request Body:
```json
{
  "hi": "roy"
}
```

* Example Response:
```json
{
  "hi": "roy"
}
```

## Request That A Site Be Removed Form Vault {#request-that-a-site-be-removed-form-vault}
If the app needs to remove record of a site login, it can make this request to Vault:

First need to create a temporary token with delete permissions. Then use this Token to give SaaS the ability to delete Site info.
	
:::note
`<token>` (the SaaS token) is used in Headers. `<namespace>-delete-policy` in Request Body was defined above and tells the token what it can/can't access
:::

To get that token from Vault:

* [API Docs](https://www.vaultproject.io/api/auth/token/index.html#create-token)
* URI - `/v1/auth/token/create`
* HTTP Method - `POST`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	  "policies": [
	    "<namespace>-delete-policy"
	  ],
	  "ttl": "1d",
	  "renewable": false,
	  "display_name": "Delete Token",
	}
```

* Example Response:
```json
{
    "request_id": "...",
    "wrap_info": null,
    "warnings": null,
    "auth": {
        "client_token": "<deleteToken>",
        "accessor": "...",
        "policies": [
            "default",
            "gravityview-delete-policy"
        ],
        "token_policies": [
            "default",
            "gravityview-delete-policy"
        ],
        "metadata": null,
        "lease_duration": 1296000,
        "renewable": true,
        "entity_id": "",
        "token_type": "service",
        "orphan": false
    }
}
```

Then use that generated token to delete the secret:

:::note
1. `<deleteToken>` (from above) is used in Headers instead of `<token>`.
2: `<secret-id>` is provided from Client-side plugin in the request body sent to SaaS via `POST /sites`
:::

* [API Docs](https://www.vaultproject.io/api/secret/kv/kv-v1.html#delete-secret)
* URI - `/v1/<namespace>-store/<secret-id>`
* HTTP Method - `DELETE`
* Required Headers `'X-Vault-Token': <deleteToken>`
* Request Body: None

* Example Response: 204 - No Content

## Request Short-Term Token For Support-side Plugin To Read Site data {#request-short-term-token-for-support-side-plugin-to-read-site-data}
The support-side plugin will make requests to the SaaS app to get a token it can use to read sites in Vault.

To get that token from Vault:

:::note
`<namespace>-read-policy` in Request Body was defined above and tells the token what it can/can't access
:::

* [API Docs](https://www.vaultproject.io/api/auth/token/index.html#create-token)
* URI - `/v1/auth/token/create`
* HTTP Method - `POST`
* Required Headers `'Content-Type':'application/json','X-Vault-Token':<token>`
* Request Body:
```json
{
	  "policies": [
	    "<namespace>-read-policy"
	  ],
	  "ttl": "24h",
	  "renewable": true,
	  "display_name": "Support-side Token",
	}
```

* Example Response:
```json
{
    "request_id": "...", // string
    "wrap_info": null,
    "warnings": null,
    "auth": {
        "client_token": "...", // string
        "accessor": "...", // string
        "policies": [
            "default",
            "gravityview-write-policy" // the policy defining permissions
        ],
        "token_policies": [
            "default",
            "gravityview-write-policy" // the policy defining permissions
        ],
        "metadata": null,
        "lease_duration": 1296000,
        "renewable": true,
        "entity_id": "",
        "token_type": "service",
        "orphan": false
    }
}
```
