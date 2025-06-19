import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'API de Reservas - Documentação',
  tagline: 'Sistema completo de gerenciamento de reservas de restaurantes',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'reservas-api', // Usually your GitHub org/user name.
  projectName: 'api-reservas-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },

  // Configuração para suporte ao Mermaid
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['pt', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: true,
        indexDocs: true,
        indexPages: false,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchContextByPaths: ['docs', 'blog'],
        useAllContextsWithNoSearchContext: false,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Habilita numeração de linhas nos blocos de código
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Habilita breadcrumbs
          breadcrumbs: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',

    // Configuração do Mermaid
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
      options: {
        maxTextSize: 50000,
        startOnLoad: true,
        theme: 'neutral',
        themeVariables: {
          primaryColor: '#ff6900',
          primaryTextColor: '#fff',
          primaryBorderColor: '#ff6900',
          lineColor: '#f8f8f8',
          secondaryColor: '#006100',
          tertiaryColor: '#fff',
        },
      },
    },

    // Configuração da navbar
    navbar: {
      title: 'API de Reservas',
      logo: {
        alt: 'API de Reservas Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '📚 Documentação',
        },
        { to: '/blog', label: '📝 Blog', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },

    // Configuração do footer
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: '🏠 Introdução',
              to: '/docs/intro',
            },
            {
              label: '⚙️ Configuração',
              to: '/docs/getting-started/environment-setup',
            },
            {
              label: '🏗️ Arquitetura',
              to: '/docs/architecture/module-structure',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: '📚 Visão Geral',
              to: '/docs/api-reference/overview',
            },
            {
              label: '📅 Reservas',
              to: '/docs/api-reference/reservations',
            },
            {
              label: '🔐 Autenticação',
              to: '/docs/authentication/overview',
            },
          ],
        },
        {
          title: 'Recursos',
          items: [
            {
              label: '🧪 Testes',
              to: '/docs/testing/overview',
            },
            {
              label: '🚀 Deploy',
              to: '/docs/deployment/overview',
            },
            {
              label: '📊 Exemplos',
              to: '/docs/examples/mermaid-diagrams',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: '📝 Blog',
              to: '/blog',
            },
            {
              label: '🐙 GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: '📧 Suporte',
              href: 'mailto:suporte@example.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sistema de Reservas. Construído com ❤️ usando Docusaurus.`,
    },

    // Configuração do Prism para syntax highlighting
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'diff',
        'json',
        'typescript',
        'javascript',
        'docker',
      ],
    },

    // Configurações de cores do tema
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Configurações do TOC (Table of Contents)
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
