import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 10 characters.",
  }),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;

export type PostFormSchemaType = UseFormReturn<z.infer<typeof postFormSchema>>;
