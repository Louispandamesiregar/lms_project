import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/lms_project",
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ]
  },
};

export default nextConfig;
