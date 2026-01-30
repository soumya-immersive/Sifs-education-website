/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
            },
            {
                protocol: 'https',
                hostname: 'sifs.manageprojects.in',
            },
        ],
    },

    async rewrites() {
        const apiBaseUrl =
            process.env.NEXT_PUBLIC_API_BASE_URL ??
            'https://sifs.manageprojects.in/api';

        return [
            {
                source: '/backend/:path*',
                destination: `${apiBaseUrl}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
