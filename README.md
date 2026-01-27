# Samuel Coin

Implementação de uma criptomoeda com carteiras de **auto-custódia** inspiradas no Bitcoin. Sistema completo de gerenciamento de carteiras usando criptografia de curva elíptica, seeds mnemônicas e chaves públicas/privadas.

## 🔐 Características

- **Auto-custódia**: Controle total sobre suas chaves privadas
- **Seed de 12 palavras**: Geração e recuperação de carteiras via mnemônico BIP39
- **Criptografia de curva elíptica**: Uso de secp256k1 (mesma do Bitcoin)
- **Derivação hierárquica**: Implementação BIP32 para múltiplos endereços
- **Chaves públicas/privadas**: Sistema completo de assinatura e verificação
- **API REST**: Interface HTTP para interação com as carteiras

## 🛠️ Tecnologias

### Backend
- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Tipagem estática e segurança de código
- **Prisma** - ORM moderno para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados

### Criptografia
- **@noble/curves** - Implementação de curvas elípticas (secp256k1)
- **@scure/bip32** - Derivação hierárquica determinística
- **bip39** - Geração e validação de seeds mnemônicas

### Testes e Qualidade
- **Vitest** - Framework de testes
- **ESLint** - Linter para qualidade de código

## 📋 Pré-requisitos

- **Node.js** >= 24+
- **pnpm** (gerenciador de pacotes)
- **Docker** e **Docker Compose**

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd samuel-coin
```

### 2. Instale as dependências
```bash
cd api
pnpm install
```

### 3. Configure as variáveis de ambiente global
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DB_DATABASE=db
DB_PASSWORD=password
DB_USER=user
```

### 4. Configure as variáveis de ambiente da api
```bash
cd api
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
```

### 4. Inicie o banco de dados
```bash
cd ..
docker compose up -d
```

### 5. Execute as migrations e generate
```bash
cd api
pnpm prisma migrate dev
pnpm prisma genereate
```

## 🏃 Executando a aplicação

### Modo desenvolvimento
```bash
pnpm start:dev
```

### Modo produção
```bash
pnpm build
pnpm start:prod
```

A API estará disponível em `http://localhost:3000`

## 🧪 Testes

### Rodar Todos os Testes
```bash
pnpm test
```
### Testes por Categoria (unit, int)
```bash
pnpm test --project unit
```

### Corrigir problemas de lint automaticamente
```bash
pnpm lint:fix
```

## 🔑 Funcionalidades

### Carteiras
- [x] Criação de carteira com seed mnemônica (12 palavras)
- [x] Recuperação de carteira via seed
- [x] Derivação de chaves públicas/privadas (secp256k1)
- [ ] Geração de múltiplos endereços por carteira
- [x] Derivação hierárquica determinística (BIP32)

### Transações
- [ ] Compra de SAMS (Ṡ) por Real (BRL)
- [ ] Venda de SAMS (Ṡ) por Real (BRL)
- [ ] Receber Pagamento de SAMS (Ṡ)
- [ ] Efetuar pagamentos com SAMS (Ṡ)
- [ ] Assinatura digital de transações
- [ ] Validação de transações

### Livro Público de transações
- [ ] Visualização pública de saldo de carteira
- [ ] Visualização pública de histórico de transações

### API
- [x] Endpoints de criação de carteira
- [x] Endpoints de recuperação de carteira
- [x] Endpoints de gerenciamento de endereços
- [ ] Endpoints de transações
- [ ] Endpoints de consulta de saldo
- [ ] WebSocket para eventos em tempo real
- [ ] Endpoints de visualização pública de saldo de carteira
- [ ] Endpoints de visualização pública de histórico de transações

### Segurança
- [x] Criptografia de curva elíptica (secp256k1)
- [x] Geração segura de seeds (BIP39)
- [x] Derivação hierárquica (BIP32)
- [ ] Rate limiting
- [ ] Autenticação JWT

## 🔒 Avisos de Segurança

- **Nunca compartilhe sua seed**: As 12 palavras dão acesso total à carteira
- **Armazene com segurança**: Mantenha backup offline da seed
- **Chaves privadas**: Nunca são expostas pela API
- **Auto-custódia**: Você é o único responsável pelas suas chaves

## 👤 Autor

[Samuel D. Monteiro](https://www.linkedin.com/in/samuel-m-4a4432250/)