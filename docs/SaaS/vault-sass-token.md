# The Vault SaaS Token

When accessing Vault, this application uses a special, highly privileged token, we call the "SaaS token".

## Using The SaaS Token {#using-the-saas-token}

The SaaS token is stored in the environment variable `VAULT_TOKEN` in Kubernetes secrets. In PHP code it can be accessed like this:

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

#### Links {#links}

* [Storing environment variables in GitHub Secrets](https://github.com/trustedlogin/trustedlogin-ecommerce/settings/secrets/actions) Application secrets, including the Vault SaaS token, are stored in GitHub secrets, which are pulled into Kubernetes during deployment.
* [Setting variables using Helm](https://github.com/trustedlogin/trustedlogin-ecommerce/blob/master/.github/workflows/on-merge-deploy-to-prod.yml#L75) Environment variables are defined by Helm charts during deployment.

Only project admin can modify GitHub secrets.

#### Notes {#notes}

Access to environment secrets is limited to GitHub admins.
