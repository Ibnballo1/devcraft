import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://picsum.photos/seed/MXjcp/2400/276?blur=3"),
      new URL("https://picsum.photos/seed/bRZezVrv/2014/1251?grayscale&blur=2"),
      new URL("https://picsum.photos/seed/czDDZ/2521/1290?blur=6"),
      new URL("https://picsum.photos/seed/tZRWOuE/3586/2727?blur=9"),
      new URL("https://picsum.photos/seed/YV1mt/1954/2072?grayscale&blur=10"),
      new URL("https://picsum.photos/seed/HMGg9TIwiy/491/515?grayscale&blur=3"),
      new URL("https://picsum.photos/seed/HJheb/1899/2432?blur=7"),
      new URL("https://picsum.photos/seed/nkQQBs/1245/3148?grayscale&blur=2"),
      new URL("https://picsum.photos/seed/4SgvBL/2306/1911?blur=9"),
      // new URL("https://picsum.photos/seed/0yI9NCw8F/1884/2819"),
    ],
  },
};

export default nextConfig;
