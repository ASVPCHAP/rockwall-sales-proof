import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/ASVPCHAP/rockwall-sales-proof@*/public/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/ASVPCHAP/rockwall-sales-proof/**",
      },
    ],
  },
};

export default nextConfig;
