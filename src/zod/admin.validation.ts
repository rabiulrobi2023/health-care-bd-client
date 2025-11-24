import z from "zod";

export const createSpecialtiesValidationSchema = z.object({
  title: z.string(),
});