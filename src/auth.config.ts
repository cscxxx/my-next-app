import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // 30 分钟
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // 验证会话有效期
      const isSessionValid =
        auth?.expires && new Date(auth.expires).getTime() > Date.now(); // 添加时间戳转换
      const isLoggedIn = !!auth?.user && isSessionValid;
      const isAuthPage = nextUrl.pathname.startsWith("/auth-page");

      if (isAuthPage) {
        // 当会话过期时强制登出
        if (isLoggedIn && !isSessionValid) {
          return NextResponse.redirect(new URL("/login", nextUrl));
        }

        if (isLoggedIn && isSessionValid) return true;

        const newUrl = new URL("/login", nextUrl);
        newUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(newUrl);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // 添加更多你需要的字段
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
