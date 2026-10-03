import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
