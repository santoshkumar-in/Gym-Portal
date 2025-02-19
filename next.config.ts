import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1024mb",
    },
  },
};

export default nextConfig;
