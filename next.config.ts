import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack(config) {
  //   config.resolve.alias["react-hook-form"] = path.resolve(
  //     __dirname,
  //     "node_modules/react-hook-form"
  //   );
  //   return config;
  // },
  resolve: {
    alias: {
      "react-hook-form": require.resolve("react-hook-form"),
    },
  },
};

export default nextConfig;
