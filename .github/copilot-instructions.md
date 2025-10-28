This file gives targeted guidance for AI coding agents working in this repository so they can be productive immediately.

Repository high-level notes
- This is a Next.js (App Router) application using the `app/` directory (see `app/layout.js`, `app/page.tsx`, and dynamic route `app/[userNameSlug]/generateStaticParams.js`).
- Frontend components live in `components/` (many use CSS modules `*.module.css`). Server and business logic is under `lib/`.
- There are two DB integration paths: MongoDB (Mongoose) and Postgres (pg). Check `lib/databases/handler-mongodb.js`, `lib/databases/handler-pgdb.js` and `lib/databases/db-config.js` for connection and environment conventions.

Dev / build / test commands (from `package.json`)
- dev: `npm run dev` (Next dev server, default port 3000)
- build: `npm run build` (Next production build)
- start: `npm run start` (start the built app)
- lint: `npm run lint` (Next/ESLint)
- typecheck: `npm run typecheck` (tsc)

Important code patterns to follow (concrete examples)
- Calculator definitions: `lib/calculadoras/estrutura/*.ts` export objects with a `functionLogic` string and `slug`. Example: `lib/calculadoras/estrutura/gastro.ts` defines calculators like `lille` and `maddrey` and uses `functionLogic: "calcularLille"`.
  - When adding a new calculator: create a structure entry in `lib/calculadoras/estrutura/`, and implement the corresponding logic function in `lib/calculadoras/` (see `calc-functions.js` and `logica/` subfolder). Keep `slug` unique.
- Centralized calculator helpers: `lib/calculadoras/calc-functions.js` and `lib/calculadoras/calc-static.js` contain reusable helpers and exports that UIs call — avoid duplicating logic in components; prefer calling these utilities.
- Actions and forms: server-side actions and API handlers are split between `actions/` (app-level actions used by forms) and `api/` routes for programmatic access. Examples: `actions/auth/resetPassAction.js` and `api/auth/*`.
- Components: mix of React Server Components and Client Components — check whether a component imports client-only modules (state/hooks) and use `'use client'` at the top of the file when required (common in files under `components/*` with interactive controls).

Database and secrets
- Environment-based configuration is used; check `lib/databases/db-config.js` for env var names and default behavior. Don't hardcode credentials in code or in these instructions.
- When changing DB schema/collections, update both Mongo and PG handlers if the app relies on both.

Routing / rendering
- `app/[userNameSlug]/` contains dynamic user pages and uses `generateStaticParams.js` for static generation — be careful when adding fields that change at runtime: prefer server-rendered or client components for dynamic data.

Files that are especially useful to open first
- `app/layout.js`, `app/page.tsx` — entry points for overall layout and data fetching patterns
- `lib/calculadoras/estrutura/*.ts` — where calculators are declared (structure and UI metadata)
- `lib/calculadoras/calc-functions.js` and `lib/calculadoras/logica/` — actual calculation code
- `lib/databases/*` — DB adapters (Mongo, Postgres)
- `components/layout/layout.js` and `components/*` — examples of UI patterns and CSS module usage

Conventions and gotchas
- Mixed JS/TS: the repo mixes `.js`, `.ts`, and `.tsx` files. Prefer existing file language when editing smaller pieces to avoid introducing noisy conversions.
- CSS modules: many components use `*.module.css`; namespaced class usage is expected.
- IDs and legacy Mongo data shapes: calculator structure files sometimes include Mongo-style `{"_id":{"$oid":"..."}}` entries — these are descriptive and occasionally relied on by import scripts; preserve `_id` or adapt with care.
- `functionLogic` mapping: logic is referenced by string keys — ensure string names match exported function names exactly.

When making changes
- Run `npm run dev` locally and open `http://localhost:3000` to validate UI changes.
- Run `npm run typecheck` to catch TypeScript mismatches and `npm run lint` for linting problems.
- For DB changes, prefer adding small migration scripts and test locally with development DB instances.

If you need clarification from humans
- Ask which database (Mongo or Postgres) is primary for the feature you're working on.
- Ask whether an added calculator should be available in the UI immediately or gated behind admin pages (there are admin pages under `admin/`).

If anything in this file is out of date, mention the file(s) and a one-line correction so the instructions can be updated.

---
End of Copilot instructions for this repo.
