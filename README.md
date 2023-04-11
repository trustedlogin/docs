# TrustedLogin Docusaurus Site

This is the source for the TrustedLogin documentation site. It is built using [Docusaurus 2](https://v2.docusaurus.io/).

The docs themselves are inside the `/docs` folder.

## To release updates

Run the following command to deploy the site to GitHub Pages:

```bash
GIT_USER=<GITHUB_USERNAME> npx docusaurus deploy
```

See [the Docusaurus docs](https://docusaurus.io/docs/deployment#deploy) for more information.

## Annoying errors

### Node.js version not met

If you get the `[ERROR] Minimum Node.js version not met :(` error, you'll need to switch the Node version. Hopefully, you've already [installed nvm](https://github.com/nvm-sh/nvm#installing-and-updating). If not, do that first, then run:

```bash 
nvm use 16.14
```

### Error: Running "git push" command failed.

> Does the GitHub user account you are using have push access to the repository?

The Docusaurus docs say to do this, but it doesn't always work. If you get the "git push" error, try this instead:

```bash
GIT_USER=<GITHUB_USERNAME> USE_SSH=true yarn deploy
```

Okay, that still didn't work? Instead of using `USE_SSH`, try this instead. Make sure you're using your Personal Access Token, not your password.

```bash
GIT_USER=<GITHUB_USERNAME> GIT_PASS=<GITHUB_PERSONAL_ACCESS_TOKEN> yarn deploy
```
