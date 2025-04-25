import { getAllTags } from "../actions";
import PostForm from "../post-form";

export default async function CreatePost() {
  const tags = await getAllTags();
  return <PostForm tags={tags}></PostForm>;
}
