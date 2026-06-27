# Zira Landing — Architecture

> How `zira-landing` is built, composed, served, and indexed.

## Overview

`zira-landing` is a single-page Next.js 16 (App Router) site compiled to a static export and served by the Zira API gateway at the origin root. It exists to convert Vietnamese-speaking visitors into Zalo Mini App users. The entire page is one route (`/`) composed from section components in `src/components/sections/`, with copy centralised in `src/lib/content.ts`. There is no SSR, no API route, no per-request work — every byte the browser receives is a static file authored at build time.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router, `output: "export"`) |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4 (`@theme` block in `globals.css`) |
| Motion | `motion/react` (Framer Motion successor) with `useReducedMotion` |
| Fonts | `Be_Vietnam_Pro` + `Roboto` via `next/font/google` (Vietnamese subset) |
| Icons | Hand-rolled SVGs in `components/ui/Icon.tsx` |
| Lint | `eslint-config-next` |

`package.json` has no test runner, no CSS framework beyond Tailwind, and no UI library — keeping the dependency surface small enough to ship in a few hundred KB.

## Static export model

[`next.config.ts`](next.config.ts) sets three flags that shape the entire build:

```
output: "export"        // emit a static site to ./out, no Node runtime
trailingSlash: true     // every route becomes <route>/index.html
images: { unoptimized: true }  // no /_next/image loader — PNGs ship as-is
```

`output: "export"` means dynamic features (route handlers, `revalidate`, `headers()`, `cookies()`) are unavailable. The two metadata routes that *do* exist — [`src/app/robots.ts`](src/app/robots.ts) and [`src/app/sitemap.ts`](src/app/sitemap.ts) — both `export const dynamic = "force-static"` so Next emits them as plain `robots.txt` and `sitemap.xml` at build time.

`trailingSlash: true` keeps the static file layout deterministic: `out/index.html`, `out/about/index.html`, etc. The gateway's `express.static` can serve them with no rewrite layer.

`images.unoptimized: true` is required because there is no Next runtime to optimise images on the fly. PNGs in `src/assets/images/` are copied straight into `_next/static/media/` and referenced with their natural dimensions.

## Page composition

The landing is one route — `src/app/page.tsx` — that mounts JSON-LD blocks then renders sections in this order:

```
<Header />
<main>
  <Hero />              # tagline + CTA + phone mockup
  <WatchVideo />        # YouTube embed (lazy iframe)
  <HowItWorks />        # 4-step explainer, copy from content.ts
  <ReadyToRide />       # 3 collaboration / drawing / sync tiles
  <FeatureTour />       # auto-advancing 15-slide screen carousel
  <DownloadCTA />       # Zalo QR + zira.top/app/ button
</main>
<Footer />
```

Sections are deliberately presentational. They import data from [`src/lib/content.ts`](src/lib/content.ts) (`navLinks`, `howItWorksFeatures`, `readyToRideFeatures`, `featureTour`, `testimonials`) and shared atoms from `components/ui/` (`Container`, `Button`, `Icon`, `Logo`, `PhoneMockup`, `SectionHeader`, `Reveal`). Adding a new section is a matter of writing one file, adding a row to `content.ts`, and mounting it in `page.tsx`.

`Testimonials` exists in `components/sections/` but is currently not mounted in `page.tsx`. It can be re-enabled by importing it and dropping it into the `<main>` flow.

## Gateway mount

The API gateway hosts the static export at the origin root (`zira.top/`). The mount lives in `zira-server/apps/api-gateway/src/main.ts:393`:

```
WEB_LANDING_ENABLED=true
WEB_LANDING_DIST_DIR=/opt/zira-staging/apps/api-gateway/web-landing
```

When both are set and the directory exists, the gateway:

1. Registers a permanent `app.use('/landing', (req, res) => res.redirect(301, req.url))` for legacy links from the previous `basePath: "/landing"` deployment.
2. Mounts `express.static(WEB_LANDING_DIST_DIR)` at the root, with `index: 'index.html'` and `extensions: ['html']` semantics so `/` serves `out/index.html` and `/foo/` serves `out/foo/index.html`.
3. Lets API routes (`/api/v1/...`) take precedence — they are registered before the static mount, so the landing never shadows the API.

This is why `next.config.ts` does **not** set `basePath`. The landing assumes it owns `/`. If a future deployment moves it under a subpath, both `basePath` in `next.config.ts` and the absolute URLs in `siteUrl` need updating.

```
                       zira.top (gateway)
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   /api/v1/...           /app/* (SPA)        /  (this repo)
   NestJS controllers    Angular bundle      out/index.html
                         from zira-client    out/_next/...
```

## SEO

Everything that crawlers need is rendered into static HTML — no JS execution required.

