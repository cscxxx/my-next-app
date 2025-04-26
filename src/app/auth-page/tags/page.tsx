import { Button } from "@/components/ui/button";
import { getTags } from "./astions";
import { CreateTag, DeleteTag, UpdateTag } from "./buttons";

export default async function Tags() {
  const tags = await getTags();
  return (
    <>
      <CreateTag></CreateTag>
      {tags.map((tag) => {
        return (
          <ul>
            <li key={tag.id} className="grid grid-cols-5 ">
              {/* {JSON.stringify(tag)} */}
              <p>{tag.id}</p>
              <p>{tag.name}</p>
              <p>{tag.desc}</p>
              {/* <p>
                {tag.posts.map((title) => {
                  return title.title;
                })}
              </p> */}
              <p>
                <UpdateTag id={tag.id}></UpdateTag>
              </p>
              <DeleteTag id={tag.id}></DeleteTag>
            </li>
          </ul>
        );
      })}
    </>
  );
}
