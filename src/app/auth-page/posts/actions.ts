"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ITEMS_PER_PAGE = 5;
/**
 * 模糊查询所有文章
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchFilteredPosts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    return prisma.post.findMany({
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
    return await prisma.post.count({
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
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
};

export async function createPost(prevState: any, formState: FormData) {
  const title = formState.get("title");
  const content = formState.get("content");
  const published = formState.get("published");
  const tags = formState.getAll("tags") || [];
  const session = await auth(); // 获取session
  const userId = session?.user?.id; // 获取用户ID

  try {
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
  } catch (error) {
    console.log("Error creating tag:", error);
    return {
      message: "Failed to create tag",
    };
  }

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
      },
    });
    return post;
  } catch (error) {
    console.log("Error deleting post:", error);
  }
}

export async function updatePost(prevState: any, formState: FormData) {
  const id = formState.get("id");
  const title = formState.get("title");
  const content = formState.get("content");
  const published = formState.get("published");
  const tags = formState.getAll("tags") || []; // 确保tags始终是数组

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
