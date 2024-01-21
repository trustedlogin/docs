---
title: Server Setup
sidebar: auto
sidebar_position: 2
---

# TrustedLogin SaaS (Hosted Application)

The TrustedLogin application is powered by Laravel and run on a Dockerized, high-availability, Kubernetes cluster.

The application handles account management, profiles, and billing. But most important, it receives and processes requests from the [Client SDK](/Client/intro) and [Vendor plugin](/Vendor/intro).

## What software powers TrustedLogin? {#what-software-powers-trustedlogin}

| Software              | URL                                                         | Description                       |
|-----------------------|-------------------------------------------------------------|-----------------------------------|
| Helm                  | https://helm.sh/                                            | Kubernetes deployment             |
| Docker                | https://www.docker.com/                                     | Container management              |
| Kubernetes            | https://kubernetes.io/                                      | Container orchestration           |
| Traefik               | https://traefik.io/                                         | Load balancing & reverse proxy    |
| Jetstack Cert Manager | https://github.com/jetstack/cert-manager                    | Kubernetes certificate management |
| Laravel               | https://laravel.com/                                        | Web application framework         |
| Laravel Spark         | https://spark.laravel.com/                                  | Billing & portal                  |
| Laravel Dusk          | https://dusk.laravel.com/                                   | Acceptance tests                  |
| Guzzle                | https://packagist.org/packages/kozz/laravel-guzzle-provider | HTTP client                       |
| Hashicorp Vault       | https://www.vaultproject.io/                                | Key management                    |
| Elasticsearch         | https://www.elastic.co/products/elasticsearch               | Log search                        |
| Kibana                | https://www.elastic.co/products/kibana                      | Log analysis                      |
| Velero                | https://velero.io                                           | Backup                            |
| MySQL                 | https://www.mysql.com/                                      | Database                          |
| Datadog               | https://www.datadoghq.com/                                  | Log aggregation                   |
| Redis                 | https://redis.io/                                           | Caching                           |
| Prometheus            | https://prometheus.io/                                      | Metrics & alerting                |



## Additional information {#additional-information}

### [Helm](https://github.com/helm/helm) {#helm}

The TrustedLogin Kubernetes deployment is structured using Helm.

### [Kubernetes](https://kubernetes.io/) {#kubernetes}

The application is hosted on [managed DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes/) ("DOKS").

### [Traefik](https://traefik.io) {#traefik}

Traefik acts as a reverse-proxy load balancer.

- Redirects requests from http to https
- To restrict access based on IP addresses
- Routes traffic various services within Kubernetes account to url requested

### [Hashicorp Vault](https://www.vaultproject.io) {#hashicorp-vault}

TrustedLogin uses Vault as a key management system. It is configured with three fallback nodes to provide high-availability. Vault is configured to be auto-unsealing.

### [Velero](https://velero.io) {#velero}

Velero backs up the Kubernetes deployment every six hours to Digital Ocean Spaces. We maintain backups for 3 days (72 hours).

### [Laravel Spark](https://spark.laravel.com) {#laravel-spark}

The eCommerce and public-facing UI are powered by Laravel Spark.

### [MySQL](https://www.mysql.com) {#mysql}

The Laravel Spark database uses Digital Ocean Managed MySQL with High Availability. Account, profile, and and Stripe billing metadata are stored in MySQL.

### [Elasticsearch](https://www.elastic.co/products/elasticsearch) {#elasticsearch}

Logs stripped of PII are added to Elasticsearch for later analysis. [See Elasticsearch documentation](/SaaS/elasticsearch) for more information.

### [Redis](https://redis.io/) {#redis}

Laravel uses redis as a caching mechanism for temporary data storage to speed up the process of performing database queries and getting feedback, which will, in turn, reduce the amount of time spent pulling up data. Our applicaiton relies on Digital Ocean fully managed redis instance in high availability mode.
