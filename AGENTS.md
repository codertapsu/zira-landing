# Zira Landing — agent guide

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
- The gateway registers a permanent `/landing/* → /*` 301 redirect to catch legacy URLs from the previous `basePath: "/landing"` deployment (`zira-server/apps/api-gateway/src/main.ts:421`).
- The mount only activates when `WEB_LANDING_ENABLED=true` and `WEB_LANDING_DIST_DIR` points at an existing directory.

If a refactor reintroduces a `basePath`, you must also update `siteUrl` in `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, and the JSON-LD `sameAs`/`logo` URLs in `src/app/page.tsx`.

## Next.js version note

This repo uses Next.js 16.2 with React 19. APIs, file conventions, and metadata route shapes may differ from earlier major versions. When in doubt, consult `node_modules/next/dist/docs/` before relying on training-data recall.

## Build output

- `npm run build` emits `./out` — a complete static site with `trailingSlash: true`, so every route is `<route>/index.html`.
- `out/` is the deployment artifact. Rsync it to `WEB_LANDING_DIST_DIR` on the gateway.
- No SSR, no edge runtime, no API routes. `output: "export"` rules out `revalidate`, route handlers, `cookies()`, `headers()`, etc. Both metadata routes (`robots.ts`, `sitemap.ts`) set `export const dynamic = "force-static"`.
- `images.unoptimized: true` — there is no `/_next/image` loader. PNGs in `src/assets/images/` are served as-is.

## Primary copy location

`src/lib/content.ts` is the single source of truth for everything user-visible:

- `navLinks` — header nav items.
- `howItWorksFeatures` — 4 steps for `HowItWorks`.
- `readyToRideFeatures` — 3 tiles for `ReadyToRide`.
- `featureTour` — 15 slides for `FeatureTour` (each ties to a PNG via `imageKey`).
- `testimonials` — quotes for `Testimonials` (currently not mounted).

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

## Style

- Tailwind v4. Tokens live in `src/app/globals.css` under `@theme`. Brand colours mirror `zira-client/projects/app-portal/src/styles/appearance.scss` so the landing and the SPA feel like one product. Don't invent new colours — extend the theme.
- Font stack is `Be_Vietnam_Pro` (display + body) with `Roboto` (UI), loaded via `next/font/google` with the Vietnamese subset.
- No CSS modules, no styled-components — Tailwind utility classes everywhere.

## Avoid

- Don't add a `basePath` without coordinating with `zira-server/apps/api-gateway/src/main.ts:393`.
- Don't introduce server-only Next.js APIs (`cookies()`, `headers()`, route handlers, `revalidate`) — they'll break `output: "export"`.
- Don't add images via `next/image` with `<Image fill>` against unknown dimensions — `images.unoptimized: true` means there's no loader to fall back on.
- Don't inline Vietnamese strings in section components — put them in `src/lib/content.ts`.
- Don't bypass `Reveal` for new scroll animations; the no-JS fallback only triggers on elements with `data-reveal`.

## Cross-repo references

- API gateway mount: `zira-server/apps/api-gateway/src/main.ts:393`.
- Gateway config keys: `zira-server/apps/api-gateway/src/config/configuration.ts:207`.
- SPA brand asset referenced by `Organization.logo` JSON-LD: `zira-client/projects/app-portal/src/assets/images/brand_logo_full.png`.
- Brand colour ramp source of truth: `zira-client/projects/app-portal/src/styles/appearance.scss`.
