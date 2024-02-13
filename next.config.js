import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.alphabroder.com',
      },
    ],
  },
};

export default config;
