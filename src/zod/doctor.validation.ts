import { Gender } from "@/const/const";
import z from "zod";

export const createDoctorZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  contactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^01[3-9]\d{8}$/, "Invalid mobile number")
    .trim(),
  address: z.string().optional(),
  registrationNumber: z
    .string()
    .min(3, "Registration Number must be at least 3 characters long"),
  experience: z.number().min(0, "Experience cannot be negative").optional(),
  gender: z.enum(
    Object.keys(Gender),
    "Gender must be either 'MALE' or 'FEMALE' or 'OTHERS'",
  ),
  specialties: z.string().array().nonempty("Minimum one specialty required"),
  appoinmentFee: z.number().min(0, "Appointment Fee cannot be negative"),
  qualification: z
    .string()
    .min(3, "Qualification must be at least 3 characters long"),
  currentWorkingPlace: z
    .string()
    .min(3, "Current Working Place must be at least 3 characters long"),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters long"),
});

export const updateDoctorZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  contactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^01[3-9]\d{8}$/, "Invalid mobile number")
    .trim()
    .optional(),
  address: z.string().optional(),
  registrationNumber: z
    .string()
    .min(3, "Registration Number must be at least 3 characters long")
    .optional(),
  experience: z.number().min(0, "Experience cannot be negative").optional(),
  gender: z
    .enum(Object.keys(Gender), "Gender must be either 'MALE' or 'FEMALE'")
    .optional(),
  appoinmentFee: z
    .number()
    .min(0, "Appointment Fee cannot be negative")
    .optional(),
  qualification: z
    .string()
    .min(3, "Qualification must be at least 3 characters long")
    .optional(),
  currentWorkingPlace: z
    .string()
    .min(3, "Current Working Place must be at least 3 characters long")
    .optional(),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters long")
    .optional(),
});
