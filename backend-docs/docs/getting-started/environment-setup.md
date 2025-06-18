---
sidebar_position: 1
---

# Configuração do Ambiente

Este guia aborda os pré-requisitos e configurações necessárias para executar a API de Reservas.

## 📋 Pré-requisitos

### Sistema Operacional
- **Windows** 10/11
- **macOS** 10.15+
- **Linux** Ubuntu 18.04+ ou equivalente

### Software Necessário

#### Node.js
- **Versão requerida**: 18.x ou superior
- **Download**: [nodejs.org](https://nodejs.org/)

```bash
# Verificar versão instalada
node --version
npm --version
```

#### Yarn (Recomendado)
- **Versão**: 1.22.22+
- **Instalação**:

```bash
npm install -g yarn
```

#### MongoDB
Escolha uma das opções:

**Opção 1: MongoDB Local**
- **Download**: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Versão recomendada**: 6.x

**Opção 2: MongoDB Atlas (Cloud)**
- **Acesso**: [mongodb.com/atlas](https://www.mongodb.com/atlas)
- **Tier gratuito** disponível

### Ferramentas de Desenvolvimento (Opcionais)

#### MongoDB Compass
- **Interface gráfica** para MongoDB
- **Download**: [mongodb.com/products/compass](https://www.mongodb.com/products/compass)

#### Postman
- **Testes de API**
- **Download**: [postman.com](https://www.postman.com/downloads/)

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
# Configuração do Servidor
PORT=3000
NODE_ENV=development

# Configuração do MongoDB
MONGODB_URI=mongodb://localhost:27017/reservas
# Para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reservas?retryWrites=true&w=majority

# Configuração JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d

# URLs de Produção (para CORS)
PRODUCTION_URL=https://seu-frontend-production.com

# Configuração Cloudinary (para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# Configuração de Cookies
COOKIE_SECRET=sua_chave_secreta_para_cookies
```

### 🔐 Geração de Chaves Secretas

Para gerar chaves seguras, use:

```bash
# No terminal (Linux/Mac)
openssl rand -hex 64

# No Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🗄️ Configuração do MongoDB

### MongoDB Local

1. **Instalar MongoDB**:
   - Siga as instruções específicas do seu sistema operacional
   - Certifique-se de que o serviço está em execução

2. **Verificar conexão**:
```bash
mongosh
# ou
mongo
```

3. **Criar banco de dados**:
```javascript
use reservas
```

### MongoDB Atlas (Cloud)

1. **Criar conta** no MongoDB Atlas
2. **Criar cluster** (tier gratuito disponível)
3. **Configurar usuário** de banco de dados
4. **Configurar IP whitelist** (ou permitir qualquer IP: 0.0.0.0/0)
5. **Obter string de conexão**

## 🔧 Configuração do Cloudinary

O Cloudinary é usado para gerenciamento de imagens. Para configurar:

1. **Criar conta** em [cloudinary.com](https://cloudinary.com/)
2. **Acessar Dashboard** para obter as credenciais
3. **Copiar** as informações para o arquivo `.env`

## ✅ Verificação da Configuração

### Teste de Conectividade MongoDB

Crie um arquivo de teste `test-connection.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexão com MongoDB estabelecida com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    process.exit(1);
  }
}

testConnection();
```

Execute o teste:
```bash
node test-connection.js
```

### Verificação das Variáveis de Ambiente

```bash
# Verificar se todas as variáveis estão definidas
echo $PORT
echo $MONGODB_URI
echo $JWT_SECRET
```

## 🔍 Troubleshooting

### Problemas Comuns

#### Erro de conexão MongoDB
```
MongoNetworkError: failed to connect to server
```

**Soluções**:
- Verificar se o MongoDB está em execução
- Verificar a string de conexão no `.env`
- Para Atlas: verificar whitelist de IPs

#### Erro de porta em uso
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Soluções**:
- Alterar a porta no arquivo `.env`
- Finalizar processos que usam a porta:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

#### Problemas com dependências
```bash
# Limpar cache e reinstalar
yarn cache clean
rm -rf node_modules
rm yarn.lock
yarn install
```

## 📝 Validação Final

Após configurar tudo, verifique se:

- [ ] Node.js 18.x+ instalado
- [ ] Yarn instalado e funcionando
- [ ] MongoDB rodando (local ou Atlas configurado)
- [ ] Arquivo `.env` criado com todas as variáveis
- [ ] Conexão com MongoDB testada
- [ ] Cloudinary configurado (se usar upload de imagens)

## 🚀 Próximo Passo

Com o ambiente configurado, prossiga para:
[Guia de Instalação](./installation) 