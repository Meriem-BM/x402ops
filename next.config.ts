import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  webpack: (config) => {
    config.externals.push("pino", "pino-pretty", "encoding");
    return config;
  },
};

export default nextConfig;
