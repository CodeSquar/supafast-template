# create-supafast-template

CLI to scaffold projects with zero subcommand prompts:

- **Fullstack** — Next.js + shadcn/ui + Supabase
- **Landing page** — Astro + Tailwind CSS

## Usage

```bash
npm create supafast-template@latest
```

Non-interactive (CI / scripting):

```bash
npm create supafast-template@latest my-app -- --type fullstack
npm create supafast-template@latest my-landing -- --type landing
```

## Prerequisites

- **Node.js** 18+
- **npm**
- **Fullstack only:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) running (~7GB RAM recommended for Supabase local stack)

## What gets created

### Fullstack (`--type fullstack`)

1. `create-next-app` with recommended defaults (TypeScript, Tailwind, ESLint, App Router, no `src/`)
2. `shadcn init -d`
3. `shadcn add --all --yes`
4. `supabase init`
5. `supabase start` (from project root, if Docker is available)
6. Custom `app/page.tsx` template

### Landing page (`--type landing`)

1. `create astro` with `basics` template
2. `astro add tailwind --yes` (Tailwind v4 via official Vite plugin)
3. Custom `src/pages/index.astro` template

## Commands run (non-interactive)

### Fullstack

```bash
npx create-next-app@latest <name> --yes --ts --tailwind --eslint --app --import-alias "@/*"
npx shadcn@latest init -d
npx shadcn@latest add --all --yes
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

