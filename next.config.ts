/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: '**.nftstorage.link',
      },
      {
        protocol: 'https',
        hostname: '**.pages.dev',
      },
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
    ],
  },
};

module.exports = nextConfig;
