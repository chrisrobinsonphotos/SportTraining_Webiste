import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    qualities: [75, 80, 85, 90],
  },
};

export default nextConfig;
