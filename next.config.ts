import type { NextConfig } from "next";

const longTermAssetCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/motion/:path*",
        headers: longTermAssetCache,
      },
      {
        source: "/abilities/:path*",
        headers: longTermAssetCache,
      },
      {
        source: "/classes/:path*",
        headers: longTermAssetCache,
      },
    ];
  },
};

export default nextConfig;
