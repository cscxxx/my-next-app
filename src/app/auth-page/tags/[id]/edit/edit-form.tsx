"use client";
import { useActionState } from "react";
import { updateTag } from "../../astions";

export default function EditForm({ tag }: any) {
  // const updateTagWidthId =
  const [data, formAction, isPending] = useActionState(updateTag, undefined);
  return (
    <form action={formAction}>
      {/* <label htmlFor="id">id</label> */}
      <input
        type="number"
        name="id"
        hidden
        defaultValue={tag?.id}
        required
        className="border"
      ></input>
      <label htmlFor="name">标案名</label>
      <input
        type="text"
        name="name"
        defaultValue={tag?.name}
        required
        className="border"
      ></input>
      <label htmlFor="desc">描述</label>
      <input
        type="text"
        name="desc"
        defaultValue={tag?.desc}
        className="border"
      ></input>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isPending}
      >
        提交
      </button>
    </form>
  );
}
