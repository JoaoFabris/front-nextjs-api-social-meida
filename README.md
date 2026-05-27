# Social Media API

API REST de uma rede social construída com **NestJS**, **PostgreSQL** e **Supabase**.

🔗 **Base URL:** `https://social-media-api-9xfi.onrender.com/api/v1`
📄 **Swagger:** `https://social-media-api-9xfi.onrender.com/docs`

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/) — Framework Node.js modular com injeção de dependências
- [TypeORM](https://typeorm.io/) — ORM com migrations
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [Supabase Auth](https://supabase.com/docs/guides/auth) — Autenticação e gerenciamento de credenciais
- [Supabase Storage](https://supabase.com/docs/guides/storage) — Upload de avatares
- [JWT](https://jwt.io/) — Validação de sessão stateless via Passport
- [Swagger](https://swagger.io/) — Documentação interativa

---

## 🏗️ Arquitetura

A autenticação é dividida em duas camadas:

- **Supabase Auth** gerencia credenciais (email, senha, sessão). O token JWT retornado é validado em todas as rotas protegidas via `JwtAuthGuard`.
- **Tabela `users`** armazena os dados de perfil público (username, bio, avatar) linkados pelo mesmo UUID do Supabase Auth.

Essa separação mantém as credenciais seguras no Supabase enquanto permite total controle sobre os dados de perfil no banco próprio.

---

## 📦 Endpoints

| Método | Rota                  | Descrição                       | Auth |
| ------ | --------------------- | ------------------------------- | ---- |
| POST   | `/auth/register`      | Cria conta no Supabase + perfil | —    |
| POST   | `/auth/login`         | Login e retorna JWT             | —    |
| GET    | `/auth/me`            | Retorna usuário autenticado     | ✅   |
| GET    | `/users`              | Lista usuários                  | —    |
| GET    | `/users/:id`          | Busca usuário por ID            | —    |
| PATCH  | `/users/me/avatar`    | Atualiza avatar                 | ✅   |
| GET    | `/feed`               | Feed personalizado paginado     | ✅   |
| POST   | `/posts`              | Cria post                       | ✅   |
| GET    | `/posts`              | Lista posts paginados           | —    |
| GET    | `/posts/:id`          | Busca post por ID               | —    |
| PATCH  | `/posts/:id`          | Atualiza post                   | ✅   |
| DELETE | `/posts/:id`          | Remove post                     | ✅   |
| POST   | `/posts/:id/likes`    | Curtir post                     | ✅   |
| DELETE | `/posts/:id/likes`    | Descurtir post                  | ✅   |
| POST   | `/posts/:id/comments` | Comentar em post                | ✅   |
| POST   | `/users/:id/follow`   | Seguir usuário                  | ✅   |
| DELETE | `/users/:id/unfollow` | Deixar de seguir                | ✅   |
| POST   | `/ai/caption`         | Sugerir legenda com IA          | ✅   |
| POST   | `/ai/chat`            | Chat com IA                     | ✅   |

---

## 🗂️ Estrutura

```
src/
├── auth/           # Login, registro, JWT strategy e guards
├── users/          # Perfil, avatar, CRUD de usuários
├── posts/          # CRUD de posts com paginação
├── likes/          # Curtidas
├── comments/       # Comentários
├── follows/        # Sistema de seguidores
├── feed/           # Feed personalizado
├── ai/             # Integração com IA (caption e chat)
├── storage/        # Upload via Supabase Storage
├── supabase/       # Módulo global do cliente Supabase
├── common/         # DTOs compartilhados (paginação)
└── config/         # Validação de env e configuração do TypeORM
```

---

## ⚙️ Instalação

```bash
git clone https://github.com/JoaoFabris/NestJs-Api-Social-Media.git
cd NestJs-Api-Social-Media
pnpm install
cp .env.example .env
pnpm run migration:run
pnpm run start:dev
```

Acesse `http://localhost:3000/docs` para a documentação interativa.

---

## 🔑 Variáveis de ambiente

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=social_media_db

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=sua_service_role_key

JWT_SECRET=seu_secret
JWT_EXPIRES_IN=7d
```

---

## 📄 Licença

Todos os direitos reservados a [JoaoFabris](https://github.com/JoaoFabris).
