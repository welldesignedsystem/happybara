# Happybara Café — AGENTS.md

## Quick start

```bash
npm install
npm run dev      # dev server
npm run build    # static export -> out/
npm run lint     # next lint (only verification available; no tests)
```

## Build artifact

`next.config.js` sets `output: 'export'` — the build produces a static site in `out/`. The `postbuild` script copies `out/index.html` to the repo root (required by Wasmer deployment). The root `index.html` is a **generated artifact** — do not edit directly; edit `app/page.tsx`.

## Deployment

Deployed to Wasmer Edge. The `wasmer.toml` serves `out/` via `sharrattj/static-web-server`.

```bash
wasmer deploy    # from project root
```

`app.yaml` is gitignored — create it per-deployment with your Wasmer username and EmailJS env vars (matching `.env.local`). See `README.md` for the template.

## Architecture

Single-page Next.js 14 app. App Router (`app/`), one page with many client components under `app/components/`. Uses `'use client'` on the main page.

- **No tests** — only `next lint` for verification.
- **No CI** — no GitHub Actions workflows.
- **All client-side** — no API routes, no server components.

## EmailJS

The `OrderForm` component sends email via `@emailjs/browser`. Three env vars required:
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.

## Key deps

`next@^14.2.0`, `react@^18.3.0`, `@emailjs/browser@^4.4.1`, `qrcode.react@^4.2.0`.
