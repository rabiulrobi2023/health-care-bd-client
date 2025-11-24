/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender } from "@/const/const";
import z from "zod";

export const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidationSchema = z
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
