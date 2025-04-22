"use client";
import { useActionState, useEffect, useState } from "react";
import { createPost, getAllTags } from "../actions";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "@/components/hooks/use-toast";
import { Tag } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  title: string;
  published: boolean;
  content: string;
};

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
  // const { toast } = useToast();
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

  const [errorMessage, formAction, isPending] = useActionState(
    createPost,
    undefined
  );

  // const onSubmit = (data: FormData) => {
  // const formData = new FormData();
  // Object.entries(data).forEach(([key, value]) => {
  //   formData.append(key, value.toString());
  // });
  // formAction(formData);
  // };

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    formAction(formData);
    // ideaProcedure.mutate({
    //   title: values.title,
    //   content: values.content,
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="felx items-center justify-center ">
              <FormLabel>发布</FormLabel>
              <FormControl>
                <Switch onCheckedChange={field.onChange} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-5 ">
              {tags.map((item) => {
                return (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className="flex items-start space-x-1 "
                      >
                        <FormControl>
                          <Checkbox
                            className="my-1.5 "
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
                        <FormLabel>{item.desc}</FormLabel>
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="place input content ..."
                  className="h-[400px] "
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <fieldset className="grid grid-cols-1 ">
          <div className="">
            <Label htmlFor="title">标题</Label>
            <Input
              {...register("title", { required: "标题不能为空" })}
              id="title"
            ></Input>
          </div>
          {errors.title && (
            <span className="text-red-500">
              {(errors.title as { message: string }).message}
            </span>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <div>发布：</div>
            <Switch></Switch>
            <div>
              <label htmlFor="publish1">
                是:
                <input
                  type="radio"
                  id="publish1"
                  name="published"
                  className="border"
                  value={1}
                />
              </label>
              <label htmlFor="publish2">
                否
                <input
                  type="radio"
                  id="publish2"
                  name="published"
                  className="border"
                  value="0"
                />
              </label>
            </div>
          </div>
          <div className="flex">
            <div>标签:</div>
            {tags &&
              tags.map((tag: any) => {
                return (
                  <label key={tag.id} htmlFor={String(tag.id)}>
                    <input
                      type="checkbox"
                      id={String(tag.id)}
                      name="tags"
                      value={tag.id}
                    ></input>
                    {tag.name}
                  </label>
                );
              })}
          </div>
          <label htmlFor="content">
            内容
            <textarea
              id="content"
              name="content"
              // required
              className="border resize" // 允许水平和垂直调整
              style={{
                minWidth: "300px",
                maxWidth: "800px",
                minHeight: "100px",
                width: "100%",
                height: "400px",
              }}
              maxLength={100}
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 w-[100px] text-white font-bold  px-4 rounded"
            disabled={isPending}
          >
            提交
          </button>
        </fieldset> */}
        <Button type="submit" className="my-2">
          Submit
        </Button>
      </form>
    </Form>
  );
}
