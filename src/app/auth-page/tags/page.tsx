import { Button } from "@/components/ui/button";
import { getTags } from "./astions";
import { CreateTag, DeleteTag, UpdateTag } from "./buttons";

export default async function Tags() {
  const tags = await getTags();
  console.log(tags);

  if (tags.length === 0) {
    return <p>No tags found</p>;
  }
  return (
    <>
      <CreateTag></CreateTag>
      <div className="flex flex-col mt-4 rounded-md bg-[#f9fafb] ">
        {tags.map((tag) => {
          if (!tag?.id) {
            console.log("no tag found");

            // return <p>no tag found</p>;
          }
          console.log(tag.id);

          return (
            <ul key={tag.id} className="p-2 rounded-md">
              <li className="grid grid-cols-5 items-center bg-slate-100 p-2 rounded-md justify-center gap-2 hover:bg-[#e1f2fe]">
                <p>{tag.id}</p>
                <p>{tag.name}</p>
                <p>{tag.desc}</p>
                <p>
                  <UpdateTag id={tag.id}></UpdateTag>
                </p>
                <DeleteTag id={tag.id}></DeleteTag>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
