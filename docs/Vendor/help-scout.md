# Help Scout App

Note: The TrustedLogin Help Scout app only works when a license key is passed using [the `auth/license_key` configuration setting](../Client/configuration).

The email in Help Scout is matched against active licenses on your website. If matching licenses are found, the license key is used as a search key for access that has been granted. 

The Help Scout app currently supports Easy Digital Downloads Software Licensing. Other integrations are available upon request.

---

## First, contact Help Scout customer support

:::tip

Help Scout released a new Apps platform in August 2023. We are planning on supporting this in the near future, but for now, the TrustedLogin Help Scout integration requires the Legacy Dynamic Apps be enabled for your account.

:::

To use the TrustedLogin Help Scout app, you will need Legacy Dynamic Apps enabled. To have them enabled, contact Help Scout support.

Here's how to contact Help Scout support:

1. In your Help Scout account, click the ? icon in the top-right corner.
1. Click on Get Help to open the Beacon widget
1. Click on the "Ask" tab in the Beacon
1. Click on either Email or Chat to start a new conversation 
1. Write "Please enable Legacy Dynamic Apps for my account."

Once Help Scout has confirmed that your account has been enabled, continue with the instructions!

## Go to Help Scout Apps

In Help Scout, open the Manage menu.

Click on the Apps submenu.

![Screenshot of the Help Scout Manage dropdown with the Apps menu highlighted](/img/vendor/help-scout/step-01.png)

Click on the Create button in the top-right of the page.

![A button labeled Create next to Quick Search](/img/vendor/help-scout/step-02.png)

On the new page, click on the Create App button.

![Create App button in the left sidebar](/img/vendor/help-scout/step-03.png)

Now, switch to your website where you're running the Vendor plugin.

## Grab the configuration values from the TrustedLogin plugin

If you haven't added any teams to the Vendor plugin yet, [do that first!](../01-intro)

Then, on the TrustedLogin Teams page, click on the Configure Help Desk link.

![Inside the WordPress admin, with TrustedLogin "Teams" sub-menu selected and a teams list layout showing](/img/vendor/help-scout/step-04.png)

Copy the Secret Key and Callback URL from the "Configure Help Desk" popup. 

![A modal showing the Secret Key and Callback URL fields, both with copy icons next to them](/img/vendor/help-scout/step-05.png)

## Switch back to Help Scout

After switching back to Help Scout, paste the Secret Key and Callback URL into the Help Scout Custom App inputs of the same name:

!["Custom App" form with App Name, Content Type, Callback URL, Secret Key, Debug Mode, and Mailboxes fields](/img/vendor/help-scout/step-06.png)

:::caution

If you don't see the "Content Type" dropdown, Help Scout is not running Legacy Dynamic Apps. Contact Help Scout support to enable.

:::

Save the app and navigate to a Help Scout ticket.

## The TrustedLogin widget

Now, in the sidebar, you'll see the TrustedLogin widget.

![](/img/vendor/help-scout/step-07.png)

When someone grant access to their site who has an email associated with a license key, the widget will show a link to "Access Website".

Click that link to be automatically redirected into your customers' site!

![A close-up of the TrustedLogin widget, showing "Access Website" link and "License is active" text](/img/vendor/help-scout/step-08.png)
