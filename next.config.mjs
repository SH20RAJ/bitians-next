import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'picsum.photos'],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Polyfills for Node.js modules in Edge runtime
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      http: false,
      https: false,
      stream: false,
      util: false,
      zlib: false,
      fs: false,
      path: false,
      os: false,
      querystring: false,
      url: false,
      assert: false,
      buffer: false,
      events: false,
      net: false,
      tls: false,
      child_process: false,
    };

    return config;
  },
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
