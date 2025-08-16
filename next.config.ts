import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/showcase" : "",
};

export default nextConfig;
