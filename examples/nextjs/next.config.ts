import type { NextConfig } from "next";
import * as path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // The docs app consumes the workspace package through a local file dependency.
    // Keep the repository root visible so Turbopack can follow that junction.
    root: path.resolve(__dirname, "../.."),
  },
  transpilePackages: ["rinjani-ui"],
  experimental: {
    externalDir: true,
  },
  serverExternalPackages: ["shiki"],
};

export default nextConfig;
