---
title: CI/CD
sidebar_position: 2
---
# Continuous Integration and Continuous Deployment (CI/CD)

Each pull request will trigger a build in ChipperCI for testing and a QA site on dev kubernetes cluster.

## What We Are Using {#what-we-are-using}

* [Digital Ocean](https://www.digitalocean.com/)
  * Hosts the app
  * Provides a QA environment for each branch on different non production cluster.
* GitHub
  * Hosts the code and issue tracker.
  * Runs automated testing.
* [PHPUnit](https://phpunit.de/)
  * Used for PHP tests, including browser tests.
    * [Laravel Testing Docs](https://laravel.com/docs/5.8/testing)
    * [Browser Testing Docs](https://laravel.com/docs/5.8/dusk)

## GitHub {#github}

Whenever you push to a branch containing an open pull request:

1. GitHub Actions will run tests using PHPUnit. These include unit/integration tests as well as browser tests using Dusk.
2. Platform will deploy an environment that you can use for manual QA and testing.

## Kubernetes + Github Actions

We utilize GitHub Actions in conjunction with Helm to deploy application code to a production-grade Kubernetes cluster. Upon creating a pull request, a new QA environment is generated, and its URL is accessible based on your GitHub branch name. Developers conduct testing in the dev/test environment, undergo peer review.

### Deploying to Master {#deploying-to-master}

To deploy to master, merge any open PR to master. Upon approval, the code is merged into the master branch. Subsequently, the CI/CD process initiates, deploying the code to the production Kubernetes cluster.

### Troubleshooting kubernetes deploy issues. {#troubleshooting-kubernetes-deploy-issues}

If a pull request does _not_ create a new build in dev kubernetes, there are a few reasons to look at first:

1. Check if docker build for the application succeeded.
2. Check if all the necessary infrastructure is created in a namespace related to your git branch in the dev cluster.
3. Check if the deploy stage succeeded in github actions.