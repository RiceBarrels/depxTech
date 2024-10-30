/** @type {import('next').NextConfig} */
import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.depxtech.com',
        port: '',
      }
    ],
  },
  experimental: {
    serverActions: true
  }
};

// Only apply autoCert in development
const config = process.env.NODE_ENV === 'development' 
  ? withAutoCert(nextConfig)
  : nextConfig;

export default config;
