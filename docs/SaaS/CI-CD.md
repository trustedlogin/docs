---
title: CI/CD
sidebar_position: 2
---
# Continuous Integration and Continuous Deployment (CI/CD)

Each pull request will trigger a build in ChipperCI for testing and a QA site on Platform.sh.

## What We Are Using {#what-we-are-using}

* [Platform.sh](https://platform.sh)
  * Hosts the app
  * Provides a QA environment for each branch.
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

## Platform.sh + GitHub {#platformsh--github}

We are using the [platform GitHub integration](https://docs.platform.sh/administration/integrations/github.html). When you create a pull request, a new QA environment is created. You can access its URL from the Platform.sh UI or clicking the link in the PR's status check sections.

### Deploying to Master {#deploying-to-master}

To deploy to master, merge any open PR to master. Platform handles the rest.
 
### Troubleshooting Platform.sh deploy issues. {#troubleshooting-platformsh-deploy-issues}

If a pull request does _not_ create a new build in Platform, there are a few reasons to look at first:

1. Are there more environments than the plan supports? There can only be 3 QA environments at once.
1. Application resources exceed the plan. You might fix this by [adjusting service size](https://docs.platform.sh/configuration/app/size.html)
1. There is a syntax error in [platform.yml](https://docs.platform.sh/configuration/)


