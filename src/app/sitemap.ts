import type { MetadataRoute } from "next";

// `output: "export"` requires metadata routes to be marked static.
export const dynamic = "force-static";

const siteUrl = "https://zira.top";

// Every URL MUST carry a trailing slash. `trailingSlash: true` makes each
// route emit `<route>/index.html` and canonicalize to `<route>/`, so a
// slash-less <loc> here would advertise a URL that differs from the page's
// own `<link rel="canonical">`.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