- **Document metadata** lives in [`src/app/layout.tsx`](src/app/layout.tsx). The `Metadata` export covers `title`, `description`, Vietnamese `keywords`, `alternates.languages` (`vi-VN` canonical), `openGraph` (with `secureUrl` PNG, `width`/`height`, `locale: vi_VN`, `alternateLocale: ['en_US']`), `twitter` summary-large-image card, full `icons` set for every Apple/Android/Win tile size, and `manifest: '/manifest.json'`.
- **`og:logo`** is set manually in `<head>` because it's not in the official OG spec but some Vietnamese/Zalo validators expect it (`layout.tsx:157`).
- **`robots.txt`** ([`src/app/robots.ts`](src/app/robots.ts)) allows all crawlers and lists explicit allow lines for `facebookexternalhit`, `Twitterbot`, `LinkedInBot`, `Slackbot`, `Discordbot`, `TelegramBot`, `WhatsApp`, `Zalo` — redundant with `User-agent: *` but useful as a paper trail when validators report on the UA they tested.
- **`sitemap.xml`** ([`src/app/sitemap.ts`](src/app/sitemap.ts)) lists the single `/` URL with `priority: 1` and `changeFrequency: "weekly"`.
- **JSON-LD** ([`src/app/page.tsx`](src/app/page.tsx)) emits three `<script type="application/ld+json">` blocks at the top of the page: `SoftwareApplication` (with `featureList`, free `Offer` in VND, `sameAs: ['https://zira.top/app/']`), `Organization` (with `logo` pointing at the SPA's brand asset), and `WebSite`. They're injected via `dangerouslySetInnerHTML` and marked `suppressHydrationWarning` so React 19 strict hydration ignores whitespace drift.

## Motion strategy

Animations are scroll-triggered reveals and one carousel transition, implemented with `motion/react`. The defining constraint: **the page must look right with JS disabled**.

[`src/components/ui/Reveal.tsx`](src/components/ui/Reveal.tsx) is the shared primitive. It wraps content in `motion.<tag>` with `initial={{ opacity: 0, ... }}` and `whileInView={{ opacity: 1, ... }}`. Three safety nets:

1. **SSR-safe content**: the children are always present in the rendered HTML — only their opacity/transform changes.
2. **`prefers-reduced-motion`**: `useReducedMotion()` short-circuits to a plain tag with no animation props.
3. **No-JS fallback**: `layout.tsx` injects `<noscript><style>[data-reveal]{opacity:1!important;transform:none!important}</style></noscript>`, so users without JS see the final state. The `data-reveal` attribute is stamped on every `Reveal` wrapper for this purpose.

[`FeatureTour`](src/components/sections/FeatureTour.tsx) is the one stateful section. It uses `AnimatePresence` with direction-aware `phoneVariants` (incoming slide enters from the side the user is "moving toward"), auto-advances every 6 s with a `setInterval`, supports `ArrowLeft`/`ArrowRight` keyboard nav, and exposes `role="tablist"` for the dot indicators. `useReducedMotion` collapses the slide transition to a plain crossfade.

`Reveal` uses a pre-built `motionTags` lookup (`motion.div`, `motion.h1`, etc.) instead of `motion.create(tag)` because Motion warns when components are created during render. Adding a new tag requires extending that map.

## Tailwind theme

[`src/app/globals.css`](src/app/globals.css) imports Tailwind and declares the design tokens in a single `@theme` block. The brand ramp (`--color-brand-50` → `--color-brand-600`) mirrors `zira-client`'s `appearance.scss` (Zalo blue `#0a7cff`, action primary `#006af5`) so the landing and the in-app UI feel visually continuous. `--color-accent-500` (`#9d70f8`) echoes the SPA's onion-purple gradient overlay.

Font CSS variables (`--font-be-vietnam-pro`, `--font-roboto`) are set on `<html>` by `next/font/google` in `layout.tsx`, and consumed by `--font-display` / `--font-ui` in the theme. The Vietnamese subset is loaded explicitly.

## Code map

| File | Purpose |
|---|---|
| `next.config.ts:8` | `output: "export"`, `trailingSlash`, `unoptimized` images |
| `src/app/layout.tsx:27` | Root `Metadata`, OG, Twitter, icons, `lang="vi-VN"` |
| `src/app/layout.tsx:161` | `<noscript>` reveal fallback |
| `src/app/page.tsx:14` | Three JSON-LD blocks + section composition |
| `src/app/robots.ts:11` | Static `robots.txt` with per-bot allow lines |
| `src/app/sitemap.ts:8` | Static `sitemap.xml` (single `/` entry) |
| `src/app/globals.css:3` | Tailwind v4 `@theme` tokens (brand, accent, fonts, radii, shadows) |
| `src/lib/content.ts:1` | All Vietnamese copy: nav, how-it-works, ready-to-ride, feature tour, testimonials |
| `src/components/sections/Hero.tsx:12` | Hero + HeroShine blur backdrop |
| `src/components/sections/FeatureTour.tsx:78` | 15-slide carousel, auto-advance, keyboard nav, reduced-motion handling |
| `src/components/sections/DownloadCTA.tsx:13` | QR code + `zira.top/app/` dual entry point |
| `src/components/ui/Reveal.tsx:85` | `whileInView` reveal primitive with reduced-motion + no-JS fallbacks |
| `zira-server/apps/api-gateway/src/main.ts:393` | Gateway mount: `/landing` 301 + `express.static(WEB_LANDING_DIST_DIR)` |
| `zira-server/apps/api-gateway/src/config/configuration.ts:207` | `WEB_LANDING_ENABLED` / `WEB_LANDING_DIST_DIR` config keys |
