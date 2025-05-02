"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PostFormSchema } from "./type";

let ITEMS_PER_PAGE = 5 as number | undefined;
/**
 * 模糊查询所有文章
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchFilteredPosts(query: string, currentPage?: number) {
  let offset;
  if (currentPage && ITEMS_PER_PAGE) {
    offset = (currentPage - 1) * ITEMS_PER_PAGE;
  } else {
    offset = undefined;
    ITEMS_PER_PAGE = undefined;
  }
  try {
    return prisma?.post?.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
      where: {
        OR: [
          { title: { contains: query } },
          {
            content: { contains: query },
          },
          {
            tags: {
              some: {
                OR: [
                  // { id: { equals: Number(query) } },
                  { name: { contains: query } },
                  { desc: { contains: query } },
                ],
              },
            },
          },
          {
            author: { name: { contains: query } },
          },
        ],
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        tags: {
          select: {
            name: true,
            desc: true,
          },
        },
      },
      // 按照创建时间倒序排序
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
/**
 *  获取文章总页数
 * @param query 模糊查询的关键字
 * @returns
 */
export const fetchPostsPages = async (query: string) => {
  try {
    const count = await prisma.post.count({
      where: {
        OR: [
          { title: { contains: query } },
          {
            content: { contains: query },
          },
          {
            tags: {
              some: {
                OR: [
                  { name: { contains: query } },
                  { desc: { contains: query } },
                ],
              },
            },
          },
          {
            author: { name: { contains: query } },
          },
        ],
      },
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
};

export async function createPost(data: PostFormSchema) {
  const title = data.title;
  const content = data.content;
  const published = data.published;
  const tags = data.tags?.map((item) => Number(item)) || [];
  const session = await auth(); // 获取session
  const userId = session?.user?.id; // 获取用户ID

  // try {
  await prisma.post.create({
    data: {
      title: title as string,
      content: content as string,
      published: Boolean(published),
      author: {
        connect: { id: Number(userId) },
      },
      tags: {
        connect: tags.map((tagId) => ({ id: Number(tagId) })),
      },
    },
  });
  // } catch (error) {
  //   console.log("Error creating tag:", error);
  //   return {
  //     message: "Failed to create tag",
  //   };
  // }

  revalidatePath("/auth-page/posts");
  redirect("/auth-page/posts");
}

export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tags.");
  }
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log("Error deleting post:", error);
  }
  revalidatePath("/auth-page/posts");
}

export async function getPostById(id: number) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        tags: true,
        author: true,
      },
    });
    return post;
  } catch (error) {
    console.log("Error deleting post:", error);
  }
}

export async function updatePost(formState: PostFormSchema & { id: number }) {
  const id = formState.id;
  const title = formState.title;
  const content = formState.content;
  const published = formState.published;
  const tags = formState.tags || []; // 确保tags始终是数组

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return {
        message: "Post not found",
      };
    }

    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: title as string,
        content: content as string,
        published: Boolean(published),
        tags: {
          // set: [], // 清空现有标签
          set: tags.map((tagId) => ({ id: Number(tagId) })),
        },
      },
    });
  } catch (error) {
    console.log("Error updating post:", error);
    // return {
    //   message: "Failed to update post",
    // };
  }
  console.log("tags:", 111);

  revalidatePath("/auth-page/posts");
  redirect("/auth-page/posts");
}
