/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/serverFetch";
import { validationRequest } from "@/lib/validationRequest";
import { registerValidationSchema } from "@/zod/auth.validation";

export const registerPatient = async (
  currentState: any,
  formData: FormData
) => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      gender: formData.get("gender"),
      address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const isValidatePayload = validationRequest(
      payload,
      registerValidationSchema
    );
    if (!isValidatePayload.success) {
      return isValidatePayload;
    }
    const validatedPayload: any = isValidatePayload.data;
    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
        gender: validatedPayload.gender,
        address: validatedPayload.address,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const res = await serverFetch.post("/patient", {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(currentState, formData);
    }
    return result;
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: err.message || "Registration fail",
    };
  }
};
