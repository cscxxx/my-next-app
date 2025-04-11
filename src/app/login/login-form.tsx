"use client";
import { lusitana } from "@/components/fonts";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { z } from "zod";
import { getUser } from "../api/common/actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/posts";
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "邮箱不能为空" })
      .email({ message: "请输入有效的邮箱地址" }),
    password: z.string().nonempty({ message: "密码不能为空" }).min(6, {
      message: "密码长度至少为 6 位",
    }),
  });

  const [errorMessage, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const validatedFields = formSchema.safeParse({
          email: formData.get("email"),
          password: formData.get("password"),
        });
        if (!validatedFields.success) {
          return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "表单校验失败！",
          };
        }

        const result = await getUser(validatedFields.data.email);
        if (!result) {
          return {
            errors: null,
            message: "登录失败，请检查您的用户名和密码。",
          };
        }
        if (result.password !== validatedFields.data.password) {
          return {
            errors: null,
            message: "登录失败，请检查您的用户名和密码。",
          };
        }
        // 登录成功，跳转到指定页面
        if (result.password === validatedFields.data.password) {
          router.push(callbackUrl || "/posts");
        }
      } catch (error) {
        debugger;
        console.error("登录过程中发生错误:", error);
        return {
          errors: null,
          message: "登录失败，请稍后重试。",
        };
      }
    },
    undefined
  );
  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                // type="email"
                name="email"
                placeholder="Enter your email address"
                // required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {/* 邮箱错误提示 */}
            {errorMessage &&
              errorMessage?.errors?.email?.map((i: string) => {
                return (
                  <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    {i}
                  </div>
                );
              })}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                // required
                // minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errorMessage &&
              errorMessage?.errors?.password?.map((i: string) => {
                return (
                  <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    {i}
                  </div>
                );
              })}
          </div>
        </div>
        <input type="hidden" name="prevState: State," value={callbackUrl} />
        {/* aria-disabled={isPending} */}
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
