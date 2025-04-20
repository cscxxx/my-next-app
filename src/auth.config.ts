import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { signOut } from "./auth";
// 通用日期格式化函数
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const time1 = new Date(auth?.expires).getTime();
      const time2 = Date.now();
      // / 使用示例（假设 time1 和 time2 是时间戳）：
      const formattedTime1 = formatTimestamp(time1);
      const formattedTime2 = formatTimestamp(time2);
      // 验证会话有效期
      const isSessionValid =
        auth?.expires && new Date(auth.expires).getTime() > Date.now(); // 添加时间戳转换
      const isLoggedIn = !!auth?.user && isSessionValid;
      const isAuthPage = nextUrl.pathname.startsWith("/auth-page");

      if (isAuthPage) {
        // 当会话过期时强制登出
        if (isLoggedIn && !isSessionValid) {
          const response = NextResponse.redirect(new URL("/login", nextUrl));
          // signOut({ redirectTo: "/login" }); // 调用 signOut 函数
          // response.cookies.delete("next-auth.session-token"); // 删除 cookie
          // return response;
        }

        if (isLoggedIn && isSessionValid) return true;

        const newUrl = new URL("/login", nextUrl);
        newUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(newUrl);
      }

      // 添加登录后的重定向处理
      if (isLoggedIn) {
        const callbackUrl = nextUrl.searchParams.get("callbackUrl") || "/";
        return Response.redirect(new URL(callbackUrl, nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
