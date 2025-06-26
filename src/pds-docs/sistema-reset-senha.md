# Sistema de Reset de Senha com Token Único

## 📋 Visão Geral

O sistema de reset de senha foi implementado utilizando tokens JWT únicos para garantir segurança na redefinição de senhas. O token contém o email do usuário criptografado e possui expiração de 1 hora.

## 🔧 Funcionalidades Implementadas

### 1. **Solicitação de Reset de Senha**
- **Endpoint**: `POST /api/password-reset/forgot-password`
- **Descrição**: Usuário informa seu email e recebe um link para reset
- **Token**: JWT com email criptografado + expiração de 1 hora

### 2. **Validação de Token**
- **Endpoint**: `POST /api/password-reset/validate-token`
- **Descrição**: Verifica se o token recebido é válido
- **Retorna**: Email do usuário e status de validade

### 3. **Redefinição de Senha**
- **Endpoint**: `POST /api/password-reset/reset-password`
- **Descrição**: Redefine a senha usando token válido
- **Segurança**: Senha é criptografada com bcrypt antes de salvar

## 🔄 Fluxo Completo

```mermaid
sequenceDiagram
    participant U as Usuário
    participant API as Backend API
    participant JWT as JWT Service
    participant DB as MongoDB
    participant Email as Email Service

    %% 1. Solicitação de Reset
    U->>+API: POST /forgot-password { email }
    API->>+DB: Buscar usuário por email
    DB-->>-API: Dados do usuário
    
    alt Usuário encontrado
        API->>+JWT: Criar token JWT com email
        JWT-->>-API: Token gerado (exp: 1h)
        API->>+Email: Enviar email com link + token
        Email-->>U: Email com link de reset
        API-->>-U: "Email enviado com sucesso"
    else Usuário não encontrado
        API-->>-U: "Usuário não encontrado"
    end

    %% 2. Validação do Token (opcional)
    U->>+API: POST /validate-token { token }
    API->>+JWT: Verificar e decodificar token
    JWT-->>-API: Dados do token
    API-->>-U: { email, valid: true }

    %% 3. Reset da Senha
    U->>+API: POST /reset-password { token, newPassword }
    API->>+JWT: Verificar token
    JWT-->>-API: Email do usuário
    API->>+DB: Buscar usuário por email
    DB-->>-API: Dados do usuário
    API->>API: Criptografar nova senha
    API->>+DB: Atualizar senha no banco
    DB-->>-API: Senha atualizada
    API-->>-U: "Senha redefinida com sucesso"
```

## 📦 Estrutura dos Dados

### **Token JWT Payload**
```typescript
{
  email: string;           // Email do usuário
  purpose: 'password-reset'; // Finalidade do token
  iat: number;            // Timestamp de criação
  exp: number;            // Timestamp de expiração (1h)
}
```

### **DTOs Implementados**

#### `ForgotPasswordDto`
```typescript
{
  email: string; // Email válido obrigatório
}
```

#### `ValidateTokenDto`
```typescript
{
  token: string; // Token JWT obrigatório
}
```

#### `ResetPasswordDto`
```typescript
{
  token: string;      // Token JWT obrigatório
  newPassword: string; // Nova senha (min 6 caracteres)
}
```

## 🔒 Segurança Implementada

### **1. Criptografia do Token**
- Utiliza JWT com secret do ambiente
- Token expira em 1 hora automaticamente
- Payload contém identificação de propósito

### **2. Validação de Dados**
- Email validado com regex
- Senha mínima de 6 caracteres
- Token obrigatório em todas as operações

### **3. Criptografia da Senha**
- Usa bcrypt com salt automático
- Senha antiga é completamente substituída
- Não é possível recuperar senha original

### **4. Verificações de Segurança**
- Usuário deve existir no banco
- Token deve ser válido e não expirado
- Propósito do token deve ser 'password-reset'

## 🌐 Endpoints da API

### **1. Solicitar Reset de Senha**
```http
POST /api/password-reset/forgot-password
Content-Type: application/json

{
  "email": "usuario@exemplo.com"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Email de redefinição de senha enviado com sucesso!"
}
```

### **2. Redefinir Senha**
```http
POST /api/password-reset/reset-password/:token
Content-Type: application/json

{
  "newPassword": "MinhaNovaSenh@123"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Senha redefinida com sucesso!"
}
```

## 📧 Template de Email

O sistema utiliza o template `ForgotPasswordEmailTemplate` que inclui:
- Logo do ReservaFácil
- Mensagem personalizada com nome do usuário
- Botão/link direto para reset de senha
- Instruções de segurança
- Design responsivo e profissional

## ⚙️ Configuração de Ambiente

Certifique-se de que as seguintes variáveis estejam configuradas:

```env
JWT_SECRET=seu_jwt_secret_aqui
FRONTEND_URL=http://localhost:3000
```

## 🚀 Como Usar no Frontend

### **Exemplo de Integração**

1. **Página de "Esqueci minha senha"**:
   - Campo de email
   - Chamada para `/forgot-password`

2. **Página de reset** (acessada via link do email):
   - Extrair token da URL
   - Formulário para nova senha
   - Submeter para `/reset-password/:token`

### **Exemplo de Código Frontend**
```typescript
// 1. Solicitar reset
const forgotPassword = async (email: string) => {
  const response = await fetch('/api/password-reset/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

// 2. Redefinir senha
const resetPassword = async (token: string, newPassword: string) => {
  const response = await fetch('/api/password-reset/reset-password/${token}', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newPassword })
  });
  return response.json();
};
```

## ✅ Testes Recomendados

1. **Fluxo Completo**: Email → Token → Reset
2. **Token Expirado**: Aguardar 1 hora e tentar usar
3. **Token Inválido**: Modificar token e tentar usar
4. **Email Inexistente**: Tentar reset com email não cadastrado
5. **Senha Fraca**: Tentar definir senha com menos de 6 caracteres

## 🔄 Possíveis Melhorias Futuras

- [ ] Histórico de tokens utilizados (prevenir reuso)
- [ ] Rate limiting para solicitações de reset
- [ ] Notificação por SMS além do email
- [ ] Log de tentativas de reset para auditoria
- [ ] Interface administrativa para invalidar tokens 