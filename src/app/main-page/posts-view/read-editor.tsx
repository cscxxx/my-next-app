"use client";

import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";
// 添加类型导入
import type { Editor as EditorTS } from "@tinymce/tinymce-react";
import type { ComponentProps } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

// 通过 ComponentProps 获取属性类型
type EditorProps = ComponentProps<typeof EditorTS>;

// 添加动态加载
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);
interface ReadEditorProps extends EditorProps {
  content?: string;
}

const ReadEditor = forwardRef<TinyMCEEditor, ReadEditorProps>(
  ({ content, ...props }, ref) => {
    const editorRef = useRef<TinyMCEEditor | null>(null);

    useImperativeHandle(ref, () => editorRef.current!);

    return (
      <div>
        <Editor
          apiKey="wjch2w8wj3lfna049cka51n2r8u2u4y9uanqwadks86758c2"
          onInit={(_, editor) => (editorRef.current = editor)}
          disabled={true}
          init={{
            min_height: 100,
            autoresize_bottom_margin: 20,
            autoresize_on_init: true,
            plugins: "autoresize fullscreen",
            menubar: false,
            toolbar: false,
            statusbar: false,
            branding: false,
            resize: false,
            skin: "borderless",
            ...props.init,
          }}
          initialValue={content ?? ""}
          {...props}
        />
      </div>
    );
  }
);

export default ReadEditor;
