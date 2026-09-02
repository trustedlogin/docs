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
        // The whole SaaS section described internal infrastructure (Vault
        // tokens, Kubernetes secrets, deployment internals, etc.) and
        // shouldn't have been public; it's now removed entirely, including
        // its overview page. Old bookmarks and external links still exist,
        // so redirect each to /security, the closest public page.
        //
        // Note: GitHub Pages can't issue real HTTP 301s, so this plugin emits
        // a small HTML page at each `from` URL that meta-refreshes + JS
        // navigates to `to`. Search engines treat it as a redirect (SEO
        // weight slightly less than a true 301, but functional for users).
        redirects: [
          { from: '/SaaS/intro',                     to: '/security' },
          { from: '/SaaS/vault-sass-token',          to: '/security' },
          { from: '/SaaS/vault',                     to: '/security' },
          { from: '/SaaS/vault-client',              to: '/security' },
          { from: '/SaaS/CI-CD',                     to: '/security' },
          { from: '/SaaS/server-setup',              to: '/security' },
          { from: '/SaaS/cli',                       to: '/security' },
          { from: '/SaaS/elasticsearch',             to: '/security' },
          { from: '/SaaS/webhooks',                  to: '/security' },
          { from: '/SaaS/user-remote-authentication', to: '/security' },
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
          // Guides nav item removed — content kept on disk at docs/Guides/
          // but not surfaced until the section is ready to ship.
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
