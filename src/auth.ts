import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import { User } from "@/app/api/common/definitions";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

async function getUser(email: string): Promise<User | undefined | null | any> {
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // 使用prisma
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // const passwordsMatch = await Promise.resolve(
          //   password === user.password
          // );
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
