# CC Project Manager — Manpower × Sonae

Web app de gestão de projeto para o novo modelo operacional de Contact Center (Continente/Sonae).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **Supabase** (PostgreSQL) para persistência
- **Recharts** para gráficos
- **date-fns** para datas

## Setup Local

### 1. Clonar e instalar

```bash
git clone https://github.com/lourencomestre/cc-project-manager.git
cd cc-project-manager
npm install
```

### 2. Configurar Supabase (opcional)

A app funciona sem Supabase (usa dados locais como fallback). Para persistência:

1. Criar projeto em [supabase.com](https://supabase.com) (região: `eu-west-1`)
2. No SQL Editor, correr `supabase/schema.sql`
3. No SQL Editor, correr `supabase/seed.sql`
4. Copiar credenciais (Settings → API):

```bash
cp .env.example .env.local
# Editar .env.local com URL e anon key do Supabase
```

### 3. Correr

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- **Dashboard** — Progresso global, por stream, alertas de risco
- **Cronograma (Gantt)** — Vista temporal com zoom semanas/meses
- **Tarefas** — Lista com filtros e edição inline (status, %)
- **Riscos & Questões** — Matriz de riscos e questões em aberto

## Deploy (Vercel)

1. Push para GitHub
2. Importar em [vercel.com](https://vercel.com)
3. Adicionar env vars: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Dados do Projeto

- **Período**: 16 abril — 30 junho 2026
- **Go-live**: 1 julho 2026
- **12 workstreams**, ~90 tarefas
- **22 questões em aberto**
