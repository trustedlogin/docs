---
title: CLI
sidebar_position: 3
---
# Command Line Interface

Query the API using the command line interface.

## List All Accounts (teams) {#list-all-accounts-teams}
* List All Accounts
    * `php artisan accounts:list`

## Lists Sites {#lists-sites}
* List All Sites
    * `php artisan sites:list`
* List All Sites Belonging To A Specific Account
    * `php artisan sites:list 6`


## Add An Elasticsearch Index For Team {#add-an-elasticsearch-index-for-team}

* `php artisan team:index {team}`
* `php artisan team:index 6`
