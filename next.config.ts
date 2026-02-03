import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        source: '/foundation-forensic-courses',
        destination: '/courses/foundation-certificate',
      }
    ]
  }
};

export default nextConfig;
