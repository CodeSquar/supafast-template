# create-supafast-template

CLI to scaffold projects with zero subcommand prompts:

- **Fullstack** — Next.js + shadcn/ui
- **Landing page** — Astro + Tailwind CSS
- **Supabase** — optional for both templates (`supabase init` + `supabase start`)

[![npm version](https://img.shields.io/npm/v/create-supafast-template.svg)](https://www.npmjs.com/package/create-supafast-template)
[![GitHub](https://img.shields.io/github/stars/lauta/create-supafast-template?style=social)](https://github.com/lauta/create-supafast-template)

## Usage

```bash
npm create supafast-template@latest
```

After choosing the template type, the CLI asks whether to initialize a Supabase local database (default: **yes** for fullstack, **no** for landing).

Non-interactive (CI / scripting):

```bash
npm create supafast-template@latest my-app -- --type fullstack --supabase
npm create supafast-template@latest my-landing -- --type landing --no-supabase
```

## Prerequisites

- **Node.js** 18+
- **npm**
- **Supabase (optional):** [Docker Desktop](https://www.docker.com/products/docker-desktop/) running (~7GB RAM recommended for local stack)

## What gets created

### Fullstack (`--type fullstack`)

1. `create-next-app` with recommended defaults (TypeScript, Tailwind, ESLint, App Router, no `src/`)
2. `shadcn init -d`
3. `shadcn add --all --yes`
4. Supabase (if enabled): `supabase init` + `supabase start`
5. Custom `app/page.tsx` template

### Landing page (`--type landing`)

1. `create astro` with `basics` template
2. `astro add tailwind --yes` (Tailwind v4 via official Vite plugin)
3. Supabase (if enabled): `supabase init` + `supabase start`
4. Custom `src/pages/index.astro` template

## Commands run (non-interactive)

### Fullstack

```bash
npx create-next-app@latest <name> --yes --ts --tailwind --eslint --app --import-alias "@/*"
npx shadcn@latest init -d
npx shadcn@latest add --all --yes
```

### Supabase (when enabled)

```bash
npx supabase init
npx supabase start
```

### Landing

```bash
npm create astro@latest <name> -- --yes --template basics --install --skip-houston
npx astro add tailwind --yes
```

## Troubleshooting

### Supabase did not start

Ensure Docker Desktop is installed and running, then:

```bash
cd <project-name>
npx supabase start
```

### shadcn components partially installed

```bash
cd <project-name>
npx shadcn@latest add --all --yes
```

## Local development

```bash
npm install
npm run build
npm link
npm create supafast-template@latest test-app -- --type fullstack
```

## License

MIT

