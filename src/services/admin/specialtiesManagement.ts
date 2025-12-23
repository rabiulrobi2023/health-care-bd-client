import { envVariable } from "@/config/envConfig";
import { NextEnv } from "@/const/const";
import { serverFetch } from "@/lib/serverFetch";
import { validationRequest } from "@/lib/validationRequest";
import { createSpecialtiesValidationSchema } from "@/zod/admin.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */

type TCreateSpecialties = {
  title: string;
};

export async function createSpecialties(_preState: any, formData: FormData) {
  try {
    const payload: TCreateSpecialties = {
      title: formData.get("title") as string,
    };

    const isValidatedPayload = validationRequest(
      payload,
      createSpecialtiesValidationSchema
    );

    if (!isValidatedPayload.success) {
      return isValidatedPayload;
    }

    const validatedPaload = isValidatedPayload.data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPaload));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const res = await serverFetch.post("/specialties", {
      body: newFormData,
      credentials: "include",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        envVariable.NEXT_ENV === NextEnv.DEVELOPMENT
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getAllSpecialties() {
  try {
    const res = await serverFetch.get("/specialties");
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        envVariable.NEXT_ENV === NextEnv.DEVELOPMENT
          ? error.messge
          : "Something went wrong"
      }`,
    };
  }
}

export async function deleteSpecialty(id: string) {
  try {
    const res = await serverFetch.delete(`/specialties/${id}`, {
      credentials: "include",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        envVariable.NEXT_ENV === NextEnv.DEVELOPMENT
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
