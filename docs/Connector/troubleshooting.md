---
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Login attempts fail with "Cannot reach [domain]" error

If you see an error message like "Cannot reach www.example.com" when attempting to log into a Client site, this indicates a DNS resolution issue preventing the Connector from reaching the Client site.

### Why this happens

The Connector plugin makes a POST request to the domain name stored in the Client's WordPress configuration. This can fail when:

1. **Testing staging/development servers** - The Client site is on a staging server (e.g., `192.168.1.100`) but DNS resolves the domain to production (e.g., `203.0.113.10`)
2. **Server migrations** - Testing on a new server before DNS has been updated
3. **Local development** - Using production domains in Local, DDEV, or Docker environments
4. **Network restrictions** - Firewall or VPN blocking access to the Client site

### The solution: Hosts file configuration

**For staging/development testing**, you need to override DNS on your local machine (the machine running the Connector plugin) to point the domain to the correct IP address.

#### Step 1: Identify the target IP

Determine the IP address of the server where the Client site is actually running:

```bash
# Ask the site owner/developer for the staging server IP
# For example: 192.168.1.100
```

#### Step 2: Verify the domain

Check what domain the Client's WordPress is configured to use:

```bash
# On the Client site server
wp option get siteurl

# Example output: https://www.example.com
```

**Important:** Note whether the domain includes `www.` or not. This matters! (See [www vs non-www](#www-vs-non-www) below)

#### Step 3: Edit your hosts file

**On your machine (the support person's machine running the Connector), not on the server:**

**Mac/Linux:**
```bash
sudo nano /etc/hosts
```

**Windows:**
```
Run Notepad as Administrator, then open:
C:\Windows\System32\drivers\etc\hosts
```

#### Step 4: Add the entry

Add this line to the hosts file:
```
192.168.1.100 example.com www.example.com
```

Replace:
- `192.168.1.100` with the actual staging/dev server IP
- `example.com` with the Client site's actual domain

:::tip Best Practice
Include **both** www and non-www variants in the same line:
```
192.168.1.100 example.com www.example.com
```
This ensures it works regardless of how WordPress is configured.
:::

#### Step 5: Save and test

**Mac/Linux:**
```bash
# Save the file (Ctrl+O, then Ctrl+X in nano)

# Flush DNS cache (Mac)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Verify it works
ping www.example.com
# Should show: 192.168.1.100
```

**Windows:**
```bash
# Save the file

# Flush DNS cache
ipconfig /flushdns

# Verify it works
ping www.example.com
# Should show: 192.168.1.100
```

### www vs non-www {#www-vs-non-www}

DNS treats `www.example.com` and `example.com` as **completely different hostnames**. Your hosts file entry must match the exact domain that WordPress is configured to use.

#### Why it matters

WordPress stores ONE canonical URL:
- Either `https://www.example.com` (with www)
- Or `https://example.com` (without www)

The Client SDK sends this **exact** URL in the encrypted envelope. When the Connector POSTs to log in, it uses that exact hostname.

#### Common mistake

**If WordPress is configured as:**
```
https://www.example.com  ← Note the www
```

**But your hosts file only has:**
```
192.168.1.100 example.com  ← Missing www
```

**Result:** Login fails because:
- Connector POSTs to `www.example.com`
- Your hosts file only resolves `example.com` (without www)
- DNS treats these as different hosts
- The POST fails to resolve the correct hostname

#### The fix

**Always include both variants:**
```
192.168.1.100 example.com www.example.com
```

This way it works regardless of WordPress configuration.

### Verifying your configuration

After configuring the hosts file, verify it's working:

```bash
# 1. Check DNS resolution
ping www.example.com
# Should show your staging IP: 192.168.1.100

# 2. Test HTTP connection
curl -I https://www.example.com
# Should connect to your staging server

# 3. Check in browser
# Open browser developer tools → Network tab
# Attempt TrustedLogin login
# Check the POST request - should go to your staging IP
```

### When to remove the hosts file entry

**Important:** After testing is complete, remove or comment out the hosts file entry:

```
# 192.168.1.100 example.com www.example.com
```

Otherwise, you'll continue accessing staging instead of production when you need to access the live site.

### Troubleshooting

#### Still can't connect after adding hosts file

**Check for typos:**
- Verify the IP address is correct
- Verify the domain matches WordPress exactly (including or excluding www)
- Check for extra spaces or formatting issues

**Verify hosts file syntax:**
```
IP_ADDRESS domain1 domain2 domain3
```

**Clear browser cache:**
- Hard refresh (Cmd+Shift+R or Ctrl+F5)
- Clear browser DNS cache
- Restart browser

**Check SSL certificate:**
If the staging server uses a different SSL certificate than the domain name, you may see SSL warnings. This is expected for staging environments. You can proceed past the warning for testing.

#### Multiple team members need access

Each person who needs to test TrustedLogin with the staging server must add the hosts file entry to their own machine. The hosts file is local to each computer.

**Share the configuration:**
```
# TrustedLogin Staging Access
192.168.1.100 example.com www.example.com
```

#### Connector shows different error messages

Recent versions of the Connector (v1.3.0+) automatically detect connectivity issues and provide specific guidance:

```
Cannot reach www.example.com

Add this line to /etc/hosts:
192.168.1.100 example.com www.example.com

IMPORTANT: Note the exact domain (includes www).
DNS treats 'www' and non-'www' as different hosts.
```

If you see this error, follow the instructions provided in the error message.

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
