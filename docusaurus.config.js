// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// Algolia DocSearch — only wire it up when all three credentials are
// present so local builds without a .env file don't fail theme validation.
// Set ALGOLIA_APP_ID / ALGOLIA_SEARCH_KEY / ALGOLIA_INDEX_NAME in
// `.env.local` (gitignored) or in the hosting project settings.
const algoliaConfig =
  process.env.ALGOLIA_APP_ID &&
  process.env.ALGOLIA_SEARCH_KEY &&
  process.env.ALGOLIA_INDEX_NAME
    ? {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_SEARCH_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        contextualSearch: true,
        searchPagePath: 'search',
      }
    : undefined;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TrustedLogin Docs',
  tagline: 'Democratizing security.',
  url: 'https://docs.trustedlogin.com/',
  baseUrl: '/',
  deploymentBranch: 'main',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,
  favicon: 'img/favicon.png',
  organizationName: 'trustedlogin',
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/trustedlogin/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // Adds <link rel="alternate" type="text/markdown" href="<path>.md"> on every
  // page so AI crawlers can auto-discover the raw Markdown form mirrored by
  // scripts/mirror-md.js. See /for-ai-tools for the full ingestion conventions.
  clientModules: [
    require.resolve('./src/clientModules/markdownAlternate.js'),
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Two redirect groups:
        //
        // 1. /SaaS/* → /Account/* — the section was renamed from
        //    "SaaS" (architecture jargon) to "Account" (what users
        //    actually call it). External links and search-engine
        //    indexes pointing at the old paths are preserved.
        //
        // 2. The internal-infrastructure pages (Vault, K8s secrets,
        //    deployment internals, etc.) that used to live in this
        //    section. Drafted out of production but old bookmarks
        //    still exist; they all collapse to /Account/intro now.
        //
        // GitHub Pages can't issue real HTTP 301s, so this plugin
        // emits a small HTML page at each `from` URL that meta-
        // refreshes + JS-navigates to `to`. Search engines treat it
        // as a redirect (SEO weight slightly less than a true 301,
        // but functional for users).
        redirects: [
          // Group 1: section rename, page-by-page identity map
          { from: '/SaaS/intro',                     to: '/Account/intro' },
          { from: '/SaaS/data-storage',              to: '/Account/data-storage' },
          { from: '/SaaS/subcontractors',            to: '/Account/subcontractors' },

          // Group 2: zombies, all to /Account/intro (preserved
          // typo entry for vault-sass-token covers an old misspelled
          // bookmark in the wild)
          { from: '/SaaS/vault-sass-token',          to: '/Account/intro' },
          { from: '/SaaS/vault-saas-token',          to: '/Account/intro' },
          { from: '/SaaS/vault',                     to: '/Account/intro' },
          { from: '/SaaS/vault-client',              to: '/Account/intro' },
          { from: '/SaaS/CI-CD',                     to: '/Account/intro' },
          { from: '/SaaS/server-setup',              to: '/Account/intro' },
          { from: '/SaaS/cli',                       to: '/Account/intro' },
          { from: '/SaaS/elasticsearch',             to: '/Account/intro' },
          { from: '/SaaS/webhooks',                  to: '/Account/intro' },
          { from: '/SaaS/user-remote-authentication', to: '/Account/intro' },

          // Drop the now-deprecated /Account/* internal pages too
          // (they remain on disk but should not surface as
          // navigable URLs once the audit-and-relocate follow-up
          // happens).
          { from: '/Account/vault-saas-token',       to: '/Account/intro' },
          { from: '/Account/vault',                  to: '/Account/intro' },
          { from: '/Account/vault-client',           to: '/Account/intro' },
          { from: '/Account/CI-CD',                  to: '/Account/intro' },
          { from: '/Account/server-setup',           to: '/Account/intro' },
          { from: '/Account/cli',                    to: '/Account/intro' },
          { from: '/Account/elasticsearch',          to: '/Account/intro' },
          { from: '/Account/webhooks',               to: '/Account/intro' },
          { from: '/Account/user-remote-authentication', to: '/Account/intro' },

          // Group 3: Guides moved from /Guides/* (top-level, drafted but
          // never published) into /Account/Guides/*. Redirects are
          // belt-and-suspenders for any leaked link.
          { from: '/Guides',                          to: '/Account/Guides' },
          { from: '/Guides/signup',                   to: '/Account/Guides/signup' },
          { from: '/Guides/install-connector',        to: '/Account/Guides/install-connector' },
          { from: '/Guides/log-in-to-site',           to: '/Account/Guides/log-in-to-site' },
          { from: '/Guides/invite-teammate',          to: '/Account/Guides/invite-teammate' },
          { from: '/Guides/switch-team',              to: '/Account/Guides/switch-team' },
          { from: '/Guides/buy-credits',              to: '/Account/Guides/buy-credits' },
          { from: '/Guides/auto-reload',              to: '/Account/Guides/auto-reload' },
          { from: '/Guides/change-plan',              to: '/Account/Guides/change-plan' },
          { from: '/Guides/reset-2fa',                to: '/Account/Guides/reset-2fa' },
          { from: '/Guides/regenerate-api-keys',      to: '/Account/Guides/regenerate-api-keys' },

          // Group 4: brief detour through a top-level /Developers/
          // section was reverted. Client SDK is back at /Client/*,
          // Connector internals live in /Connector/Developers/*, the
          // user-facing Connector secrets doc is back at /Connector/
          // secrets, and the HTTP API page sits under /Account/
          // Developers/. These redirects catch any link that was
          // grabbed during that brief window.
          { from: '/Developers',                                       to: '/Client/intro' },
          { from: '/Developers/intro',                                 to: '/Client/intro' },
          { from: '/Developers/Client',                                to: '/Client/intro' },
          { from: '/Developers/Client/intro',                          to: '/Client/intro' },
          { from: '/Developers/Client/installation',                   to: '/Client/installation' },
          { from: '/Developers/Client/configuration',                  to: '/Client/configuration' },
          { from: '/Developers/Client/customization',                  to: '/Client/customization' },
          { from: '/Developers/Client/dev-faq',                        to: '/Client/dev-faq' },
          { from: '/Developers/Client/faq',                            to: '/Client/faq' },
          { from: '/Developers/Client/hooks',                          to: '/Client/hooks' },
          { from: '/Developers/Client/integration-prompt',             to: '/Client/integration-prompt' },
          { from: '/Developers/Client/login-feedback-flow',            to: '/Client/login-feedback-flow' },
          { from: '/Developers/Client/security',                       to: '/Client/security' },
          { from: '/Developers/Client/troubleshooting',                to: '/Client/troubleshooting' },
          { from: '/Developers/Client/usage',                          to: '/Client/usage' },
          { from: '/Developers/Client/namespacing',                    to: '/Client/namespacing' },
          { from: '/Developers/Client/namespacing/css-namespacing',    to: '/Client/namespacing/css-namespacing' },
          { from: '/Developers/Client/namespacing/merging-into-existing-composer', to: '/Client/namespacing/merging-into-existing-composer' },
          { from: '/Developers/Client/namespacing/php-scoper',         to: '/Client/namespacing/php-scoper' },
          { from: '/Developers/Client/namespacing/strauss',            to: '/Client/namespacing/strauss' },
          { from: '/Developers/Connector-development',                 to: '/Connector/Developers/development' },
          { from: '/Developers/Connector-hooks',                       to: '/Connector/Developers/hooks' },
          { from: '/Developers/Connector-encrypted-messages',          to: '/Connector/Developers/encrypted-messages' },
          { from: '/Developers/Connector-envelope-signature-verification', to: '/Connector/Developers/envelope-signature-verification' },
          { from: '/Developers/Connector-running-behind-a-proxy',      to: '/Connector/Developers/running-behind-a-proxy' },
          { from: '/Developers/Connector-secrets',                     to: '/Connector/secrets' },
          { from: '/Developers/http-api',                              to: '/Account/Developers/http-api' },
          { from: '/api-reference',                                    to: '/Account/Developers/http-api' },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Docs Home',
        logo: {
          alt: 'TrustedLogin Logo',
          src: 'img/TrustedLogin-Horizontal.svg',
          srcDark: 'img/TrustedLogin-Horizontal-White.svg',
        },
        items: [
          // Guides surface inside the Account section now (autogenerated
          // sidebar picks up docs/Account/Guides/), so no separate navbar
          // item — readers reach them via the Account dropdown.
          {
            type: 'doc',
            label: 'Client SDK',
            position: 'left',
            docId: 'Client/intro',
          },
          {
            type: 'doc',
            label: 'Self-Hosted WordPress Plugin',
            docId: 'Connector/intro',
          },
          {
            type: 'doc',
            label: 'Account',
            docId: 'Account/intro',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Client SDK',
                to: '/docs/Client/intro',
              },
              {
                label: 'Connector Plugin',
                to: '/docs/Connector/intro',
              },
              {
                label: 'Account',
                to: '/docs/Account/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'TrustedLogin.com',
                href: 'https://www.trustedlogin.com',
              },
              {
                label: 'Email',
                href: 'mailto:admin@trustedlogin.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/trustedlogin/',
              },
              {
                label: 'For AI assistants & tools',
                to: '/for-ai-tools',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Katz Web Services, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php', 'bash']
      },
      ...(algoliaConfig ? { algolia: algoliaConfig } : {}),
    }),
};

module.exports = config;
