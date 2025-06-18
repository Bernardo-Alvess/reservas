# 📊 Exemplos de Diagramas Mermaid

Este documento demonstra os diferentes tipos de diagramas Mermaid disponíveis na documentação da API de Reservas.

## 🏗️ Diagrama de Arquitetura

```mermaid
graph TB
    subgraph "Frontend Applications"
        A[Web Dashboard]
        B[Mobile App]
        C[Admin Panel]
    end
    
    subgraph "API Gateway"
        D[NestJS API]
        E[Authentication]
        F[Rate Limiting]
    end
    
    subgraph "Business Logic"
        G[User Service]
        H[Restaurant Service]
        I[Reservation Service]
        J[Table Service]
    end
    
    subgraph "Data Layer"
        K[MongoDB]
        L[Redis Cache]
        M[Cloudinary]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    D --> F
    
    E --> G
    E --> H
    E --> I
    E --> J
    
    G --> K
    H --> K
    I --> K
    J --> K
    
    I --> L
    H --> M
    
    style D fill:#ff6900,stroke:#333,stroke-width:3px,color:#fff
    style K fill:#4caf50,stroke:#333,stroke-width:2px
    style L fill:#2196f3,stroke:#333,stroke-width:2px
```

## 🔄 Fluxo de Criação de Reserva

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as API Gateway
    participant Auth as Auth Service
    participant RS as Reservation Service
    participant TS as Table Service
    participant DB as MongoDB
    participant Email as Email Service
    
    C->>API: POST /api/reserves
    API->>Auth: Validar Token JWT
    Auth-->>API: Token Válido
    
    API->>RS: Criar Reserva
    RS->>TS: Buscar Mesas Disponíveis
    TS->>DB: Query: Mesas + Horário
    DB-->>TS: Lista de Mesas
    TS-->>RS: Mesas Filtradas
    
    RS->>RS: Algoritmo de Atribuição
    RS->>DB: Salvar Reserva
    DB-->>RS: Reserva Criada
    
    RS->>Email: Enviar Confirmação
    Email-->>C: Email Enviado
    
    RS-->>API: Reserva Confirmada
    API-->>C: Response 201 Created
```

## 📊 Diagrama de Estados da Reserva

```mermaid
stateDiagram-v2
    [*] --> Pending: Criar Reserva
    
    Pending --> Confirmed: confirmar()
    Pending --> Cancelled: cancelar()
    Pending --> Expired: timeout(24h)
    
    Confirmed --> CheckedIn: check_in()
    Confirmed --> NoShow: timeout(30min)
    Confirmed --> Cancelled: cancelar()
    
    CheckedIn --> Completed: finalizar()
    CheckedIn --> Cancelled: cancelar()
    
    NoShow --> [*]
    Cancelled --> [*]
    Completed --> [*]
    Expired --> [*]
    
    note right of Pending
        Aguardando confirmação
        do cliente/restaurante
    end note
    
    note right of Confirmed
        Mesa reservada e
        aguardando chegada
    end note
```

## 🗄️ Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        string email UK
        string password
        string name
        string phone
        enum role
        Date createdAt
        Date updatedAt
    }
    
    COMPANY {
        ObjectId _id PK
        string name
        string cnpj UK
        string email
        string phone
        Date createdAt
        Date updatedAt
    }
    
    RESTAURANT {
        ObjectId _id PK
        ObjectId companyId FK
        string name
        string description
        object address
        string phone
        object schedule
        Date createdAt
        Date updatedAt
    }
    
    TABLE {
        ObjectId _id PK
        ObjectId restaurantId FK
        number tableNumber
        number capacity
        string location
        boolean isActive
        Date createdAt
        Date updatedAt
    }
    
    RESERVE {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId restaurantId FK
        ObjectId tableId FK
        number numberOfPeople
        Date reserveDate
        string reserveTime
        enum status
        string specialRequests
        Date createdAt
        Date updatedAt
    }
    
    USER ||--o{ RESERVE : "faz"
    COMPANY ||--o{ RESTAURANT : "possui"
    RESTAURANT ||--o{ TABLE : "tem"
    RESTAURANT ||--o{ RESERVE : "recebe"
    TABLE ||--o{ RESERVE : "é_reservada"
```

## 🔄 Ciclo de Vida do Desenvolvimento

```mermaid
gitgraph
    commit id: "Initial Setup"
    branch development
    checkout development
    commit id: "User Module"
    commit id: "Auth System"
    
    branch feature/restaurants
    checkout feature/restaurants
    commit id: "Restaurant CRUD"
    commit id: "Restaurant Tests"
    
    checkout development
    merge feature/restaurants
    commit id: "Integration Tests"
    
    branch feature/reservations
    checkout feature/reservations
    commit id: "Reservation Logic"
    commit id: "Auto Assignment"
    commit id: "Email Service"
    
    checkout development
    merge feature/reservations
    commit id: "E2E Tests"
    
    checkout main
    merge development
    commit id: "v1.0.0 Release"
```

## 📈 Gráfico de Performance

```mermaid
xychart-beta
    title "Performance da API (Tempo de Resposta)"
    x-axis [Login, Listar Restaurantes, Criar Reserva, Listar Reservas, Confirmar Reserva]
    y-axis "Tempo (ms)" 0 --> 1000
    bar [120, 85, 340, 95, 180]
```

## 🛠️ Pipeline de Deploy

```mermaid
graph LR
    A[Código] --> B[Git Push]
    B --> C{GitHub Actions}
    
    C --> D[Lint & Tests]
    D --> E{Tests Pass?}
    
    E -->|Sim| F[Build Docker]
    E -->|Não| G[❌ Falha]
    
    F --> H[Push Registry]
    H --> I{Branch?}
    
    I -->|main| J[Deploy Prod]
    I -->|develop| K[Deploy Staging]
    
    J --> L[Health Check]
    K --> M[Health Check]
    
    L --> N[✅ Sucesso]
    M --> O[✅ Staging OK]
    
    style A fill:#e1f5fe
    style N fill:#e8f5e8
    style O fill:#e8f5e8
    style G fill:#ffebee
```

## 🔐 Arquitetura de Segurança

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web App]
        B[Mobile App]
    end
    
    subgraph "Security Layer"
        C[CORS Protection]
        D[Rate Limiting]
        E[JWT Validation]
        F[Input Validation]
    end
    
    subgraph "API Layer"
        G[Controllers]
        H[Guards]
        I[Services]
    end
    
    subgraph "Data Layer"
        J[Encrypted Data]
        K[MongoDB]
    end
    
    A --> C
    B --> C
    
    C --> D
    D --> E
    E --> F
    
    F --> G
    G --> H
    H --> I
    
    I --> J
    J --> K
    
    style E fill:#ff6900,color:#fff
    style H fill:#4caf50
    style J fill:#2196f3
```

## 📱 Componentes da Aplicação

```mermaid
mindmap
  root((API de Reservas))
    Autenticação
      JWT Tokens
      Refresh Tokens
      Logout
    Usuários
      Registro
      Perfil
      Histórico
    Restaurantes
      CRUD
      Configurações
      Horários
    Mesas
      Capacidade
      Localização
      Status
    Reservas
      Criação
      Confirmação
      Cancelamento
      Atribuição Auto
```

---

## 🎨 Personalização de Tema

Os diagramas acima usam o tema configurado no Docusaurus:
- **Tema Claro**: `neutral`
- **Tema Escuro**: `dark`
- **Cores Personalizadas**: Laranja (#ff6900) para elementos principais

Para mais informações sobre diagramas Mermaid, consulte a [documentação oficial](https://mermaid.js.org/). 