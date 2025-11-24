"use client";

import { getInputFieldError, TInputFieldError } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";
type TInputFieldErrorProps = {
  field: string;
  state: TInputFieldError;
};

const InputFieldErrorMessage = ({ field, state }: TInputFieldErrorProps) => {
  return (
    <>
      {getInputFieldError(field, state) && (
        <FieldDescription className="text-red-600">
          {getInputFieldError(field, state)}
        </FieldDescription>
      )}
    </>
  );
};

export default InputFieldErrorMessage;
