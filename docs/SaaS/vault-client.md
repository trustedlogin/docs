# Vault API Client

The Vault API client is used to make HTTP requests to the Vault instance.

## Team Key Store {#team-key-store}

### Creation of the Keystore {#creation-of-the-keystore}

When an account is created, Spark's `TeamCreated` event fires. A keystore is created in Vault with the slug column from the team model used as the namespace in Vault.

### Creation Of The Keystore Policies {#creation-of-the-keystore-policies}
Then three policies are created for the at key store. 

The first, "The Write Policy" is created with create, read and delete capabilities. The policy name is `<namespace>-write-policy`.

A second policy "The Delete Policy" is created with the capability of delete.  The policy name is `<namespace>-delete-policy`.

A third policy, which completes the trilogy, "The Read Token" is created with the read capability. The policy name is `<namespace>-read-policy`.

### The Keystore Tokens {#the-keystore-tokens}
This also schedules a job to update the team's tokens. This job will repeat once a day.

The job that updates the team's tokens is concerned with three tokens. The first token, "The Write Token" uses the write policy. The second token, "The Delete Token" uses the delete policy. The third token, "The Read Token" used the read policy.

#### Access Team Tokens {#access-team-tokens}

**PHP**

```php
use \App\Team;
$team = Team::find(42);
$deleteToken = $team->deleteToken();
$writeToken = $team->writeToken();
```