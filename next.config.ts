import type { NextConfig } from "next";
import path from "node:path";

// The landing page is mounted at the origin root on the API gateway
// (see `zira-server/apps/api-gateway/src/main.ts`). Requests to
// `/landing/*` are 301-redirected to `/*` to preserve any legacy
// links that may have indexed the previous subpath deployment.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
