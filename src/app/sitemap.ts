import type { MetadataRoute } from "next";

// `output: "export"` requires metadata routes to be marked static.
export const dynamic = "force-static";

const siteUrl = "https://zira.unicloud.me/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
