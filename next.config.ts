import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lms_project",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
