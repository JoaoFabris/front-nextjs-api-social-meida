# 📱 Social Media — Frontend

Frontend de uma rede social construído com **Next.js**, **TypeScript** e **Tailwind CSS**, consumindo uma [API REST](https://github.com/JoaoFabris/NestJs-Api-Social-Media) em NestJS.

🔗 **Demo:** [front-nextjs-api-social-meida.vercel.app](https://front-nextjs-api-social-meida.vercel.app)

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) — App Router, Server e Client Components
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) — Estilização e componentes
- [Axios](https://axios-http.com/) — Cliente HTTP com interceptors de auth
- [js-cookie](https://github.com/js-cookie/js-cookie) — Persistência do token JWT

---

## ⚙️ Instalação

```bash
git clone https://github.com/JoaoFabris/front-nextjs-api-social-meida.git
cd front-nextjs-api-social-meida
pnpm install
cp .env.example .env.local
```

Configure o `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://social-media-api-9xfi.onrender.com
```

```bash
pnpm dev
```

Acesse [http://localhost:3001](http://localhost:3001).

---

## 📜 Scripts

| Script       | Descrição                    |
| ------------ | ---------------------------- |
| `pnpm dev`   | Desenvolvimento (porta 3001) |
| `pnpm build` | Build de produção            |
| `pnpm start` | Servidor de produção         |
| `pnpm lint`  | ESLint                       |

---

## 🗂️ Estrutura

```
src/
├── app/
│   ├── (auth)/         # Login e registro
│   └── (app)/          # Feed, posts, perfil
├── components/         # Componentes reutilizáveis + shadcn/ui
├── contexts/           # AuthContext (token JWT + usuário)
├── services/           # Chamadas à API
└── lib/api.ts          # Axios com interceptors
```

---

## 🌐 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JoaoFabris/front-nextjs-api-social-meida)

Configure a variável `NEXT_PUBLIC_API_URL` na plataforma.

---

## 📄 Licença

Todos os direitos reservados a [JoaoFabris](https://github.com/JoaoFabris).
