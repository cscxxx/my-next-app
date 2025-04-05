// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
// import Gitee from "./providers/gitee";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    // GitHub,
    // Gitee({
    //   clientId: process.env.GITEE_CLIENT_ID,
    //   clientSecret: process.env.GITEE_CLIENT_SECRET,
    // }),
  ],
} satisfies NextAuthConfig;
