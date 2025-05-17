import { getPostById } from "@/app/auth-page/posts/actions";
import { Post, Tag, User } from "@prisma/client";
import { notFound } from "next/navigation";
import SingleView from "../single-view";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const post = await getPostById(Number(id));
  if (!post) {
    notFound();
  }
  return (
    <main className="px-2">
      <SingleView post={post} />
    </main>
  );
}
