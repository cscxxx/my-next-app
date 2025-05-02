"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchFilteredPosts } from "../auth-page/posts/actions";

type DataType = {
  author: {
    name: string | null;
    email: string;
  };
  tags: {
    // id: number;
    name: string;
    desc: string | null;
  }[];
} & {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
  date: Date | null;
};

export default () => {
  const path = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const ref = useRef<HTMLFormElement>(null);
  const handleSearch = useDebouncedCallback(async (term) => {
    const res = await fetchFilteredPosts(term);
    setDataList(res);
  }, 300);
  return (
    <div className="w-full relative ">
      <form
        ref={ref}
        action={() => {
          // console.log("search");
        }}
        // 修改 onSubmit 处理函数
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchStr = formData.get("searchStr") as string;
          handleSearch(searchStr);
        }}
        className={clsx("w-full flex items-center border-2 rounded-md pr-5", {
          "border-blue-600": isFocused,
        })}
      >
        <MagnifyingGlassIcon
          height={25}
          onClick={() => {
            ref.current?.requestSubmit(); // 新增提交触发
          }}
          className=" px-2 cursor-pointer"
        />
        <input
          name="searchStr"
          placeholder="Search..."
          className="w-full h-[48px] !focus:border-none outline-none"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            ref.current?.requestSubmit(); // 新增提交触发
          }}
        />
      </form>
      {dataList?.length > 0 && (
        <div
          className=" absolute w-full rounded-sm p-2 bg-white"
          onMouseLeave={() => setDataList([])}
        >
          {dataList.map((item) => {
            return (
              <Link
                key={item.id}
                className={clsx(
                  "flex h-[30px] grow items-center gap-2 rounded-md bg-gray-50  text-sm font-medium hover:bg-sky-100 hover:text-blue-600 p-2 px-3",
                  {
                    "bg-sky-100 text-blue-600": path.includes(
                      item.id.toString()
                    ),
                  }
                )}
                href={`/main-page/posts-view/${item.id}`}
              >
                {item.title}
                {item?.tags?.map((i) => {
                  return <span key={i.name}>{i?.name}</span>;
                })}
                {item?.author?.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
