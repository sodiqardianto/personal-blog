import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.sodiqardianto.com",
      },
    ],
  },
};

export default nextConfig;
