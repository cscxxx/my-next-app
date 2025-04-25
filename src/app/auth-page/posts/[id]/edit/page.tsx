import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { getAllTags, getPostById } from "../../actions";
import PostForm from "../../post-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const post: Post | null | undefined = await getPostById(Number(id));
  const tags = await getAllTags();
  if (!post) {
    notFound();
  }
  return (
    <main>
      <PostForm tags={tags} post={post}></PostForm>
    </main>
  );
}
