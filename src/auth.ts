import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/prisma";
import Gitee from "./providers/gitee";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate());

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  experimental: { enableWebAuthn: true },
  providers: [
    GitHub,
    Gitee({
      clientId: process.env.GITEE_CLIENT_ID,
      clientSecret: process.env.GITEE_CLIENT_SECRET,
    }),
  ],
});
