import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        action={async () => {
          "use server";
          // 登录完成后，重定向到user页面
          await signIn("github", { redirectTo: "/user" });
        }}
      >
        <Button>github登录</Button>
      </form>
    </main>
  );
}
