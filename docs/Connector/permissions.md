---
title: Permissions
sidebar_position: 2
---

# Permissions

The Permissions matrix decides which TrustedLogin features each WordPress role can use. It lives in the sidebar at **TrustedLogin → Permissions** and looks like a grid: one row per role, one column per capability, every cell a `Granted` / `Denied` toggle.

![The Permissions matrix on a fresh install — Administrator row all granted (and locked); Editor, Author, Contributor, and Subscriber rows all denied.](/img/vendor/permissions/01-overview.png)

If you've used the plugin before version 1.4 you'll remember a single `approved_roles` setting per team. That gate has been replaced with a real role-based capability system that's auditable, decomposable, and safe by default. Existing teams are migrated automatically — see [Upgrading from `approved_roles`](#upgrading-from-approved_roles) below.

## Why fine-grained permissions exist

A typical agency has a handful of people with very different jobs:

- A **billing manager** needs to look up which client got a support session last week, but should never sign in to a client site themselves.
- A **support lead** signs in to client sites, manages secrets shared with vendors, and reviews activity.
- A **junior support agent** can create new secrets, but shouldn't be able to revoke existing ones their colleagues are using.
- An **integrator** just needs to add and remove team configurations during onboarding — no live access required.

Before 1.4 there was one switch (the role appeared in `approved_roles`, or it didn't). Now each of those jobs gets exactly the access it needs.

---

## The four capabilities

Every TrustedLogin capability is prefixed with `trustedlogin_` and granted at the role level (so users with the role inherit the cap). The matrix surfaces all of them:

### Sign in to client sites (`trustedlogin_decrypt_messages`)

The sensitive one. Lets the user submit an access key on the **Access Key Log-In** page and assume the support role on a customer site. This is the cap that turns a Connector user into a live operator on someone else's WordPress install. Grant it deliberately.

### View login activity (`trustedlogin_view_activity`)

Unlocks the **Login Activity** page. Holders can see the full history of support logins — which agent, which client site, when, and what for — but cannot trigger new logins or change anything else. Read-only by design.

### Create secrets (`trustedlogin_create_secret`)

Lets a user generate new one-time secrets from the Secrets page. Strictly weaker than **Manage secrets**: holders can create, but cannot view, edit, or revoke existing secrets. Useful for support agents who need to issue access on demand without being trusted to revoke a colleague's active secret.

### Manage secrets (`trustedlogin_manage_secrets`)

Full control over the Secrets page: create, view, and revoke. A user with `manage_secrets` does not automatically get `create_secret` and vice versa — they're two independent toggles, and the Secrets page opens for either one.

> **What about managing teams?**
> Team configurations live on the **Teams** sub-page, which is restricted to WordPress administrators (`manage_options`) — there's no delegated cap for it on the matrix. Team records hold the SaaS API keypair, webhook secrets, and approved-roles list; anyone who can edit them can effectively impersonate the team to clients. That sensitivity profile matches the Permissions page itself, so both are admin-only by the same rule.

---

## The Administrator row is always granted

Every role is editable except **Administrator**. The matrix renders that row with a slightly darker background and the cells are disabled.

![Administrator row close-up — every cell is Granted and disabled, with a slightly darker background that distinguishes it from editable rows.](/img/vendor/permissions/02-admin-row.png)

There are two reasons:

1. **No last-admin lockout.** Revoking the wrong cap from administrators could lock the only person with `manage_options` out of pages they need. The plugin is supposed to be recoverable, not bricked, by a misclick on the Permissions page.
2. **Activation re-grants.** On every plugin version bump, the Connector calls `Capabilities::activate()` which re-grants every TL cap to administrators. Letting you toggle the admin row would create a UI that flips back on the next update.

The server enforces both rules independently — even a forged REST request that names the administrator role and a real cap is rejected with `immutable_role`. The matrix also defends against unicode-homoglyph names like `аdministrator` (Cyrillic `а`); after `sanitize_key()` they collapse to nothing and the request is rejected.

---

## What the matrix does on the wire

When you click a cell, the panel does an **optimistic flip**: the UI updates immediately so the click feels responsive, then it sends the change to `POST /wp-json/trustedlogin/v1/permissions`. If the server rejects (unknown cap, immutable role), the cell rolls back and an inline error explains why. On success, the cell briefly flashes green so you have explicit confirmation the change was saved — not just registered.

The endpoint:

- **gates on `manage_options`** — only WordPress admins can change permissions, period. Holding `trustedlogin_view_activity` is not enough; nor is holding every TL cap stacked together. The Permissions page is for full WP admins only.
- **rejects any cap not in the allowlist** — only the four caps above can be granted via this endpoint, regardless of what's in the request body. You cannot use the Permissions endpoint as a generic "grant arbitrary WP cap" primitive.
- **fires `trustedlogin/connector/capabilities/changed`** on every successful change so audit-log plugins (or your own observers) see the role, cap, granted-or-revoked state, and the user ID of the actor.

---

## Upgrading from `approved_roles`

If you installed the Connector before 1.4 you used a per-team `approved_roles` array to decide who could sign in to client sites. On the first request after upgrading to 1.4 the plugin runs a one-shot migration:

- For every role that appeared in any team's `approved_roles`, it grants `trustedlogin_decrypt_messages`.
- It records a flag option (`trustedlogin_connector_approved_roles_migrated`) so the migration runs **exactly once**.
- It fires `trustedlogin/connector/capabilities/changed` for each grant, with actor ID `0` (system).
- If you've already revoked `decrypt_messages` from a role explicitly, the migration won't undo that — it only grants where the cap is missing.

After migration the access-key login flow checks **both** the team's role list and the cap. Before, either path admitted the user (effectively `OR`). After, both must pass (`AND`) — but because every role that previously cleared `approved_roles` now also holds `decrypt_messages`, no existing user is cut off.

To verify the migration ran:

```
wp option get trustedlogin_connector_approved_roles_migrated
```

The value is the timestamp it completed.

---

## Submenu visibility

The TrustedLogin sidebar entries automatically follow the matrix. A role with **only** `trustedlogin_view_activity` sees just the Login Activity sub-page. A role with **only** `trustedlogin_decrypt_messages` sees just Access Key Log-In. The Settings, Teams, and Permissions sub-pages all require WordPress's `manage_options` cap — those are admin-only regardless of the matrix.

If a user has zero TL caps, the entire **TrustedLogin** sidebar entry is hidden from them.

---

## Choosing a default landing page

Each admin can set the default landing page for the **TrustedLogin** menu under Settings. The choices are: Settings (default), Teams, Secrets, Login Activity, Access Key Log-In, Permissions. If you've granted a non-admin user a single TL cap, they automatically land on the page that cap unlocks — they don't have to navigate from Settings (which they can't read) to find the page they can use.

The fall-through priority for users with multiple caps is: Activity → Secrets → Access Key. So a support lead with both `view_activity` and `manage_secrets` lands on Activity (the page they're most likely to start their day on), while a junior agent with only `create_secret` lands on Secrets.

---

## Filters for integrators

If you ship an extension that needs its own grantable cap, hook the labels filter:

```php
add_filter(
    'trustedlogin/connector/capabilities/labels',
    function ( $labels ) {
        $labels['trustedlogin_export_audit_log'] = array(
            'label'       => __( 'Export audit log', 'my-extension' ),
            'description' => __( 'Download the full audit log as CSV.', 'my-extension' ),
        );
        return $labels;
    }
);
```

Three rules the filter enforces:

1. **The slug MUST start with `trustedlogin_`.** Any other prefix is silently dropped before the matrix renders. This is the allowlist — the Permissions endpoint only mutates caps it knows about, and a non-prefixed cap can't be in the allowlist.
2. **You cannot widen the allowlist to core WP caps** like `manage_options` or `install_plugins`. Even if you return them from the filter, they're stripped. The Permissions UI is not a generic "grant any WP cap" primitive by design.
3. **You handle the cap check yourself in your extension.** The Connector exposes the cap on the matrix and serves the toggle; the actual permission check (`current_user_can( 'trustedlogin_export_audit_log' )`) is yours.

To audit every change:

```php
add_action(
    'trustedlogin/connector/capabilities/changed',
    function ( $role_slug, $cap, $granted, $actor_id ) {
        // $actor_id is 0 for system actions (migration), otherwise a user ID.
        my_audit_log()->record( $role_slug, $cap, $granted, $actor_id );
    },
    10,
    4
);
```

---

## Common scenarios

**"I want a billing manager to see who logged into what client and when, nothing else."**
Grant `trustedlogin_view_activity` to the role they hold (or create a custom role for them). They'll see only the Login Activity sub-page in the TrustedLogin menu.

**"My support lead needs to do everything except change team configuration."**
Grant `trustedlogin_view_activity`, `trustedlogin_manage_secrets`, and `trustedlogin_decrypt_messages`. Team configuration is restricted to WordPress administrators by default; nothing on the matrix can grant it to a non-admin.

**"I want a junior agent to issue support links but never revoke anyone else's."**
Grant `trustedlogin_create_secret`. Leave `trustedlogin_manage_secrets` denied. They'll see the Secrets page but only the Create form.

**"I need to take away client-site access from a role immediately."**
Click `Denied` on the **Sign in to client sites** column for that role. Any active session in flight finishes (the SaaS-issued access key is what carries the authorization, not the role check), but the user can't submit any new access key.

---

## Troubleshooting

**A cell is disabled and I can't tell why.**
The Administrator row is locked by design — hover the cell for the "Administrator always has every TrustedLogin permission" tooltip. No other rows are disabled in normal use.

**The toggle clicks but the green flash never appears.**
Check the inline error banner above the table. If it's empty, your browser may be blocking the request — open the network tab and look at the `POST /wp-json/trustedlogin/v1/permissions` response.

**A user keeps losing access after every plugin update.**
Administrators always get every cap re-granted on update by design (see "The Administrator row"). For other roles, the matrix is the source of truth — caps you've revoked stay revoked across updates. If you're seeing re-grants on a non-admin role, check the audit hook for `actor_id = 0` events; that's the migration, and it only runs once per install.

**The migration didn't grant a role I expected.**
The migration only runs if the option `trustedlogin_connector_approved_roles_migrated` is empty. If you ran it once, deleted some grants, then upgraded again, those grants stay deleted. To force a re-migration (for example, in a staging install):

```
wp option delete trustedlogin_connector_approved_roles_migrated
```

Then visit `wp-admin` once. Don't do this on production unless you're sure — it will re-grant `decrypt_messages` to every role that's still in any team's `approved_roles`.
