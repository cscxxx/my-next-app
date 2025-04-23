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
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPost, getAllTags } from "../actions";

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
          render={() => (
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
        <Suspense fallback={<div>loading</div>}>
          <Button type="submit" className="my-2">
            Submit
          </Button>
        </Suspense>
      </form>
    </Form>
  );
}
