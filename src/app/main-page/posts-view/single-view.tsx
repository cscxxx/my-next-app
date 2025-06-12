"use client";
import { Language } from "@/app/auth-page/posts/type";
import { md } from "@/lib/utils";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { File, Post, Tag, User } from "@prisma/client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { RefObject, useRef, useState } from "react";
import { useFullscreen, useToggle } from "react-use";
// 添加动态加载
const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.Editor),
  { ssr: false }
);
export default function Index({
  post,
}: {
  post: Post & {
    tags: Tag[];
    author: User;
    files: File[];
  };
}) {
  const [current, setCurrent] = useState<File>(post["files"][0]);

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

  // 新增字体大小状态
  const [fontSize, setFontSize] = useState(14);

  // 新增缩放处理函数
  const handleZoom = (type: "in" | "out") => {
    setFontSize((prev) => {
      const newSize = type === "in" ? prev + 1 : prev - 1;
      return Math.min(Math.max(newSize, 12), 24); // 限制12-24px
    });
  };

  return (
    <div
      ref={viewRef}
      className="rounded-md border-[2px]  bg-white overflow-auto"
    >
      <div>
        <div className="flex items-center space-x-10 h-[40px] m-[16px]">
          <div className="text-[30px] text-center font-bold ">{post.title}</div>
          {(post?.tags || []).map((tag) => {
            return <span key={tag.id}>{tag.name}</span>;
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
          {/* 新增缩放控件 */}
          <div className="flex items-center space-x-2">
            <MagnifyingGlassMinusIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleZoom("out")}
            />
            <MagnifyingGlassPlusIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => handleZoom("in")}
            />
          </div>
        </div>
        <div className=" left-0 right-0 border-t border-gray-300 w-full" />
      </div>
      <div className="flex  items-center w-full">
        {post?.files?.map((file) => {
          return (
            <div
              className={clsx(
                "pt-1 px-2 border-[1.5px] border-b-0 space-x-2 mt-2 ml-2  relative rounded-t-md hover:bg-sky-100 hover:text-blue-600 cursor-pointer",
                {
                  " text-blue-600 border-blue-600 bottom-use-hide ":
                    current.id === file.id,
                }
              )}
              key={file.id}
              onClick={() => {
                setCurrent(file);
              }}
            >
              {file.name}
            </div>
          );
        })}
      </div>
      {current &&
        current.language === Language.markdown &&
        current?.id === post?.files?.[0].id && (
          <div
            className={clsx(
              "markdown-content p-2 overflow-auto border-2 rounded-b-md  border-[#2563eb]"
              // {
              //   "bg-sky-100 text-blue-600 border-blue-600":
              //     current?.id === post?.files?.[0].id,
              // }
            )}
            style={{
              fontSize: `${fontSize}px`,
              height: isNotFullscreen
                ? "calc(100vh - 115px)"
                : "calc(100vh - 192px)",
            }} // 应用字体大小
            dangerouslySetInnerHTML={{
              __html: md?.render(post?.files?.[0]?.value ?? ""),
            }}
          />
        )}
      {current &&
        post?.files.length > 1 &&
        current?.id !== post?.files?.[0].id && (
          <div className="p-2  border-2 rounded-b-md  border-[#2563eb] ">
            <Editor
              height={
                isNotFullscreen ? "calc(100vh - 128px)" : "calc(100vh - 210px)"
              }
              theme="vs-dark"
              defaultValue={post?.files?.[0]?.value ?? ""}
              language={current?.language ?? "markdown"}
              value={current?.value ?? ""}
              options={{
                readOnly: true,
                fontSize: fontSize, // 应用字体大小
              }}
            />
          </div>
        )}
    </div>
  );
}
