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

          // Group 4: developer-facing topics consolidated under
          // /Developers/. The Client SDK moved wholesale; the
          // engineer-audience subset of /Connector/ and the HTTP
          // API page came along too.
          { from: '/Client',                                  to: '/Developers/Client/intro' },
          { from: '/Client/intro',                            to: '/Developers/Client/intro' },
          { from: '/Client/installation',                     to: '/Developers/Client/installation' },
          { from: '/Client/configuration',                    to: '/Developers/Client/configuration' },
          { from: '/Client/customization',                    to: '/Developers/Client/customization' },
          { from: '/Client/dev-faq',                          to: '/Developers/Client/dev-faq' },
          { from: '/Client/faq',                              to: '/Developers/Client/faq' },
          { from: '/Client/hooks',                            to: '/Developers/Client/hooks' },
          { from: '/Client/integration-prompt',               to: '/Developers/Client/integration-prompt' },
          { from: '/Client/login-feedback-flow',              to: '/Developers/Client/login-feedback-flow' },
          { from: '/Client/security',                         to: '/Developers/Client/security' },
          { from: '/Client/troubleshooting',                  to: '/Developers/Client/troubleshooting' },
          { from: '/Client/usage',                            to: '/Developers/Client/usage' },
          { from: '/Client/namespacing',                      to: '/Developers/Client/namespacing' },
          { from: '/Client/namespacing/css-namespacing',      to: '/Developers/Client/namespacing/css-namespacing' },
          { from: '/Client/namespacing/merging-into-existing-composer', to: '/Developers/Client/namespacing/merging-into-existing-composer' },
          { from: '/Client/namespacing/php-scoper',           to: '/Developers/Client/namespacing/php-scoper' },
          { from: '/Client/namespacing/strauss',              to: '/Developers/Client/namespacing/strauss' },
          { from: '/Connector/development',                   to: '/Developers/Connector-development' },
          { from: '/Connector/hooks',                         to: '/Developers/Connector-hooks' },
          { from: '/Connector/encrypted-messages',            to: '/Developers/Connector-encrypted-messages' },
          { from: '/Connector/envelope-signature-verification', to: '/Developers/Connector-envelope-signature-verification' },
          { from: '/Connector/secrets',                       to: '/Developers/Connector-secrets' },
          { from: '/Connector/running-behind-a-proxy',        to: '/Developers/Connector-running-behind-a-proxy' },
          { from: '/api-reference',                           to: '/Developers/http-api' },
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
            label: 'Self-Hosted WordPress Plugin',
            position: 'left',
            docId: 'Connector/intro',
          },
          {
            type: 'doc',
            label: 'Account',
            docId: 'Account/intro',
          },
          {
            type: 'doc',
            label: 'Developers',
            docId: 'Developers/intro',
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
                label: 'Connector Plugin',
                to: '/docs/Connector/intro',
              },
              {
                label: 'Account',
                to: '/docs/Account/intro',
              },
              {
                label: 'Developers',
                to: '/docs/Developers/intro',
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
