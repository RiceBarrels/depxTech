/** @type {import('next').NextConfig} */
import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
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
  };

export default withAutoCert(nextConfig);
