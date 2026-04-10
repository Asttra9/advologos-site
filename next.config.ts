import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Optimize for production: reduce serverless function cold starts
  // Pages marked as force-static skip SSR entirely
  poweredByHeader: false,
  reactStrictMode: false,
  // Reduce bundle analysis overhead
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
