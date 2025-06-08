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
  // output: "export",
  // port: 4000,
  devServer: {
    port: 4000,
  },
};

export default nextConfig;
