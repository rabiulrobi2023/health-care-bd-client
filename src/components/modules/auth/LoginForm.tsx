/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Password from "@/components/ui/password";

import { useActionState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LoaderCircle } from "lucide-react";
import { loginUser } from "@/services/auth/login/auth.loginUser";

export default function LoginForm({redirect}: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);
 
  const getFiedError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);

      return error?.message;
    } else {
      return null;
    }
  };
  return (
    <form action={formAction} className="w-full">
      {redirect && (
        <input type="hidden" name="redirect" value={redirect}></input>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="text"
            name="email"
            placeholder="example@mail.com"
            defaultValue={"admin1@gmail.com"}
          />
          {getFiedError("email") && (
            <FieldDescription className="text-red-600">
              {getFiedError("email")}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Password name="password" defaultValue={"111111"} />
          {getFiedError("password") && (
            <FieldDescription className="text-red-600">
              {getFiedError("password")}
            </FieldDescription>
          )}
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
