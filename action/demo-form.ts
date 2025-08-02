// simulate a server-style action function
"use server";

import { demoSchema, validateWithZodSchema } from "@/lib/schemas";

export const demoAction = async (prevState: unknown, formData: FormData) => {
  // artificial delay to show loading
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const data = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(demoSchema, data);
    return {
      message: `Form submitted successfully with data: ${validatedFields.name}, ${validatedFields.description}, ${validatedFields.category}, ${validatedFields.subscribe}`,
      status: "success" as const, // ensure status is strictly "success"
    };
  } catch (error) {
    return {
      message: `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      status: "error" as const,
    };
  }
};
