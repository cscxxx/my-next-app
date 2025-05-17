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
  const totalPages = await fetchPostsPages(query, 1);
  return (
    <>
      <Suspense key={query + currentPage} fallback={<PostTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="w-full flex items-center justify-center fixed bottom-[0px] z-30 ">
        <Pagination
          className=" p-2 rounded bg-white "
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
