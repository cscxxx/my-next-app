import type { NextConfig } from "next";
import '@ant-design/v5-patch-for-react-19';
const withTM = require('next-transpile-modules')(['antd']);

const nextConfig: NextConfig = withTM({
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    turbo: {
      loaders: {
        '.less': ['style-loader', 'css-loader', 'less-loader'],
      },
    },
  },

});

export default nextConfig;
