"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTags() {
  try {
    return prisma.tag.findMany({
      include: {
        posts: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags");
  }
}
export async function getTag(id: number) {
  try {
    return prisma.tag.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw new Error("Failed to fetch tags");
  }
}

export async function createTag(prevState: any, formState: any) {
  //   debugger;
  const test = formState.get("name");

  try {
    await prisma.tag.create({
      data: {
        name: formState.get("name"),
        desc: formState.get("desc"),
      },
    });
  } catch (error) {
    console.log("Error creating tag:", error);

    return {
      message: "Failed to create tag",
    };
    // throw new Error("Failed to create tag");
  }

  revalidatePath("/auth-page/tags");
  redirect("/auth-page/tags");
}

export async function deleteTag(id: number) {
  try {
    await prisma.tag.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("Error deleting tag:", error);
    // return {
    //   message: "Failed to delete tag",
    // };
  }
  revalidatePath("/auth-page/tags");
}

export async function updateTag(preState: any, formState: any) {
  try {
    await prisma.tag.update({
      where: {
        id: Number(formState.get("id")),
      },
      data: {
        name: formState.get("name"),
        desc: formState.get("desc"),
      },
    });
  } catch (error) {
    console.log("Error updating tag:", error);
    // return {
    //   message: "Failed to update tag",
    // };
  }
  revalidatePath("/auth-page/tags");
  redirect("/auth-page/tags");
}
