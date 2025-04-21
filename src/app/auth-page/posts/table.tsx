import { fetchFilteredPosts } from "./actions";
import { DeletePost, UpdatePost } from "./buttons";

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
                      <p className="mr-2 rounded-sm">{post?.author.name}</p>
                      <p>{`${post.title}`}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.author.email}</p>
                  </div>
                  <div>{post.published ? "已发布" : " 未发布"}</div>
                  {/* <InvoiceStatus status={post.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {/* {formatCurrency(post.amount)} */}
                    </p>
                    {/* <p>{formatDateToLocal(post.date)}</p> */}
                    {post.content && post.content?.length > 20
                      ? post.content.slice(0, 20) + "..."
                      : post.content}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePost id={post.id} />
                    <DeletePost id={post.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  作者
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  标题
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  内容
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  标签
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  是否已发布
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">操作</span>
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
                      <p>{post.author.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{post.title}</td>
                  <td className="whitespace-nowrap px-3 py-3 overflow-ellipsis ">
                    {/* { post?.content?.length > 20 ? post?.content.slice(0, 20):post?.content} */}
                    {post.content && post.content?.length > 20
                      ? post.content.slice(0, 20) + "..."
                      : post.content}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.tags?.map((tag: any) => {
                      return (
                        <div key={tag.id} className="flex items-center gap-3">
                          <p>{tag.name}</p>
                        </div>
                      );
                    })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.published ? "是" : "否"}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">{post?.date}</td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePost id={post.id} />
                      <DeletePost id={post.id} />
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
