import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/seed/MXjcp/2400/276?blur=3"),
    ],
  },
};

export default nextConfig;
