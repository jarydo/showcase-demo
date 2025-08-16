import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://showcase-demo-jaryd-diamonds-projects.vercel.app/"
      : "",
};

export default nextConfig;
