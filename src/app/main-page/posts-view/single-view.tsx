"use client";
import { Suspense, useCallback, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import ReadEditor from "./read-editor";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export default function Page({ post }: any) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  // 新增格式化函数
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const toggleFullscreen = useCallback(() => {
    if (editorRef.current) {
      // 切换全屏状态
      editorRef.current.execCommand("mceFullScreen");
      // 添加 ESC 按键监听退出
      editorRef.current.on("keydown", (e: KeyboardEvent) => {
        if (
          e.key === "Escape" &&
          editorRef.current?.plugins?.fullscreen?.isFullscreen()
        ) {
          editorRef.current.execCommand("mceFullScreen");
        }
      });
    }
    return () => {
      if (editorRef.current) {
        // 移除 ESC 按键监听
        editorRef.current.off("keydown");
      }
    };
  }, [editorRef.current]);

  return (
    <div key={post.id} className=" rounded-lg ">
      <div className="flex items-center space-x-10 h-[60px] mt-[10px] bg-[#e1f2fe] rounded-lg ">
        <div className="text-[30px] pl-5">{post.title}</div>
        {post.tags.map((tag: any) => {
          return (
            <span key={tag.id} className="px-[6px]">
              {tag.name}
            </span>
          );
        })}
        <div>{post.author.name}</div>
        <div>{post?.date && formatDate(post.date.toString())}</div>
        <ArrowsPointingOutIcon
          onClick={toggleFullscreen}
          className="hover:bg-sky-100 hover:text-blue-600 m-2 w-[20px]"
        />
      </div>
      <Suspense fallback={<div>加载编辑器...</div>}>
        <ReadEditor
          onInit={(_, editor) => {
            editorRef.current = editor; // 直接通过 onInit 回调设置
          }}
          content={post.content}
        />
      </Suspense>
    </div>
  );
}
