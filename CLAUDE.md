# Zira Landing — project memory

> Vietnamese-first marketing site for the Zira Mini App. Next.js 16 static export served by the API gateway at the origin root.

## Place in the system

`zira-landing` is one of three Zira repos:

- `zira-client` — Angular SPA, deployed under `/app/`.
- `zira-server` — NestJS API gateway + `zalo-bot` worker. Hosts the landing too.
- `zira-landing` — **this repo**. Public homepage at `zira.top/`.

The gateway serves all three on the same origin. API routes (`/api/...`) win first, the SPA owns `/app/*`, and this site owns everything else at the root.

## Critical deployment quirk

The landing is mounted at the **origin root**, not under a subpath:

- `next.config.ts` does **not** set `basePath` — `basePath: undefined`.
- All absolute URLs (`siteUrl = "https://zira.top"`) live at `/`, not `/landing/`.
- The gateway registers a permanent `/landing/* → /*` 301 redirect to catch legacy URLs from the previous `basePath: "/landing"` deployment (`zira-server/apps/api-gateway/src/main.ts:483`, the `app.use('/landing', …)` handler).
- The mount only activates when `WEB_LANDING_ENABLED=true` and `WEB_LANDING_DIST_DIR` points at an existing directory.

If a refactor reintroduces a `basePath`, you must also update `siteUrl` in `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, and the JSON-LD `sameAs`/`logo` URLs in `src/app/page.tsx`.

## Next.js version note

This repo uses Next.js 16.2.11 with React 19.2.8 (`package.json`). APIs, file conventions, and metadata route shapes may differ from earlier major versions. When in doubt, consult `node_modules/next/dist/docs/` before relying on training-data recall.

## Build output

- `npm run build` emits `./out` — a complete static site with `trailingSlash: true`, so every route is `<route>/index.html`.
- `out/` is the deployment artifact. Rsync it to `WEB_LANDING_DIST_DIR` on the gateway (primary method).
- **Optional secondary deploy**: `npm run deploy:firebase` ships the same `out/` to Firebase Hosting (project `zira-7439c`, default site, `landing` target — see `firebase.json`/`.firebaserc` and README "Optional: Firebase Hosting"). Purely additive; the gateway mount stays canonical, and absolute URLs still point at `https://zira.top`.
- Firebase Analytics (GA4) initializes client-side in production via `src/components/FirebaseAnalytics.tsx` (dynamically imported, prod-only, `isSupported()`-guarded). Don't add a second analytics integration without removing this one.
- No SSR, no edge runtime, no API routes. `output: "export"` rules out `revalidate`, route handlers, `cookies()`, `headers()`, etc. Both metadata routes (`robots.ts`, `sitemap.ts`) set `export const dynamic = "force-static"`.
- `images.unoptimized: true` — there is no `/_next/image` loader. PNGs in `src/assets/images/` are served as-is.

## Primary copy location

`src/lib/content.ts` is the single source of truth for everything user-visible:

- `navLinks` — header nav items.
- `howItWorksFeatures` — 4 steps for `HowItWorks`.
- `readyToRideFeatures` — 3 tiles for `ReadyToRide`.
- `featureTour` — 15 slides for `FeatureTour` (each ties to a PNG via `imageKey`).
- `testimonials` — 6 quotes for `Testimonials` (currently not mounted in `page.tsx`).
- `privacyPolicy` / `termsOfService` — `LegalDocument` bodies rendered by `LegalPage` at `/privacy` and `/terms`. Both share the `CONTACT_EMAIL` and `LAST_UPDATED` constants at the top of the legal block — bump `LAST_UPDATED` whenever you edit either document's `sections`.

Components must read from `content.ts`. Don't inline Vietnamese strings in JSX unless they're fixed UI affordances (aria-labels, button micro-copy) that wouldn't change in a content rewrite.

The whole site is `lang="vi-VN"`. English content is not currently translated — `alternateLocale: ['en_US']` in OG metadata is aspirational.

## Adding a section

1. Create `src/components/sections/MySection.tsx`. Use `Container` for width, `SectionHeader` for the title/description block, and wrap animated children in `Reveal` from `@/components/ui/Reveal`.
2. Add the data (titles, blurbs, image keys) to `src/lib/content.ts` as a new typed export. Don't put strings in the component itself.
3. If the section needs a phone-mockup screenshot, drop the PNG into `src/assets/images/` and (for `FeatureTour`-style carousels) extend the `imageByKey` map in `FeatureTour.tsx`. For one-off use, import directly with `import myImage from '@/assets/images/foo.png'`.
4. Mount the section inside `<main>` in `src/app/page.tsx`. Order matters — it controls scroll flow.
5. If the section needs a header nav entry, add it to `navLinks` in `content.ts` with an `href: "#section-id"` and set the matching `id` on the `<section>` element.
6. If the section needs scroll-triggered animation, prefer `Reveal` — it's SSR-safe, respects `prefers-reduced-motion`, and has a `<noscript>` fallback set up in `layout.tsx`.

## Verification

- `npm run lint` — ESLint with `eslint-config-next`.
- `npm run build` — full static export. Check `out/index.html` for the JSON-LD blocks and `out/robots.txt` / `out/sitemap.xml` for the metadata routes.
- `npm run dev` — local server at `http://localhost:3000`. Tab to a `Reveal`d element, then hit `Cmd-Shift-R` with DevTools "Disable JavaScript" on to verify the no-JS fallback.
- There is no `typecheck` or `test` script (`package.json`). `next build` is the type check — don't claim types pass without running it.
- CI runs exactly `npm ci && npm run lint && npm run build` on Node 24.18.0 (`.github/workflows/landing-ci.yml`). If those two pass locally, CI passes.

