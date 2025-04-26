"use client";
import { useActionState } from "react";
import { createTag } from "../astions";

export default function CreateTag() {
  const [errorMessage, formAction, isPending] = useActionState(
    createTag,
    undefined
  );

  return (
    <form action={formAction}>
      <label htmlFor="name">标案名</label>
      <input type="text" name="name" required className="border"></input>
      <label htmlFor="desc">描述</label>
      <input type="text" name="desc" className="border"></input>
      {/* <input type="select" >  </input>
       */}
      {/* 图标 */}
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
