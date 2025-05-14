"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor, { OnMount } from "@monaco-editor/react";
import { Post, Tag } from "@prisma/client";
import { enumToArray } from "@shuchaoxxx/csc-utils";
import clsx from "clsx";
import { Suspense, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { createPost, updatePost } from "./actions";
import { postFormSchema } from "./type";
// 添加动态加载
// const Editor = dynamic(
//   () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
//   { ssr: false }
// );

type EditorInstance = Parameters<OnMount>[0];
type MonacoInstance = Parameters<OnMount>[1];

enum Language {
  markdown = "markdown",
  javascript = "javascript",
  typescript = "typescript",
  html = "html",
  css = "css",
}

export default function PostForm({
  tags,
  post,
}: {
  tags?: Tag[];
  post?:
    | (Post & { tags?: Tag[]; language?: string; fileName?: string })
    | null
    | undefined;
}) {
  const [fileArr, setFileArr] = useState<
    {
      id: string;
      name: string;
      language: string;
      value: string;
    }[]
  >([
    {
      id: uuidv4(),
      name: "markdown.md",
      language: Language["markdown"],
      value: "## 1",
    },
  ]);

  const [currentFile, setCurrentFile] = useState<{
    id: string;
    name: string;
    language: string;
    value: string;
  }>(fileArr[0]);
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
      published: post?.published ?? false,
      tags: post?.tags?.map((tag) => tag.id.toString()) ?? [],
      language: undefined,
      fileName: undefined,
      files: fileArr,
    },
  });
  const editorRef = useRef<EditorInstance | null>(null);
  const monacoRef = useRef<MonacoInstance | null>(null);
  const handleSave = () => {
    const value = editorRef.current?.getValue();
    console.log("保存内容:", value);
    // 实际保存逻辑...
  };
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    // 注册保存命令
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => {
        handleSave();
        return null; // 阻止默认
      },
      "custom.save"
    );

    // 类型安全的命令扩展
    monaco.editor.addEditorAction({
      id: "enhanced-save",
      label: "智能保存",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: "file",
      contextMenuOrder: 1,
      run: (ed) => {
        handleSave();
        ed.getAction("editor.action.formatDocument")?.run(); // 保存时自动格式化
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          // if (post?.id) {
          //   updatePost({ ...data, id: post.id });
          // } else {
          //   createPost(data);
          // }
        })}
      >
        <div className="flex items-center py-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <Input placeholder="place input title ..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[100px] text-center">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="felx items-center h-[36px]">
                  <FormLabel className="leading-[36px]">发布</FormLabel>
                  <FormControl>
                    <Switch
                      className="leading-[36px]"
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[100px] text-center ">
            <Suspense fallback={<div>loading</div>}>
              <Button type="submit">Submit</Button>
            </Suspense>
          </div>
        </div>
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem className="flex items-center space-x-5 rounded-md py-2 ">
              <div></div>
              {tags?.map((item) => {
                return (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className={clsx(
                          "flex items-start text-center !m-[0px] !mr-5 py-1 px-1 hover:bg-gray-300 rounded-md ",
                          {
                            "bg-blue-100":
                              field.value?.includes(item.id.toString()) ??
                              false,
                          }
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            className="text-center h-[16px] space-y-0"
                            checked={
                              field.value?.includes(item.id.toString()) ?? false
                            }
                            onCheckedChange={(checked) => {
                              const currentValues = field.value ?? [];
                              return checked
                                ? field.onChange([
                                    ...currentValues,
                                    item.id.toString(),
                                  ])
                                : field.onChange(
                                    currentValues.filter(
                                      (value) => value !== item.id.toString()
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer leading-[16px] h-[16px] !m-0 pl-1">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  ></FormField>
                );
              })}
            </FormItem>
          )}
        />
        <div className=" flex items-center gap-2 mb-2 ">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue=""
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {enumToArray(Language).map((item) => {
                      return (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileName"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Title</FormLabel> */}
                <FormControl>
                  <Input placeholder="文件名..." {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className=" w-[60px] border-2 text-center"
            onClick={() => {
              const name = form.getValues()?.fileName;
              const language = form.getValues()?.language;
              if (
                name &&
                fileArr.map((item) => item.name).includes(name as string)
              ) {
                alert("文件已存在");
                return;
              }
              if (name === "") {
                alert("文件名为空");
                return;
              }
              if (name && language) {
                setFileArr([
                  ...fileArr,
                  {
                    id: uuidv4(),
                    name: name,
                    language: language,
                    value: "",
                  },
                ]);
              }
              form.setValue("fileName", "");
              form.setValue("language", "");
            }}
          >
            添加
          </div>
        </div>
        <div className="flex  items-center mb-2">
          {fileArr.map((item, index) => {
            return (
              <div
                className={clsx(
                  "border-2 p-1 flex items-center mr-4 hover:border-indigo-600 cursor-pointer",
                  {
                    "border-indigo-600": currentFile.id === item.id,
                  }
                )}
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  // 关闭默认冒泡事件
                  e.stopPropagation();
                  setCurrentFile(item);
                }}
              >
                <div className="cursor-pointer">{item.name}</div>
                {fileArr.length > 1 && index !== 0 && (
                  <XMarkIcon
                    className="h-4 w-4 ml-1 cursor-pointer hover:text-red-500"
                    aria-hidden="true"
                    onClick={(e) => {
                      if (fileArr.length === 1) {
                        return;
                      }
                      const filtedList = fileArr.filter(
                        (file) => file.id !== item.id
                      );
                      setFileArr(filtedList);
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentFile(fileArr[0]);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  height="40vh"
                  theme="vs-dark"
                  options={{
                    // readOnly: true,
                    minimap: {
                      enabled: false,
                    },
                    fontSize: 14,
                    automaticLayout: true,
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                  onMount={handleEditorMount}
                  path={currentFile.name}
                  // defaultLanguage={currentFile.language}
                  language={currentFile.language}
                  defaultValue={currentFile.value}
                  // value={currentFile.value}
                  onChange={(value) => {
                    setFileArr(
                      fileArr.map((file) => {
                        if (file.id === currentFile.id) {
                          return {
                            ...file,
                            value: value ?? "",
                          };
                        }
                        return file;
                      })
                    );
                    form.setValue("files", fileArr);
                  }}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