## Working agreements for AI agents

Applies to every AI tool in this repo (Claude Code, Codex/`AGENTS.md`, Copilot, Cursor).

- **Copy lives in `src/lib/content.ts`, never in JSX.** The site is Vietnamese-first (`lang="vi-VN"`). The only strings allowed inline are fixed UI affordances — `aria-label`, `alt`, and button micro-copy that wouldn't change in a content rewrite. Page-level `metadata` (title/description) stays in the route file, since it is a Next.js contract, not body copy.
  - Wrong: `<h2>Tính năng nổi bật</h2>` in `MySection.tsx`.
  - Right: `export const mySectionCopy = { heading: "Tính năng nổi bật" }` in `content.ts`, then `<h2>{mySectionCopy.heading}</h2>`.
- **`output: "export"` forbids server-only Next APIs.** No `cookies()`, `headers()`, route handlers (`app/**/route.ts`), `revalidate`, `dynamic = "force-dynamic"`, middleware, or server actions — the build fails or silently drops them. Metadata routes must keep `export const dynamic = "force-static"` (`src/app/robots.ts`, `src/app/sitemap.ts`). Anything needing a server belongs in `zira-server`, called from the browser.
- **`images.unoptimized: true` — there is no `/_next/image` loader.** Import PNGs from `src/assets/images/` so `next/image` gets intrinsic width/height at build time. Never use `<Image fill>` against a remote or unknown-dimension source, and don't add `remotePatterns`/`loader` config expecting optimization.
- **Never invent colours.** Add or extend tokens in the `@theme` block of `src/app/globals.css` (`--color-brand-*`, `--color-accent-*`, `--color-ink*`, `--color-line`, `--color-surface*`), which mirrors `zira-client/projects/app-portal/src/styles/appearance.scss`. If the SPA ramp changes, update `globals.css` to match rather than diverging.
  - Wrong: `className="bg-[#0a7cff]"` — a hard-coded hex that drifts from the SPA.
  - Right: `className="bg-[color:var(--color-brand-500)]"`, the house form used throughout `src/components/ui/Button.tsx`.
  - Pre-existing raw hex survives in `Testimonials.tsx` (unmounted) and one `FeatureTour.tsx` swatch. Don't copy them, and don't bulk-refactor them as part of unrelated work.
- **New route ⇒ register it.** Add the URL to `src/app/sitemap.ts` (currently `/`, `/privacy`, `/terms`) and set `alternates.canonical` in that page's `metadata`, following `src/app/privacy/page.tsx`. `trailingSlash: true` means the emitted file is `out/<route>/index.html`.
- **Never paste or commit secrets.** No API keys, tokens, or credentials in source, docs, or commit messages, and don't read or edit `.env*`. The Firebase config in `src/components/FirebaseAnalytics.tsx` is a public client identifier, not a counterexample — anything server-side (deploy keys, `WEB_LANDING_DIST_DIR` hosts, gateway env) stays out of the repo.
- **Verify before claiming done:** `npm run lint && npm run build`, then confirm `out/index.html` still contains the three JSON-LD blocks and that `out/robots.txt` and `out/sitemap.xml` exist.
- **`CLAUDE.md` and `AGENTS.md` must stay aligned.** `CLAUDE.md` is Claude Code's memory, `AGENTS.md` is the Codex/OpenAI entry point; they carry the same rules. Change one, change the other in the same commit. `ARCHITECTURE.md` is the deeper narrative reference — don't duplicate it here.

## Style

- Tailwind v4. Tokens live in `src/app/globals.css` under `@theme`. Brand colours mirror `zira-client/projects/app-portal/src/styles/appearance.scss` so the landing and the SPA feel like one product. Don't invent new colours — extend the theme.
- Font stack is `Be_Vietnam_Pro` (display + body) with `Roboto` (UI), loaded via `next/font/google` with the Vietnamese subset.
- No CSS modules, no styled-components — Tailwind utility classes everywhere.

## Avoid

- Don't add a `basePath` without coordinating with `zira-server/apps/api-gateway/src/main.ts:466`.
- Don't introduce server-only Next.js APIs (`cookies()`, `headers()`, route handlers, `revalidate`) — they'll break `output: "export"`.
- Don't add images via `next/image` with `<Image fill>` against unknown dimensions — `images.unoptimized: true` means there's no loader to fall back on.
- Don't inline Vietnamese strings in section components — put them in `src/lib/content.ts`.
- Don't bypass `Reveal` for new scroll animations; the no-JS fallback only triggers on elements with `data-reveal`.

## Cross-repo references

- API gateway mount: `zira-server/apps/api-gateway/src/main.ts:466` — `if (config.get<boolean>('webLanding.enabled'))`. Line numbers drift; grep for `webLanding` if it doesn't match.
- Gateway config keys: `zira-server/apps/api-gateway/src/config/configuration.ts:436` (the `webLanding: { enabled, distDir }` block; env vars read at `:280`).
- SPA brand asset referenced by `Organization.logo` JSON-LD: `zira-client/projects/app-portal/src/assets/images/brand_logo_full.png`.
- Brand colour ramp source of truth: `zira-client/projects/app-portal/src/styles/appearance.scss`.
