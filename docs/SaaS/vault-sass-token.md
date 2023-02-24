# The Vault SaaS Token

When accessing Vault, this application uses a special, highly privileged token, we call the "SaaS token".

## Using The SaaS Token {#using-the-saas-token}

The SaaS token is stored in the environment variable `VAULT_TOKEN` in Platform. In PHP code it can be accessed like this:

```php
$token = env('VAULT_TOKEN');
```

### Resetting The SaaS Token {#resetting-the-saas-token}

For local development, edit you `.env` file:

```txt
VAULT_TOKEN=trustedlogin
```

:::caution
Make sure the `VAULT_TOKEN` variable is set to be "inheritable" and "sensitive".
:::

To change the SaaS token(s) on the production and testing servers, you must be logged into Platform.sh and have proper permissions to edit environment variables. Edit the `env:VAULT_TOKEN` variable. Make sure it is set to be "inheritable" and "sensitive".

GitHub Actions has local `VAULT_TOKEN` and `VAULT_URL` environment variables and do not need to be modified.

#### Links {#links}
* 
* [Master environment variables settings](https://console.platform.sh/trustedlogin/xfssqruuoi5as/master/settings/variables)
* [Travis CI environment variable settings](https://travis-ci.com/trustedlogin/trustedlogin-ecommerce/settings)
* [Platform.sh Environment Variables Documentation](https://docs.platform.sh/development/variables.html#environment-variables)

#### Notes {#notes}

Access to environmental variables is limited.
