# Elasticsearch

Elasticsearch is used to log access and usage data, as well as to display that data in the UI.

## Servers {#servers}

For production, set environment variable for `ELASTIC_SEARCH_HOST` to URL for Elasticsearch instance, with basic auth credentials in URL. The default is the docker-compose URL.

### Local Development {#local-development}

Elasticsearch is included in the local docker-compose environment. Inside of Docker use http://elasticsearch:9200 to connect.

### Production {#production}

The production Elasticsearch is at https://elasticsearch.trustedlogin.com

## Clients And Services {#clients-and-services}


`App\Http\Clients\ElasticSearch` is an HTTP client for Elasticsearch, which is decopupled from TrustedLogin's business logic. `App\Services\ElasticSearchTeamData` uses that client. It provides methods for writing and searching team data, as well as methods for creating and updating team indexes.

### Dependency Injection {#dependency-injection}

All of this is setup in `App\Providers\ElasticSearchProvider`, so you can type hint the interface `App\Contracts\ElasticSearchTeamData` to inject the server.

In most Laravel controller, you can bind that service to the constructor of

```php
<?php

namespace App\Http\Controllers;

use App\Contracts\ElasticSearchTeamData;


class LoginReportController extends Controller
{
    protected ElasticSearchTeamData $esClient;
    public function __construct( ElasticSearchTeamData $esClient)
    {
        $this->esClient = $esClient;
    }

    public function endpoint(Team $team){
        //Add an array of data to the log.
        //Must use an "eventType" field.
        $this->esClient->writeDataForTeam(
            $team,
            [
                //always set eventType!
                'eventType' => ElasticSearchEventTypes::SOMETHING_YOU_ADDED,
                //add other stuffs
                'sandwich' => 'special',
                'drinks' => ['seltzer',
                    ['coke' => 'diet' ]
                ],
            ]
        );

    }

    public function endpointThatLogsLogin(Team $team, Site $site){


        //Log a login to a site
        $this->esClient->logLogin(
            $team,
            $site,
            now()//optional, carbon instance, default is now()
        );
    }
}
```

### Event Types {#event-types}

The search queries that the `ElasticSearchTeamData` service makes assume a meaningful "eventType" column is in the data for the index. So, when logging data for a team, you need to add an eventType.

Event types must be registered in `ElasticSearchEventTypes`. Before adding a new event type, add a constant to that class with the name. Then add that constant to the array in the `getTypes()` method.
