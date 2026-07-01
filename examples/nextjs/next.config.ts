import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["rinjani-ui"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
