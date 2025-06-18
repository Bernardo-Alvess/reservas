---
sidebar_position: 1
---

# APIs RESTful - Visão Geral

Este documento apresenta a estrutura e convenções das APIs RESTful da aplicação de reservas, incluindo endpoints, códigos de status e exemplos de uso.

## 🌐 Estrutura Base da API

### URL Base
- **Desenvolvimento**: `http://localhost:3000/api`
- **Produção**: `https://sua-api.com/api`

### Documentação Swagger
- **URL**: `/docs`
- **Exemplo**: `http://localhost:3000/docs`

## 📋 Módulos da API

```mermaid
graph TB
    subgraph "API de Reservas"
        A[auth-user] --> B["🔐 Autenticação"]
        C[users] --> D["👥 Gestão de Usuários"]
        E[companies] --> F["🏢 Gestão de Empresas"]
        G[restaurants] --> H["🍽️ Gestão de Restaurantes"]
        I[tables] --> J["🪑 Gestão de Mesas"]
        K[reserve] --> L["📅 Gestão de Reservas"]
        M[health] --> N["🏥 Health Checks"]
    end
    
    style B fill:#ffebee
    style D fill:#e8f5e8
    style F fill:#e1f5fe
    style H fill:#fff3e0
    style J fill:#fce4ec
    style L fill:#f1f8e9
    style N fill:#fff8e1
```

## 🎯 Convenções de Nomenclatura

### URLs e Endpoints

```
GET    /api/{resource}              # Listar todos
GET    /api/{resource}/{id}         # Buscar por ID
POST   /api/{resource}              # Criar novo
PUT    /api/{resource}/{id}         # Atualizar completo
PATCH  /api/{resource}/{id}         # Atualizar parcial
DELETE /api/{resource}/{id}         # Remover
```

### Exemplos de URLs

```
# Autenticação
POST   /api/auth-user/login         # Login
GET    /api/auth-user/logout        # Logout

# Usuários
GET    /api/users                   # Listar usuários
GET    /api/users/profile           # Perfil do usuário logado
POST   /api/users                   # Criar usuário
PUT    /api/users/{id}              # Atualizar usuário

# Empresas
GET    /api/companies               # Listar empresas
POST   /api/companies               # Criar empresa
GET    /api/companies/{id}/restaurants # Restaurantes da empresa

# Reservas
GET    /api/reserve                 # Listar reservas
POST   /api/reserve                 # Criar reserva
PATCH  /api/reserve/confirm/{type}/{id} # Confirmar reserva
```

## 📊 Códigos de Status HTTP

### 2xx - Sucesso

| Código | Descrição | Uso |
|--------|-----------|-----|
| `200` | OK | Operação bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Operação bem-sucedida sem conteúdo |

### 4xx - Erros do Cliente

| Código | Descrição | Uso |
|--------|-----------|-----|
| `400` | Bad Request | Dados inválidos ou malformados |
| `401` | Unauthorized | Não autenticado |
| `403` | Forbidden | Sem permissão para acessar |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: email já existe) |
| `422` | Unprocessable Entity | Erro de validação |
| `429` | Too Many Requests | Rate limit excedido |

### 5xx - Erros do Servidor

| Código | Descrição | Uso |
|--------|-----------|-----|
| `500` | Internal Server Error | Erro interno do servidor |
| `503` | Service Unavailable | Serviço indisponível |

## 🔄 Fluxo de Requisição

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant Controller
    participant Guard
    participant Service
    participant Database
    
    Client->>Gateway: HTTP Request
    Gateway->>Controller: Route to endpoint
    Controller->>Guard: Check authentication
    Guard-->>Controller: Authorized/Denied
    Controller->>Service: Business logic
    Service->>Database: Data operation
    Database-->>Service: Result
    Service-->>Controller: Processed data
    Controller-->>Gateway: HTTP Response
    Gateway-->>Client: Final response
