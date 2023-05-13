/** @type {import('next').NextConfig} */

const { patchWebpackConfig } = require('next-global-css')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    patchWebpackConfig(config, options);
    return config;
  },
  publicRuntimeConfig: {
    NASA_API_KEY: process.env.NASA_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/apod/**',
      },
    ],
  },
  headers: () => [
    {
      source: '/api/Neows',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  
}

module.exports = nextConfig


  
