# Help Scout App

Note: The TrustedLogin Help Scout app only works when a license key is passed using [the `auth/license_key` configuration setting](../Client/configuration).

The email in Help Scout is matched against active licenses on your website. If matching licenses are found, the license key is used as a search key for access that has been granted. 

The Help Scout app currently supports Easy Digital Downloads Software Licensing. Other integrations are available upon request.

---

:::tip

Help Scout released a new Apps platform in August 2023. We are planning on supporting this in the near future, but for now, the TrustedLogin Help Scout integration requires you [create a Legacy Dynamic App](https://secure.helpscout.net/apps/custom).

:::

## Create a [Custom Help Scout App](https://secure.helpscout.net/apps/custom) {#create-a-custom-help-scout-app}

[Click this link to create a Legacy Dynamic App](https://secure.helpscout.net/apps/custom).

On this page, click on the Create App button.

![Create App button in the left sidebar](/img/vendor/help-scout/step-03.png)

Now, switch to your website where you're running the TrustedLogin Connector plugin.

## Grab the configuration values from the TrustedLogin plugin {#grab-the-configuration-values-from-the-trustedlogin-plugin}

If you haven't added any teams to the TrustedLogin Connector plugin yet, [do that first!](../01-intro)

Then, on the TrustedLogin Teams page, click on the Configure Help Desk link.

![Inside the WordPress admin, with TrustedLogin "Teams" sub-menu selected and a teams list layout showing](/img/vendor/help-scout/step-04.png)

Copy the Secret Key and Callback URL from the "Configure Help Desk" popup. 

![A modal showing the Secret Key and Callback URL fields, both with copy icons next to them](/img/vendor/help-scout/step-05.png)

## Switch back to Help Scout {#switch-back-to-help-scout}

After switching back to Help Scout, paste the Secret Key and Callback URL into the Help Scout Custom App inputs of the same name:

!["Custom App" form with App Name, Content Type, Callback URL, Secret Key, Debug Mode, and Inboxes fields](/img/vendor/help-scout/step-06.png)

:::caution

If you don't see the "Content Type" dropdown, Help Scout is not running Legacy Dynamic Apps. Make sure you're using [this link](https://secure.helpscout.net/apps/custom) to create your Help Scout App.

:::

Save the app and navigate to a Help Scout ticket.

## The TrustedLogin widget {#the-trustedlogin-widget}

Now, in the sidebar, you'll see the TrustedLogin widget.

![](/img/vendor/help-scout/step-07.png)

When someone grant access to their site who has an email associated with a license key, the widget will show a link to "Access Website".

Click that link to be automatically redirected into your customers' site!

![A close-up of the TrustedLogin widget, showing "Access Website" link and "License is active" text](/img/vendor/help-scout/step-08.png)
