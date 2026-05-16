import type { MetadataRoute } from "next";

// `output: "export"` (see `next.config.ts`) requires metadata routes to
// be marked static at build time.
export const dynamic = "force-static";

// Crawlers fetch /robots.txt from the ORIGIN ROOT — not from the
// `basePath`. With `basePath: "/landing"` this file gets emitted at
// `/landing/robots.txt`, which is non-standard. The API gateway
// (`zira-server`) must also serve `/robots.txt` at the origin root
// — either by mirroring this content or by proxying to
// `/landing/robots.txt`.
const siteUrl = "https://zira.unicloud.me/landing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit allow lines for social/messaging crawlers — redundant
      // with `User-agent: *` but useful if the API gateway or any
      // upstream proxy ever introduces user-agent-specific rules,
      // since the validators report on the specific UA they use.
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "facebookcatalog", allow: "/" },
      { userAgent: "Facebot", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "Slackbot-LinkExpanding", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "Discordbot", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "Zalo", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
