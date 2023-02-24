---
title: Data Storage
---

# Data Storage

## Application {#application}

The following PII (or potentially identifiable) data is stored in the MySQL database: 

- The site URL where access has been granted
- The license key of software connected to granted access
- User data
  - Email
  - Phone
  - Address

## Application Logs {#application-logs}

Logs are sent to [Papertrail](https://papertrailapp.com).

PII sent to Papertrail includes: 

- The URL of the website where access has been granted
  - The User ID of the user who granted access
- The IP address of the support person logging into sites using the Site Access Key

## Backups {#backups}

Kubernetes cluster backups are kept for 3 days (72 hours), then are deleted. 

Backups are managed using Velero and are stored on Digital Ocean Spaces.

## Data Retention {#data-retention}

Please refer to Our [Privacy Policy](https://www.trustedlogin.com/privacy-policy/#retention) for details.