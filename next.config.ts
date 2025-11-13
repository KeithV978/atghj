import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'atghj.africa',
        port: '',
        pathname: '/public/**',
      },
      // If you also want to support HTTPS:
      {
        protocol: 'https',
        hostname: 'atghj.africa',
        port: '',
        pathname: '/public/**',
      },
      // Configuration for Pixabay CDN
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/photo/**',
      },
    ], 
  }
};

export default nextConfig;
