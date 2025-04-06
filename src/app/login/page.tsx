// import { auth } from "@/auth";
import CscLogo from "@/components/csc-logo";
// import LoginForm from '@/app/ui/login-form';
import { Suspense } from "react";
import LoginForm from "./login-form";

export default async function LoginPage() {
  // debugger;
  // const session = await auth();
  // if (!session) {
  //   return <div>Not authenticated</div>;
  // }
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <CscLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
