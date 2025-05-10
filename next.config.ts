import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // sassOptions: {
  //   implementation: require("sass"),
  // },
  // dbCredentials: {
  //   connectionString: process.env.DATABASE_URL!,
  // },
  // 环境变量
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
