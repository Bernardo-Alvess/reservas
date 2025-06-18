import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Sidebar principal da documentação
  docsSidebar: [
    // Introdução
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Introdução',
    },

    // Getting Started
    {
      type: 'category',
      label: '🚀 Começando',
      collapsed: false,
      items: [
        'getting-started/environment-setup',
        'getting-started/installation',
      ],
    },

    // Arquitetura
    {
      type: 'category',
      label: '🏗️ Arquitetura',
      collapsed: false,
      items: ['architecture/module-structure'],
    },

    // Database
    {
      type: 'category',
      label: '🗄️ Banco de Dados',
      collapsed: false,
      items: ['database/mongodb-integration'],
    },

    // Autenticação
    {
      type: 'category',
      label: '🔐 Autenticação',
      collapsed: false,
      items: ['authentication/overview'],
    },

    // API Reference
    {
      type: 'category',
      label: '📚 Referência da API',
      collapsed: false,
      items: [
        'api-reference/overview',
        'api-reference/reservations',
        // Nota: Os demais endpoints podem ser adicionados aqui
        // 'api-reference/authentication',
        // 'api-reference/users',
        // 'api-reference/companies',
        // 'api-reference/restaurants',
        // 'api-reference/tables',
      ],
    },

    // Testes
    {
      type: 'category',
      label: '🧪 Testes',
      collapsed: true,
      items: [
        'testing/overview',
        // Nota: Outras seções de teste podem ser adicionadas
        // 'testing/unit-tests',
        // 'testing/integration-tests',
        // 'testing/e2e-tests',
      ],
    },

    // Deployment
    {
      type: 'category',
      label: '🚀 Deployment',
      collapsed: true,
      items: [
        'deployment/overview',
        // Nota: Outras seções de deployment podem ser adicionadas
        // 'deployment/docker',
        // 'deployment/cloud-providers',
        // 'deployment/ci-cd',
      ],
    },

    // Exemplos e Diagramas
    {
      type: 'category',
      label: '📊 Exemplos',
      collapsed: true,
      items: [
        'examples/mermaid-diagrams',
        // Nota: Outros exemplos podem ser adicionados
        // 'examples/code-samples',
        // 'examples/postman-collection',
      ],
    },

    // Contribuição e Manutenção
    // {
    //   type: 'category',
    //   label: '🤝 Contribuição',
    //   collapsed: true,
    //   items: [
    //     // Nota: Seções podem ser adicionadas conforme necessário
    //     // 'contributing/guidelines',
    //     // 'contributing/code-standards',
    //     // 'contributing/pull-requests',
    //   ],
    // },
  ],
};

export default sidebars;
