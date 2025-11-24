/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useActionState, useEffect } from "react";
import { registerPatient } from "@/services/auth/registerPatient";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import InputFieldErrorMessage from "@/components/shared/InputFieldErrorMessage";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  const getFiedError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };
  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || "Failed to registration");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 w-full">
      <FieldGroup>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full ">
          <div className="lg:w-1/2 space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input type="text" name="name" placeholder="Rabiul Islam" />
              {getFiedError("name") && (
                <FieldDescription className="text-red-600">
                  {getFiedError("name")}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input type="email" name="email" placeholder="example@mail.com" />
              {getFiedError("email") && (
                <FieldDescription className="text-red-600">
                  {getFiedError("email")}
                </FieldDescription>
              )}
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
              <InputFieldErrorMessage field="contactNumber" state={state} />
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
              <InputFieldErrorMessage field="gender" state={state} />
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
            <InputFieldErrorMessage field="password" state={state} />
          </Field>
          <Field className="lg:w-1/2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Password name="confirmPassword" />
            <InputFieldErrorMessage field="confirmPassword" state={state} />
          </Field>
        </div>
      </FieldGroup>
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
    </form>
  );
}
