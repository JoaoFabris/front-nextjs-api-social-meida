# 📱 Social Media — Frontend

Frontend de uma rede social construído com **Next.js 16**, **TypeScript** e **Tailwind CSS**, consumindo uma API REST externa.

---

## 🚀 Tecnologias

- [Next.js 16](https://nextjs.org/) — Framework React com App Router
- [React 19](https://react.dev/) — Biblioteca de UI
- [TypeScript 5](https://www.typescriptlang.org/) — Tipagem estática
- [Tailwind CSS 4](https://tailwindcss.com/) — Estilização utilitária
- [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) — Componentes acessíveis
- [Axios](https://axios-http.com/) — Cliente HTTP
- [date-fns](https://date-fns.org/) — Manipulação de datas
- [js-cookie](https://github.com/js-cookie/js-cookie) — Gerenciamento de cookies
- [Lucide React](https://lucide.dev/) — Ícones

---

## 📋 Pré-requisitos

- **Node.js** >= 18
- **pnpm** (recomendado) ou npm/yarn

---

## ⚙️ Instalação e configuração

### 1. Clone o repositório

```bash
git clone https://github.com/JoaoFabris/front-nextjs-api-social-meida.git
cd front-nextjs-api-social-meida
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env.local
```

Edite o `.env.local` conforme necessário (URL da API, etc.).

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
# ou
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📜 Scripts disponíveis

| Script       | Descrição                            |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção             |
| `pnpm start` | Inicia o servidor de produção        |
| `pnpm lint`  | Executa o linter (ESLint)            |

---

## 🗂️ Estrutura do projeto

```
front-nextjs-api-social-meida/
├── public/             # Arquivos estáticos
├── src/                # Código-fonte principal
│   ├── app/            # Rotas e páginas (App Router)
│   ├── components/     # Componentes reutilizáveis
│   └── ...
├── .env.example        # Exemplo de variáveis de ambiente
├── components.json     # Configuração do shadcn/ui
├── next.config.ts      # Configuração do Next.js
├── tailwind.config.*   # Configuração do Tailwind
└── tsconfig.json       # Configuração do TypeScript
```

---

## 🌐 Deploy

O jeito mais simples de fazer deploy é pela [Vercel](https://vercel.com/), plataforma criada pelos mesmos desenvolvedores do Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JoaoFabris/front-nextjs-api-social-meida)

Lembre-se de configurar as variáveis de ambiente na plataforma de deploy.

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de uso privado. Todos os direitos reservados a [JoaoFabris](https://github.com/JoaoFabris).
