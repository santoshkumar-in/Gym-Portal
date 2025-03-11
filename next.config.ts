import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leadapibucket.s3.ap-south-1.amazonaws.com",
      },
    ],
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "leadapibucket.s3.ap-south-1.amazonaws.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1024mb",
    },
  },
};

export default nextConfig;
