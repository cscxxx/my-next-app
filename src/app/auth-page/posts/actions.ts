"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostFormSchema } from "./type";

let ITEMS_PER_PAGE = 5 as number | undefined;
/**
 * 模糊查询所有文章
 * @param query
 * @param currentPage
 * @returns
 */
export async function fetchFilteredPosts(
  query: string,
  currentPage?: number,
  pageSize: number | undefined = 5
) {
  let offset;
  if (currentPage && pageSize) {
    offset = (currentPage - 1) * pageSize;
  } else {
    offset = undefined;
    pageSize = undefined;
  }
  try {
    return prisma?.post?.findMany({
      take: pageSize,
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
            id: true,
            name: true,
            desc: true,
          },
        },
        files: {
          orderBy: {
            sort: "asc",
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
    throw new Error("Failed to fetch posts.");
  }
}
/**
 *  获取文章总页数
 * @param query 模糊查询的关键字
 * @returns
 */
export const fetchPostsPages = async (query: string, pageSize: number = 5) => {
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
    if (!count || !pageSize) {
      return 1;
    }
    return Math.ceil(count / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts pages.");
  }
};

export async function createPost(data: PostFormSchema) {
  const title = data.title;
  const content = data.content;
  const files = data.files;
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
      files: {
        create: files.map((file, index) => ({
          name: file.name,
          language: file.language,
          value: file.value,
          sort: index + 1,
        })),
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
    await prisma.file.deleteMany({
      where: { postId: id },
    });
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
      // 排序
      include: {
        tags: true,
        author: true,
        files: {
          where: {
            postId: id,
          },
          orderBy: {
            sort: "asc",
          },
        },
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
  const files = formState.files || []; // 确保files始终是数组
  const content = formState?.content;
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
          set: tags.map((tagId: any) => ({ id: Number(tagId) })),
        },
        files: {
          deleteMany: { postId: Number(id) }, // 删除现有文件
          create: files.map((file, index) => ({
            name: file.name,
            language: file.language,
            value: file.value,
            sort: index + 1,
          })),
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
