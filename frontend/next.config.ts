import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["tse3.mm.bing.net", "deep-image.ai", "tse2.mm.bing.net"],
    },
    /* config options here */
    domains: [
        "localhost", // Strapi local images
        "127.0.0.1", // Some browsers use 127.0.0.1 instead of localhost
        "your-production-domain.com", // If deployed, add your Strapi URL here
    ],
};

export default nextConfig;
