/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Password from "@/components/ui/password";

import { useActionState, useEffect } from "react";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LoaderCircle } from "lucide-react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import InputFieldErrorMessage from "@/components/shared/InputFieldErrorMessage";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message || "Failed to login");
    }
  }, [state]);

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
          <InputFieldErrorMessage field="email" state={state} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Password name="password" defaultValue={"111111"} />
          <InputFieldErrorMessage field="password" state={state} />
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
