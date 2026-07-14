import type { NextConfig } from "next";

// When deployed to a GitHub Pages *project* site (username.github.io/repo),
// every asset must be served under a /repo prefix. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH to that prefix automatically; it's empty for local
// dev and for a user/org root page (username.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
