"use client";
import { useActionState, useEffect, useState } from "react";
import { createPost, getAllTags } from "../actions";

export default function CreateTag() {
  const [tags, setTags] = useState<any>([]);
  useEffect(() => {
    getAllTags().then((res) => {
      setTags(res);
    });
  }, []);

  const [errorMessage, formAction, isPending] = useActionState(
    createPost,
    undefined
  );

  return (
    <form action={formAction}>
      <fieldset className="grid grid-cols-1 ">
        <label htmlFor="title">
          标题:
          <input
            type="text"
            id="title"
            name="title"
            required
            className="border"
          ></input>
        </label>
        <div className="flex">
          <div>是否发布：</div>
          <div>
            <label htmlFor="publish1">
              是:
              <input
                type="radio"
                id="publish1"
                name="published"
                className="border"
                value={1}
              />
            </label>
            <label htmlFor="publish2">
              否
              <input
                type="radio"
                id="publish2"
                name="published"
                className="border"
                value="0"
              />
            </label>
          </div>
        </div>
        <div className="flex">
          <div>标签:</div>
          {tags &&
            tags.map((tag: any) => {
              return (
                <label key={tag.id} htmlFor={String(tag.id)}>
                  <input
                    type="checkbox"
                    id={String(tag.id)}
                    name="tags"
                    value={tag.id}
                  ></input>
                  {tag.name}
                </label>
              );
            })}
        </div>
        <label htmlFor="content">
          内容
          <textarea
            id="content"
            name="content"
            required
            className="border resize" // 允许水平和垂直调整
            style={{
              minWidth: "300px",
              maxWidth: "800px",
              minHeight: "100px",
              width: "100%",
              height: "400px",
            }}
            maxLength={100}
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-[100px] text-white font-bold  px-4 rounded"
          disabled={isPending}
        >
          提交
        </button>
      </fieldset>
    </form>
  );
}
