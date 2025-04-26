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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, Tag } from "@prisma/client";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost, updatePost } from "./actions";
import { postFormSchema } from "./type";

export default function PostForm({
  tags,
  post,
}: {
  tags?: Tag[];
  post?: (Post & { tags?: Tag[] }) | null | undefined;
}) {
  // 在组件顶部添加状态
  const [isEditorReady, setIsEditorReady] = useState(false);
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
      published: post?.published ?? false,
      tags: post?.tags?.map((tag) => tag.id.toString()) ?? [],
    },
  });

  if (post) {
  }
  console.log(12);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (post?.id) {
            updatePost({ ...data, id: post.id });
          } else {
            createPost(data);
          }
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
              <Button type="submit" className="">
                Submit
              </Button>
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Content</FormLabel> */}
              <FormControl>
                <div>
                  {/* {!isEditorReady && (
                    <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded">
                      编辑器加载中...
                    </div>
                  )} */}
                  <Editor
                    scriptLoading={{
                      //   async: true,
                      defer: true,
                      //   delay: 1000,
                    }}
                    apiKey="wjch2w8wj3lfna049cka51n2r8u2u4y9uanqwadks86758c2"
                    initialValue={post?.content ?? ""}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "codesample",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
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
