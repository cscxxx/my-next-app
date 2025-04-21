"use client";
import { useActionState } from "react";
import { updatePost } from "../../actions";

export default function EditForm({ post, allTags }: any) {
  const [data, formAction, isPending] = useActionState(updatePost, undefined);
  return (
    <form action={formAction}>
      <fieldset className="grid grid-cols-1 ">
        <input type="hidden" name="id" value={post.id} />
        {/* 添加隐藏的id字段 */}
        <label htmlFor="title">
          标题:
          <input
            type="text"
            id="title"
            name="title"
            required
            className="border"
            defaultValue={post.title}
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
                value="1"
                defaultChecked={post.published} // 如果published为true，则选中
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
                defaultChecked={!post.published} // 如果published为false，则选中
              />
            </label>
          </div>
        </div>
        <div className="flex">
          <div>标签:</div>
          {allTags &&
            allTags.map((tag: any) => {
              return (
                <label key={tag.id} htmlFor={String(tag.id)}>
                  <input
                    type="checkbox"
                    id={String(tag.id)}
                    name="tags"
                    value={tag.id}
                    defaultChecked={post.tags
                      .map((item: any) => item.id)
                      .includes(tag.id)}
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
            defaultValue={post.content}
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
