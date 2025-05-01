"use client";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { RefObject, useRef } from "react";
import { useFullscreen, useToggle } from "react-use";

export default function Page({ post }: any) {
  const viewRef = useRef<HTMLDivElement>(null);
  const [show, toggle] = useToggle(false);
  const isNotFullscreen = useFullscreen(viewRef as RefObject<Element>, show, {
    onClose: () => toggle(false),
  });

  // 新增格式化函数
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div
      ref={viewRef}
      key={post.id}
      className="relative rounded-lg border-[2px] mb-5 p-2 hover:border-[#2464e8] bg-white "
    >
      <div className="flex items-center space-x-10 h-[40px]">
        <div className="text-[30px] text-center ">{post.title}</div>
        {post.tags.map((tag: any) => {
          return (
            <span key={tag.id} className="">
              {tag.name}
            </span>
          );
        })}
        <div>{post.author.name}</div>
        <div>{post?.date && formatDate(post.date.toString())}</div>
        {isNotFullscreen ? (
          <ArrowsPointingInIcon
            onClick={toggle}
            className="hover:bg-sky-100 hover:text-blue-600 m-2 w-[20px] hover:scale-[1.2]  cursor-pointer rounded-sm "
          />
        ) : (
          <ArrowsPointingOutIcon
            onClick={toggle}
            className="hover:bg-sky-100 hover:text-blue-600 m-2 w-[20px] hover:scale-[1.2]  cursor-pointer rounded-sm "
          />
        )}
        {/* <ArrowsPointingOutIcon
          onClick={toggle}
          className="hover:bg-sky-100 hover:text-blue-600 m-2 w-[20px] hover:scale-[1.2]  cursor-pointer "
        /> */}
      </div>
      <div className="absolute left-0 right-0 border-t border-gray-300 w-full" />
      <div
        className="pt-2"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  );
}
