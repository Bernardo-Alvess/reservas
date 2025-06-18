---
sidebar_position: 2
---

# Guia de Instalação

Este guia detalha o processo completo de instalação e execução da API de Reservas.

## 📥 Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/reservas-api.git

# Entre no diretório
cd reservas-api
```

## 📦 Instalação de Dependências

### Usando Yarn (Recomendado)

```bash
# Instalar todas as dependências
yarn install

# Verificar instalação
yarn --version
```

### Usando NPM

```bash
# Instalar todas as dependências
npm install

# Verificar instalação
npm --version
```

## ⚙️ Configuração Inicial

### 1. Arquivo de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas configurações
nano .env
# ou
code .env
```

### 2. Estrutura do .env

```env
# Configuração do Servidor
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/reservas

# JWT
JWT_SECRET=SuaChaveSecretaSuperSegura123!@#
JWT_EXPIRES_IN=7d

# CORS
PRODUCTION_URL=http://localhost:3000

# Cloudinary (Opcional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Cookies
COOKIE_SECRET=SuaChaveSecretaParaCookies456$%^
```

## 🚀 Executando a Aplicação

### Modo Desenvolvimento

```bash
# Iniciar em modo de desenvolvimento (com hot reload)
yarn start:dev

# ou com npm
npm run start:dev
```

### Modo Produção

```bash
# Build da aplicação
yarn build

# Executar em produção
yarn start:prod

# ou com npm
npm run build
npm run start:prod
```

### Modo Debug

```bash
# Executar com debugger
yarn start:debug

# ou com npm
npm run start:debug
```

## ✅ Verificação da Instalação

### 1. Health Check

Após iniciar a aplicação, verifique se está funcionando:

```bash
# Verificar status da API
curl http://localhost:3000/api/health

# Resposta esperada:
# {
#   "status": "ok",
#   "info": {
#     "database": {
#       "status": "up"
#     }
#   }
# }
```

### 2. Documentação Swagger

Acesse a documentação automática da API:

```
http://localhost:3000/docs
```

### 3. Logs da Aplicação

Verifique os logs no terminal:

```
[Nest] 12345  - 01/01/2024, 10:00:00 AM   LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/01/2024, 10:00:00 AM   LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 01/01/2024, 10:00:00 AM   LOG [RoutesResolver] AuthUserController {/api/auth-user}:
[Nest] 12345  - 01/01/2024, 10:00:00 AM   LOG Backend is up and running on port 3000
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
yarn start          # Iniciar aplicação
yarn start:dev      # Modo desenvolvimento (watch)
yarn start:debug    # Modo debug
```

### Build e Produção

```bash
yarn build          # Build da aplicação
yarn start:prod     # Executar build em produção
yarn build:prod     # Build + start produção
```

### Qualidade de Código

```bash
yarn lint           # Verificar linting
yarn format         # Formatar código
yarn prepare        # Configurar hooks do Husky
```

### Testes

```bash
yarn test           # Testes unitários
yarn test:watch     # Testes em modo watch
yarn test:cov       # Testes com coverage
yarn test:debug     # Testes em modo debug
yarn test:e2e       # Testes end-to-end
```

## 🗄️ Inicialização do Banco de Dados

### Estrutura Automática

O Mongoose criará automaticamente as coleções quando necessário. As principais coleções são:

- `users` - Usuários do sistema
- `companies` - Empresas
- `restaurants` - Restaurantes
- `tables` - Mesas
- `reserves` - Reservas

### Dados de Exemplo (Opcional)

Para popular o banco com dados de teste:

```javascript
// scripts/seed.js
const mongoose = require('mongoose');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Inserir dados de exemplo
  // ... código de seed
  
  console.log('Dados de exemplo inseridos com sucesso!');
  process.exit(0);
}

seed();
```

Execute o script:
```bash
node scripts/seed.js
```

## 🐳 Docker (Opcional)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/reservas
    depends_on:
      - mongo
    volumes:
      - .:/app
      - /app/node_modules

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Executar com Docker

```bash
# Build e execução
docker-compose up --build

# Apenas execução
docker-compose up

# Em background
docker-compose up -d
```

## 🔍 Solução de Problemas

### Dependências

```bash
# Limpar cache e reinstalar
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

### MongoDB

```bash
# Verificar conexão
mongosh $MONGODB_URI

# Reiniciar serviço (Linux)
sudo systemctl restart mongod

# Verificar logs
tail -f /var/log/mongodb/mongod.log
```

### Porta em Uso

```bash
# Encontrar processo na porta 3000
lsof -i :3000

# Finalizar processo
kill -9 <PID>

# Ou alterar porta no .env
PORT=3001
```

## 📋 Checklist Pós-Instalação

- [ ] Aplicação inicia sem erros
- [ ] Health check retorna sucesso
- [ ] Swagger acessível em `/docs`
- [ ] Conectividade com MongoDB
- [ ] Variáveis de ambiente configuradas
- [ ] Testes passando
- [ ] Logs aparecem corretamente

## 🚀 Próximos Passos

Com a instalação concluída, explore:

- [Estrutura de Módulos](../architecture/module-structure)
- [Integração com MongoDB](../database/mongodb-integration)
- [Referência da API](../api-reference/overview) 