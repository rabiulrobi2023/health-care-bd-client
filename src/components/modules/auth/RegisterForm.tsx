/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import z from "zod";
import Password from "@/components/ui/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "@/const/const";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useActionState } from "react";
import { registerPatient } from "@/services/auth/registerPagtient";
import { LoaderCircle } from "lucide-react";

const registerSchema = z.object({
  name: z.string("Name is required"),
  email: z.email("Invalid email address"),
  gender: z.enum(Object.keys(Gender), "Gender is rquired"),
  contactNumber: z
    .string("Contact number is required")
    .regex(/^01[3-9]\d{8}$/, "Invalid mobile number")
    .trim(),

  address: z.string().optional(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string("Confirm password is required")
    .min(6, "Confirm must be at least 6 characters"),
});

export type TLoginFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "111111",
    },
  });

  const [state, formAction, isPending] = useActionState(registerPatient, null);

  return (
    <form action={formAction} {...form} className="space-y-6 w-full">
      <FieldGroup>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full ">
          <div className="lg:w-1/2 space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input type="text" name="name" placeholder="Rabiul Islam" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input type="email" name="email" placeholder="example@mail.com" />
            </Field>
          </div>

          <div className="lg:w-1/2 space-y-3">
            <Field>
              <FieldLabel htmlFor="contactNumber">Mobile Number</FieldLabel>
              <Input
                type="text"
                name="contactNumber"
                placeholder="01750749762"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select name="gender">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Gender</SelectLabel>
                    {Object.values(Gender).map((value, index) => (
                      <SelectItem key={index} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Textarea
            name="address"
            placeholder="Village, Post office, Upazilla, District"
          />
        </Field>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <Field className="lg:w-1/2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Password name="password" />
          </Field>
          <Field className="lg:w-1/2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Password name="confirmPassword" />
          </Field>
        </div>

        <Button
          type="submit"
          className="w-full mt-2 font-bold"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <p>Register</p>
              <LoaderCircle />
            </>
          ) : (
            "Register"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
