import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.STRAPI_HOST_DOMAIN || "localhost",
      },
    ],
  },
};

export default nextConfig;
