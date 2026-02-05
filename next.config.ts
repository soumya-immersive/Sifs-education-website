import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode (from next.config.js)
  reactStrictMode: false,

  // Image configuration - merged from both files
  images: {
    domains: ['localhost', '127.0.0.1', 'sifs.manageprojects.in', 'forensicinstitute.in'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "sifs.manageprojects.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sifs.manageprojects.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "forensicinstitute.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "forensicinstitute.in",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Rewrites - merged from both files
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://forensicinstitute.in/api';
    const uploadsBaseUrl = process.env.NEXT_PUBLIC_UPLOADS_BASE_URL || 'https://forensicinstitute.in/uploads';

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${uploadsBaseUrl}/:path*`,
      },
      {
        source: '/backend/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
      {
        source: '/foundation-forensic-courses',
        destination: '/courses/foundation-certificate',
      }
    ];
  },

  // Headers for cache prevention
  async headers() {
    return [
      {
        // Apply cache-control headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