```

## 📝 Estrutura Padrão de Resposta

### Resposta de Sucesso

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Restaurante Exemplo",
    "email": "contato@restaurante.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Operação realizada com sucesso"
}
```

### Resposta de Lista

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Reserva 1",
      "date": "2024-01-20"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Reserva 2",
      "date": "2024-01-21"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

### Resposta de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": [
      {
        "field": "email",
        "message": "Email deve ter um formato válido"
      },
      {
        "field": "password",
        "message": "Senha deve ter pelo menos 6 caracteres"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users"
}
```

## 🔍 Filtros e Paginação

### Query Parameters

```typescript
// Exemplo de parâmetros de query
interface QueryParams {
  // Paginação
  page?: number;          // Página atual (padrão: 1)
  limit?: number;         // Itens por página (padrão: 10)
  
  // Ordenação
  sortBy?: string;        // Campo para ordenação
  sortOrder?: 'asc' | 'desc'; // Direção da ordenação
  
  // Filtros
  search?: string;        // Busca textual
  status?: string;        // Filtro por status
  dateFrom?: string;      // Data inicial
  dateTo?: string;        // Data final
}
```

### Exemplo de Uso

```bash
# Buscar reservas com filtros
GET /api/reserve?page=1&limit=20&status=confirmed&dateFrom=2024-01-01&dateTo=2024-01-31

# Buscar restaurantes por nome
GET /api/restaurants?search=pizza&sortBy=name&sortOrder=asc
```

## 🛡️ Headers de Autenticação

### Cookies (Padrão)

```http
GET /api/reserve HTTP/1.1
Host: localhost:3000
Cookie: sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Bearer Token (Alternativo)

```http
GET /api/reserve HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📄 Content-Type

### Requisições

```http
Content-Type: application/json    # Para dados JSON
Content-Type: multipart/form-data # Para upload de arquivos
```

### Respostas

```http
Content-Type: application/json    # Padrão para todas as respostas
```

## 🔍 Validação de Dados

### Regras Gerais

```typescript
// Exemplo de validação usando class-validator
export class CreateReserveDto {
  @IsNotEmpty({ message: 'Nome do cliente é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  @Length(2, 100, { message: 'Nome deve ter entre 2 e 100 caracteres' })
  customerName: string;

  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  customerEmail: string;

  @IsDateString({}, { message: 'Data deve estar no formato ISO' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  date: string;

  @IsNumber({}, { message: 'Número de pessoas deve ser um número' })
  @Min(1, { message: 'Deve haver pelo menos 1 pessoa' })
  @Max(20, { message: 'Máximo de 20 pessoas por reserva' })
  numberOfPeople: number;
}
```

## 🌐 CORS e Configurações

### Headers Permitidos

```typescript
// Configuração CORS
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://seu-frontend.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
});
```

## 📊 Rate Limiting

### Limites Padrão

| Endpoint | Limite | Janela |
|----------|--------|--------|
| `/api/auth-user/login` | 5 tentativas | 15 minutos |
| `/api/*` (geral) | 100 requests | 1 minuto |
| `/api/reserve` | 10 requests | 1 minuto |

### Headers de Rate Limit

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```

## 📱 Versionamento da API

### Estratégia Atual

- **Versão**: v1 (implícita na URL base)
- **URL**: `/api/v1/...` (preparado para futuras versões)

### Headers de Versão

```http
API-Version: 1.0.0
```

## 🔧 Utilitários de Desenvolvimento

### Health Check

```bash
# Verificar status da API
GET /api/health

# Resposta esperada:
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "memory": { "status": "up" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "memory": { "status": "up" }
  }
}
```

### OpenAPI/Swagger

- **URL da documentação**: `/docs`
- **JSON Schema**: `/docs-json`
- **YAML Schema**: `/docs-yaml`

## 🚀 Próximos Passos

Explore os endpoints específicos de cada módulo:

- [Autenticação](./authentication)
- [Reservas](./reservations)
- [Restaurantes](./restaurants)
- [Mesas](./tables)
- [Usuários](./users)
- [Empresas](./companies) 