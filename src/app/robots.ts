import type { MetadataRoute } from "next";

// `output: "export"` (see `next.config.ts`) requires metadata routes to
// be marked static at build time.
export const dynamic = "force-static";

// The landing is mounted at the origin root by the API gateway
// (`zira-server`), so this file lands at `/robots.txt` directly.
const siteUrl = "https://zira.top";

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
