import type { NextConfig } from "next";
import * as path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  transpilePackages: ["rinjani-ui"],
  experimental: {
    externalDir: true,
  },
  serverExternalPackages: ["shiki"],
};

export default nextConfig;
