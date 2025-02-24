/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "127.0.0.1", "your-production-domain.com"], // Allow local and production images
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**", // Allow all images from Strapi
            },
        ],
    },
};

export default nextConfig;
