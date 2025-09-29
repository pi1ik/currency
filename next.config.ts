import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coingecko.com",
        port: "",
        pathname: "/coins/**",
      },
      {
        protocol: "https",
        hostname: "coingecko.com",
        port: "",
        pathname: "/nft/**",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/nft_contracts/images/**",
      },
    ],
  },
};

export default nextConfig;
