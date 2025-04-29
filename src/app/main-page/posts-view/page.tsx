import { fetchPostsPages } from "@/app/auth-page/posts/actions";
import { PostTableSkeleton } from "@/components/skeletons";
import { Suspense } from "react";
import Table from "./table";
import Pagination from "@/app/auth-page/posts/pagination";

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
    <>
      <Suspense key={query + currentPage} fallback={<PostTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="py-[5px] flex w-full justify-center fixed bottom-[0px] bg-white z-30 ">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
