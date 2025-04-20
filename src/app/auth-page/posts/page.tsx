import { Suspense } from "react";
import { Metadata } from "next";
import { lusitana } from "@/components/fonts";
import Search from "./search";
import { CreatePost } from "./buttons";
import { PostTableSkeleton } from "@/components/skeletons";
import Table from "./table";
import { fetchPostsPages } from "./actions";
import Pagination from "./pagination";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          Posts{JSON.stringify(totalPages)}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search posts..." />
        <CreatePost />
      </div>
      <Suspense key={query + currentPage} fallback={<PostTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
