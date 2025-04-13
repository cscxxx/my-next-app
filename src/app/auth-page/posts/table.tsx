import Image from "next/image";
// import { UpdatePost, DeletePost } from ''
// import InvoiceStatus from "@/app/ui/posts/status";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
// import { fetchFilteredPosts } from "@/app/lib/data";
import { DeletePost, UpdatePost } from "./buttons";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";
import { fetchFilteredPosts } from "./actions";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={post.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${post.name}'s profile picture`}
                      /> */}
                      <p>{post.authorId}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.authorId}</p>
                  </div>
                  <div>{post.published}</div>
                  {/* <InvoiceStatus status={post.status} /> */}
                </div>
                {/* <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(post.amount)}
                    </p>
                    <p>{formatDateToLocal(post.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePost id={post.id} />
                    <DeletePost id={post.id} />
                  </div>
                </div> */}
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {posts?.map((post) => (
                <tr
                  key={post.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={post.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${post.name}'s profile picture`}
                      /> */}
                      <p>{post.authorId}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.content}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatCurrency(post.amount)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatDateToLocal(post.date)} */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <InvoiceStatus status={post.status} /> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div>更新</div>
                      <div>删除</div>
                      {/* <UpdatePost id={post.id} />
                      <DeletePost id={post.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
