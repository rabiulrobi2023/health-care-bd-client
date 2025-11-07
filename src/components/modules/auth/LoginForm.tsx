/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import z from "zod";
import Password from "@/components/ui/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LoaderCircle } from "lucide-react";
import { loginUser } from "@/services/auth/loginUser";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  console.log(state);
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "111111",
    },
  });

  return (
    <form action={formAction} className="space-y-6 w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            name="email"
            placeholder="example@mail.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Password required name="password" />
        </Field>

        <Button
          type="submit"
          className="w-full mt-2 font-bold"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <p>Login</p>
              <LoaderCircle />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
