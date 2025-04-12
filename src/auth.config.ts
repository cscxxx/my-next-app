import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // auth-page 目录下的页面需要登录权限
      const isAuthPage = nextUrl.pathname.startsWith("/auth-page");
      if (isAuthPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      // else if (isLoggedIn) {
      //   return Response.redirect(new URL("/login", nextUrl));
      // }
      // 其他页面不需要登录权限
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
