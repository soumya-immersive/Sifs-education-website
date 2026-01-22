/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async rewrites() {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
        return [
            {
                source: '/api/:path*',
                destination: `${apiBaseUrl}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
