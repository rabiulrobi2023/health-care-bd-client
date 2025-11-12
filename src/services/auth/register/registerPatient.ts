/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { envVariable } from "@/config/envConfig";
import { Gender } from "@/const/const";
import z from "zod";

const registerValidationSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    gender: z.enum(Object.keys(Gender), "Gender is rquired"),
    contactNumber: z
      .string()
      .nonempty("Contact number is required")
      .regex(/^01[3-9]\d{8}$/, "Invalid mobile number")
      .trim(),

    address: z.string().optional(),
    password: z
      .string("Password is required")
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(6, "Confirm must be at least 6 characters"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const registerPatient = async (
  currentState: any,
  formData: FormData
) => {
  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields = registerValidationSchema.safeParse(validationData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
        gender: formData.get("gender"),
        address: formData.get("address"),
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));
    const res = await fetch(`${envVariable.baseApi}/patient`, {
      method: "POST",
      body: newFormData,
    }).then((res) => res.json());

    return res;
  } catch (err) {
    return { error: "Registration fail" };
  }
};
