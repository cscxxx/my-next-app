import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteTag } from "./astions";

export function CreateTag() {
  return (
    <Link
      href="/auth-page/tags/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Post</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function DeleteTag({ id }: { id: number }) {
  const deleteTagWithId = deleteTag.bind(null, id);
  return (
    <form action={deleteTagWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateTag({ id }: { id: number }) {
  return (
    <Link
      href={`/auth-page/tags/${id}/edit`}
      className="rounded-md w-[100px] border  hover:bg-gray-100 flex items-center justify-center "
    >
      <PencilIcon className="w-[30px]" />
      编辑
    </Link>
  );
}
