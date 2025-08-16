import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/showcase`
    : undefined,
  trailingSlash: false,
};

export default nextConfig;
