import type { NextConfig } from "next";
import path from "node:path";

// The landing page is mounted under `/landing` on the API gateway
// (see `zira-server/apps/api-gateway/src/main.ts`). `basePath` tells
// Next.js to prefix every emitted asset URL with `/landing` so that
// `index.html` references e.g. `/landing/_next/static/chunks/main.js`
// — which resolves correctly when Express strips the `/landing`
// segment before looking the file up inside `out/`.
const basePath = "/landing";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
