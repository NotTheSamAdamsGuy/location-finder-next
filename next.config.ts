import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Matches requests starting with /api/
        destination: 'http://localhost:3000/:path*', // Proxies to your backend server running on port 3000
      },
    ];
  },
}

export default nextConfig;
