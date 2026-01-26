---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Cannot reach Client site (staging/development only) {#cannot-reach-staging}

:::note Development/Testing Only
This section only applies when testing TrustedLogin on staging/development servers. Production usage doesn't require this configuration.
:::

If you see "Cannot reach [domain]" when testing on a staging server that uses a production domain name, you need to configure your hosts file.

### Quick fix

Edit your hosts file **on your machine** (the support person's computer):

**Mac/Linux:** `sudo nano /etc/hosts`
**Windows:** `C:\Windows\System32\drivers\etc\hosts` (as Administrator)

Add this line:
```
192.168.1.100 example.com www.example.com
```

Replace `192.168.1.100` with your staging server IP and `example.com` with the actual domain.

### Why this is needed

When staging uses a production domain but runs on a different IP than DNS points to, your browser needs to know where to connect. The hosts file overrides DNS locally.

### Important notes

- Include both www and non-www (DNS treats them as different hosts)
- Each team member needs their own hosts file entry
- **Remove this entry when done** or you can't access production normally
- Flush DNS cache after editing: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)

## Access key not working

If you enter an access key but receive an error like "Invalid access key" or "No matching sites found":

### Check the team/account selection

If you have multiple TrustedLogin accounts/teams configured in the Connector:
- Verify you selected the correct team from the dropdown
- The access key must match the team that the Client site granted access to
- Different products/teams have different encryption keys

### Verify the access key

- Access keys are exactly 64 characters long
- Check for copy/paste errors (extra spaces, line breaks)
- Keys are case-sensitive
- Keys expire after the configured access period (default: 7 days)

### Check the Client site

On the Client site, verify:
- Access was actually granted (check the TrustedLogin admin screen)
- The access hasn't been revoked
- The access period hasn't expired
- The Client site can reach the TrustedLogin SaaS (https://app.trustedlogin.com)

## Access key login shows "Redirecting..." but never completes

This usually indicates the POST request to the Client site failed.

**Common causes:**
1. **DNS/hosts file issue** - See [Cannot reach domain](#login-attempts-fail-with-cannot-reach-domain-error) above
2. **Firewall blocking POST request** - Check firewall rules
3. **Client SDK not initialized** - Client SDK must be initialized early enough (see [Client troubleshooting](/Client/troubleshooting))
4. **Network timeout** - Client site takes too long to respond

**Check browser console:**
Open browser developer tools (F12) and check the Console tab for errors like:
- `net::ERR_NAME_NOT_RESOLVED` - DNS issue, use hosts file
- `net::ERR_CONNECTION_REFUSED` - Server not responding on that IP
- `net::ERR_CONNECTION_TIMED_OUT` - Network timeout, check firewall/routing

## Help Scout integration not working

See [Help Scout integration documentation](./help-scout) for specific troubleshooting steps.
