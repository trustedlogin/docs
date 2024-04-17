---
title: Local Development
---
# TrustedLogin Connector Plugin Development

Plugin to interact with TrustedLogin's encrypted storage infrastructure to redirect support staff into an authenticated session on client installations.

## To Compile {#to-compile}

The plugin will need to be built. Here's how:

1. Change directories to the plugin directory (`cd /path/to/directory`)
1. Run `composer install --no-dev`

## Code Standards Installation {#code-standards-installation}

1. Change directories to the plugin directory (`cd /path/to/directory`)
1. Run `composer install` - this will also install the code standards directory
1. Run `./vendor/bin/phpcs`

## Local Development Environment {#local-development-environment}

A [docker-compose](https://docs.docker.com/samples/wordpress/)-based local development environment is provided.

- Start server
    - `docker-compose up -d`
- Acess Site
    - [http://localhost:6300](http://localhost:6100)
- Run WP CLI command:
    - `docker-compose run wp cli wp ...`
	- `docker-compose run wpcli wp db reset`

In the local development container, the constant `DOING_TL_VENDOR_TESTS` is set to true, as is `WP_DEBUG`.

### Running PHPUnit in Docker {#running-phpunit-in-docker}

There is a special phpunit container for running WordPress tests, with WordPress and MySQL configured.

- Enter container
    - `docker-compose run phpunit`
- Test
    - `phpunit`

### Server-to-Server HTTP Requests {#server-to-server-http-requests}

If the eCommerce app (the SaaS) is also running in `docker-compose`, this WordPress and the "web" service of app should be in `tl-dev` network. This allows you to make an HTTP request to the eCommerce app like this:

```php
$r = wp_remote_get( 'http://web:80', ['sslverify' => false] );
```

If this doesn't work, make sure a `tl-dev` network exists:

```bash
docker network ls
```

If it does not, create one:

```bash
docker network create tl-dev
```
