---
sidebar_position: 1
slug: /
---

# 🏠 Introdução à API de Reservas

Bem-vindo à documentação completa da **API de Reservas**, um sistema robusto e escalável para gerenciamento de reservas de restaurantes desenvolvido com **NestJS** e **MongoDB**.

## 🎯 Visão Geral

Esta API oferece uma solução completa para restaurantes gerenciarem suas reservas, incluindo:

- 🔐 **Sistema de autenticação** com JWT
- 🏢 **Gestão de empresas e restaurantes**
- 🪑 **Gerenciamento de mesas**
- 📅 **Sistema de reservas** com atribuição automática
- 👥 **Controle de usuários** e permissões

## 🛠️ Tecnologias Principais

- **Backend**: NestJS 10.x (Node.js/TypeScript)
- **Banco de Dados**: MongoDB 6.x com Mongoose 8.x
- **Autenticação**: JWT com cookies HTTP-only
- **Upload de Arquivos**: Cloudinary
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest com cobertura completa

## 📋 Funcionalidades Principais

### Sistema de Atribuição Automática
A API implementa um algoritmo inteligente que:
- Atribui automaticamente a melhor mesa disponível
- Considera capacidade, localização e preferências
- Otimiza o uso do espaço do restaurante

### Confirmação de Reservas
- Sistema de confirmação via email
- Notificações automáticas
- Gestão de status das reservas

## 🏗️ Arquitetura do Sistema

```mermaid
graph TB
    subgraph "🎨 Camada de Apresentação"
        A[Controllers]
        B[DTOs]
        C[Pipes & Guards]
    end
    
    subgraph "💼 Camada de Negócio"
        D[Services]
        E[Business Logic]
    end
    
    subgraph "🗄️ Camada de Dados"
        F[Schemas/Models]
        G[MongoDB]
    end
    
    subgraph "📦 Módulos Funcionais"
        H[User Module]
        I[Company Module]
        J[Restaurant Module]
        K[Tables Module]
        L[Reserve Module]
    end
    
    subgraph "🔧 Infraestrutura"
        M[Auth Module]
        N[Database Module]
        O[Config Module]
        P[Health Module]
    end
    
    A --> D
    D --> F
    F --> G
    
    H -.-> M
    I -.-> M
    J -.-> M
    K -.-> M
    L -.-> M
    
    style A fill:#e1f5fe
    style D fill:#f3e5f5
    style F fill:#e8f5e8
    style H fill:#fff3e0
    style M fill:#fce4ec
```

## 📁 Estrutura do Projeto

```
src/
├── 👤 user/           # Gestão de usuários
├── 🏢 company/        # Gestão de empresas
├── 🍽️ restaurant/     # Gestão de restaurantes
├── 🪑 tables/         # Gestão de mesas
├── 📅 reserve/        # Sistema de reservas
├── 🔐 auth/           # Autenticação JWT
├── ⚕️ health/         # Health checks
└── 🔧 common/         # Utilitários compartilhados
```

## 🚀 Fluxo de Reserva

```mermaid
sequenceDiagram
    participant U as Cliente
    participant API as API
    participant DB as MongoDB
    participant E as Email Service
    
    U->>API: POST /api/reserves
    API->>DB: Buscar mesas disponíveis
    DB-->>API: Lista de mesas
    API->>API: Algoritmo de atribuição
    API->>DB: Criar reserva
    DB-->>API: Reserva criada
    API->>E: Enviar confirmação
    E-->>U: Email de confirmação
    API-->>U: Resposta com detalhes
```

## 🔗 Links Rápidos

### Para Iniciantes
- [⚙️ Configuração do Ambiente](./getting-started/environment-setup)
- [📦 Instalação](./getting-started/installation)

### Para Desenvolvedores
- [🏗️ Estrutura de Módulos](./architecture/module-structure)
- [🗄️ Integração MongoDB](./database/mongodb-integration)
- [🔐 Sistema de Autenticação](./authentication/overview)

### Para DevOps
- [🚀 Deploy](./deployment/overview)
- [🧪 Testes](./testing/overview)

## 💡 Vantagens

✅ **Escalável**: Arquitetura modular com NestJS  
✅ **Seguro**: Autenticação JWT e validação rigorosa  
✅ **Eficiente**: Algoritmos otimizados de atribuição  
✅ **Flexível**: Configuração por ambiente  
✅ **Testável**: Cobertura completa de testes  
✅ **Documentado**: Swagger integrado  

---

**Pronto para começar?** Siga nosso [guia de instalação](./getting-started/installation) e tenha a API funcionando em minutos! 🚀 