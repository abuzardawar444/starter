import * as z from "zod";
import { ZodSchema } from "zod";
export const demoSchema = z.object({
  name: z.string().min(10, "Name must be at least 10 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long"),
  category: z.string(),
  subscribe: z.string(),
});

export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const results = schema.safeParse(data);
  if (!results.success) {
    const errors = results.error.issues.map((err) => err.message);
    throw new Error(errors.join(","));
  }
  return results.data;
};
