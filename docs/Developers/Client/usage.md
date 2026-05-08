---
title: Using TrustedLogin
sidebar_label: Using TrustedLogin
sidebar: auto
sidebar_position: 7
---

## Requesting access from customers

Now that you've installed the TrustedLogin SDK into your plugin or theme, you can start requesting access from your customers. There are a few ways to do this:

### 1. Point customers to the Grant Support Access page on their own site

There's an easy way to do this: point them to their own login screen, with extra parameters that turns the login screen into a TrustedLogin "Grant Support Access" screen:

**`https://example.com/wp-login.php?action=trustedlogin&ns=YOUR-NAMESPACE`**

Replace `example.com` with the customer's domain and `YOUR-NAMESPACE` with the namespace you set up in the [TrustedLogin configuration](/Client/configuration).

If you are using a support system that allows for dynamic variables, you can also pass a reference ID to the URL, making it easier to connect the Grant Access request to this specific support ticket: Add `&ref=YOUR-REFERENCE-ID` to the URL.

#### Automating requests with Help Scout

We suggest setting up Saved Replies in Help Scout that include the dynamic URL to the Grant Support Access screen. The URL in the saved reply can be dynamically generated so that The variable `{%conversation.number%}` will be replaced with the conversation number.

Here's a Saved Reply template you could use in Help Scout (update `YOUR-NAMESPACE` with the appropriate values for your setup):

```html
Please <a href="https://example.com/wp-login.php?action=trustedlogin&amp;ns=YOUR-NAMESPACE&amp;ref={%conversation.number%}">visit this page on your website [UPDATE THE DOMAIN]</a> and click "Grant Pro Block Builder Access". That will grant us temporary access to your site so that we can assist you with this issue.<br>
```

Note: There's currently no way for Help Scout to dynamically insert the customer's URL, so you'll need to manually update the domain in the saved reply. We added an `[UPDATE THE DOMAIN]` reminder: the customer support agent will need to change the URL to match the customer's domain. Once the domain is updated, the agent can remove the `[UPDATE THE DOMAIN]` reminder. 

![Help Scout Saved Reply](/img/client/saved-reply.png)

### 2. Integrating with your support form

If you have a support form on your website, you can add a TrustedLogin field to proactively request access support while customers are creating their support ticket. This is a great way to streamline the process and make it easier for customers to grant access.

We are in the process of creating TrustedLogin integrations with the following WordPress form plugins: 

- Gravity Forms
- WS Form
- Ninja Forms
- WPForms
- Formidable Forms
- Contact Form 7
- Forminator
- Fluent Forms
- Elementor Forms

If you are using one of these form plugins, you can expect an update soon that will allow you to add a TrustedLogin field to your support form.

## Adding reference IDs to Grant Access requests {#reference-ids}

Reference IDs are useful when you want to attach a specific ticket ID or conversation ID to a login.

Reference IDs can be passed via URL like so: `wp-login.php?action=trustedlogin&ns={namespace}&ref=[123]`

When a Reference ID exists, users will see the reference while granting access:

![Reference ID is shown below the footer links in the Grant Access screen](/img/client/reference-id.png)
