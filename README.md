# Zira Landing

> Vietnamese-first marketing site for the Zira Mini App — a Next.js 16 static export served at the API gateway origin root.

## What is this

`zira-landing` is the public homepage at [`https://zira.top/`](https://zira.top/). It introduces Zira (Zalo Mini App for task, project, sprint, calendar, note and report management) to non-technical users and points them at two entry points: the Zalo Mini App QR code, and the web app at `zira.top/app/`.

The site is a Next.js 16 App Router project built with `output: "export"`. The generated `out/` directory is rsynced to a path on the API gateway server and mounted at the origin root by the gateway's Express bootstrap (`zira-server/apps/api-gateway/src/main.ts:393`). There is no Vercel, no edge runtime, no SSR — every page is plain HTML that the gateway serves with `express.static`.

The landing app (`zira.top/`) and the SPA (`zira.top/app/`) live in the same origin so search engines, social validators, and Zalo deep links see one canonical hostname.

## Quick start

Prereqs: Node.js 20+, npm.

```bash
# install
npm install

# dev — http://localhost:3000
npm run dev

# production build — emits the static site to ./out
npm run build

# lint
npm run lint
```

There are no environment variables. `siteUrl` is hard-coded to `https://zira.top` in [`src/app/layout.tsx`](src/app/layout.tsx), [`src/app/page.tsx`](src/app/page.tsx), [`src/app/robots.ts`](src/app/robots.ts) and [`src/app/sitemap.ts`](src/app/sitemap.ts). If you fork to a different origin, change it in all four places.

## Features

- Mobile-first hero with paired phone mockup and motion reveal — see `Hero`.
- Embedded YouTube product walkthrough — see `WatchVideo`.
- Four-step "how it works" explainer driven by [`src/lib/content.ts`](src/lib/content.ts) — see `HowItWorks`.
- Three-up tool grid for collaboration, drawings and cross-device sync — see `ReadyToRide`.
- 15-slide auto-advancing screen carousel of the in-app UI — see `FeatureTour`.
- Dual download CTA: Zalo Mini App QR code + `zira.top/app/` button — see `DownloadCTA`.
- SEO: Vietnamese metadata, Open Graph, Twitter cards, `robots.txt`, `sitemap.xml`, and three JSON-LD blocks (`SoftwareApplication`, `Organization`, `WebSite`).

## Repository structure

```
zira-landing/
├── public/                     # static assets copied verbatim to out/
│   ├── favicon*, apple-icon*   # full icon set for iOS / Android / Win
│   ├── og-image.png            # Open Graph + Twitter card image
│   ├── manifest.json
│   └── browserconfig.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root layout, fonts, metadata, viewport
│   │   ├── page.tsx            # composes the single landing page
│   │   ├── globals.css         # Tailwind v4 @theme tokens
│   │   ├── robots.ts           # static /robots.txt
│   │   └── sitemap.ts          # static /sitemap.xml
│   ├── assets/images/          # phone-mockup screenshots (001.png–015.png)
│   ├── components/
│   │   ├── sections/           # one file per landing section
│   │   └── ui/                 # Container, Button, Icon, PhoneMockup, Reveal, …
│   └── lib/
│       └── content.ts          # ALL Vietnamese copy + slide data
├── out/                        # build output — deployed as-is
├── next.config.ts              # output: "export", trailingSlash, unoptimized images
├── tsconfig.json               # @/* → src/*
└── package.json
```

## Documentation index

- [ARCHITECTURE.md](ARCHITECTURE.md) — SSG model, section components, gateway mount, SEO, motion strategy.
- [CLAUDE.md](CLAUDE.md) — agent-facing project memory.
- [AGENTS.md](AGENTS.md) — Codex/OpenAI tooling rules.

## Development

Edit copy in [`src/lib/content.ts`](src/lib/content.ts). Everything user-visible — nav labels, feature blurbs, slide titles and image captions — lives there. Components read from it; no string lives in JSX unless it's a fixed UI label that won't change with content rewrites.

Add a new section by creating `src/components/sections/MySection.tsx`, importing `Container`, `Reveal`, and `SectionHeader` from `@/components/ui`, then mounting it inside `<main>` in [`src/app/page.tsx`](src/app/page.tsx). Add a `navLinks` entry in `content.ts` if it should appear in the header nav.

Phone-mockup screenshots are PNGs in `src/assets/images/` numbered `001`–`015`. To add a new one, drop the PNG in, import it in [`src/components/sections/FeatureTour.tsx`](src/components/sections/FeatureTour.tsx) (the `imageByKey` map), and add a `FeatureTourSlide` entry in `content.ts` with a matching `imageKey`.

The site uses Tailwind v4 with the `@theme` block in [`src/app/globals.css`](src/app/globals.css). The brand colour ramp mirrors the SPA's `appearance.scss` (Zalo blue `#0a7cff`), so the landing and the app feel like one product.

## Deployment

1. Run `npm run build` — produces `./out` (an HTML/CSS/JS tree with `trailingSlash: true`, so every route is `<route>/index.html`).
2. Rsync `out/` to the API gateway server at the path pointed to by `WEB_LANDING_DIST_DIR` (see `zira-server/.env.example:101` — typically `/opt/zira-staging/apps/api-gateway/web-landing`).
3. The gateway picks the directory up at boot when `WEB_LANDING_ENABLED=true`. No restart is required for content-only changes — `express.static` reads from disk on each request.

The gateway also registers a permanent `/landing/*` → `/*` 301 redirect for legacy URLs from the previous `basePath: "/landing"` deployment (see [ARCHITECTURE.md](ARCHITECTURE.md#gateway-mount)).

## License

Internal project. Not currently licensed for external use.
