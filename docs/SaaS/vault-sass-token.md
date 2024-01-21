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

GitHub Actions has local `VAULT_TOKEN` and `VAULT_URL` environment variables and do not need to be modified.

#### Notes {#notes}

Access to environmental secrets is limited.
