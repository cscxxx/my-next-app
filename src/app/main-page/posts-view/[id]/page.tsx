import { getPostById } from "@/app/auth-page/posts/actions";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import SingleView from "../single-view";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const post: Post | null | undefined = await getPostById(Number(id));
  if (!post) {
    notFound();
  }
  return (
    <main>
      <SingleView post={post} />
    </main>
  );
}
