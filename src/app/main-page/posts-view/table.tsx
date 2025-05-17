import { fetchFilteredPosts } from "@/app/auth-page/posts/actions";
import { Post, Tag, User } from "@prisma/client";
import React from "react";
import SingleView from "./single-view";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts: (Post & any)[] = await fetchFilteredPosts(query, currentPage, 1);

  return (
    <div className="rounded-lg p-2 md:pt-0 z-20">
      <div className="md:hidden">
        {posts?.map((post) => (
          <div key={post.id} className=" w-full rounded-md bg-white ">
            <div className="flex items-center justify-between border-b ">
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
              <div className="flex justify-end gap-2"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden min-w-full text-gray-900 md:table ">
        {posts.map((post) => {
          return <SingleView key={`${post.id}-${Date.now()}`} post={post} />;
        })}
      </div>
    </div>
  );
}
