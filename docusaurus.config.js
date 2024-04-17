// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

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
          {
            label: 'Login Flow',
            position: 'left',
            href: '/flows',
          },
          {
            label: 'Client SDK',
            position: 'left',
            href: '/Client/intro',
          },
          {
            label: 'Self-Hosted Plugin',
            href: '/Vendor/intro',
          },
          {
            label: 'TrustedLogin SaaS',
            href: '/SaaS/intro',
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
                label: 'Vendor Plugin',
                to: '/docs/Vendor/intro',
              },
              {
                label: 'SaaS Application',
                to: '/docs/SaaS/intro',
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
    }),
};

module.exports = config;
