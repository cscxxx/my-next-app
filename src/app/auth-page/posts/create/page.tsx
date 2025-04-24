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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "@prisma/client";
import {
  startTransition,
  Suspense,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost, getAllTags } from "../actions";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
  published: z.boolean(),
  tags: z.array(z.string()).optional(),
});

export default function CreatePost() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current?.getContent());
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
      tags: [],
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    getAllTags().then((res) => {
      setTags(res);
    });
  }, []);

  // const [errorMessage, formAction] = useActionState(createPost, undefined);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          // formAction(data);
          // console.log(data);
          createPost(data);
        })}

        // action={(formData) => {
        //   // 触发客户端校验
        //   form.handleSubmit(() => {
        //     // 手动提交已验证数据
        //     startTransition(() => {
        //       formAction(formData);
        //     });
        //   })();
        // }}
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
            <FormItem className="flex items-center space-x-5 rounded-md ">
              <div></div>
              {tags.map((item) => {
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
                          {item.desc}
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
                <Editor
                  apiKey="wjch2w8wj3lfna049cka51n2r8u2u4y9uanqwadks86758c2"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  value={field.value}
                  onEditorChange={(content, editor) => {
                    field.onChange(content);
                  }}
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

                {/* <Textarea
                  placeholder="place input content ..."
                  className="h-[400px] "
                  {...field}
                /> */}
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
