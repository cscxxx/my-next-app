"use server";
import prisma from "@/lib/prisma";
import { User } from "./definitions";
import { z } from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    formData.append("test1", "value1");
    const formDataObj = Object.fromEntries(formData.entries());
    console.log("formDataObj", formDataObj);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    // 使用 $queryRaw 执行原生 SQL 查询
    const user = await prisma.$queryRaw<
      User[]
    >`SELECT * FROM user WHERE email = ${email} `;
    if (user.length === 0) {
      return undefined;
    }

    return user[0];
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // const user = prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });
    // return user?.rows[0];
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       id: "1",
    //       name: "John Doe",
    //       email: "EMAIL  k",
    //       password: "hashedpassword",
    //     });
    //   });
    // });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function addUser(
  prevState: State,
  formData: FormData
): Promise<State | any> {
  try {
    const FormSchema = z.object({
      id: z.string(),
      email: z
        .string({
          invalid_type_error: "Please select a customer.",
        })
        .min(1, {
          message: "Please select a customer.",
        })
        .email({
          message: "Please enter a valid email address.",
        }),
      password: z.string().min(6, {
        message: "密码至少6位",
      }),
    });
    const CreateInvoice = FormSchema.omit({ id: true });
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);

      return await {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "表单校验失败！",
      };
    }
    // 查询是否已经存在相同的 email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });
    if (existingUser) {
      return {
        message: "邮箱已存在，请使用其他邮箱。",
        errors: {
          email: ["邮箱已存在，请使用其他邮箱。"],
        },
      };
    }

    return await prisma.user.create({
      data: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        posts: {
          create: [],
        },
      },
    });
  } catch (error) {
    console.error("添加用户时出错:", error);
    return {
      message: error,
    };
  }
}
