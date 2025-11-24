import { success, ZodObject } from "zod";

export const validationRequest = <T>(payload: T, schema: ZodObject) => {
  const validatedPaload = schema.safeParse(payload);
  if (!validatedPaload.success) {
    return {
      success: false,
      errors: validatedPaload.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }
  return {
    success: true,
    data: validatedPaload.data,
  };
};
