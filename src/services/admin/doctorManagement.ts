/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVariable } from "@/config/envConfig";
import { NextEnv } from "@/const/const";
import { IDoctor } from "@/interface/doctor.interface";
import { TGender } from "@/interface/share.interface";
import { serverFetch } from "@/lib/serverFetch";
import { validationRequest } from "@/lib/validationRequest";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";
import { errorMessage } from "../utils/errorMessage";

const createDoctor = async (_preState: any, formData: FormData) => {
  const specialtiesString = formData.get("specialties");
  let specialties: string[] = [];

  try {
    const parsed = specialtiesString
      ? JSON.parse(specialtiesString.toString())
      : [];
    specialties = Array.isArray(parsed) ? parsed : [];
  } catch {
    specialties = [];
  }

  const payload: IDoctor = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    contactNumber: String(formData.get("contactNumber")),
    address: String(formData.get("address")),
    registrationNumber: String(formData.get("registrationNumber")),
    experience: Number(formData.get("experience")),
    gender: formData.get("gender") as TGender,
    appoinmentFee: Number(formData.get("appoinmentFee")),
    specialties,
    qualification: String(formData.get("qualification")),
    currentWorkingPlace: String(formData.get("currentWorkingPlace")),
    designation: String(formData.get("designation")),
    profilePhoto: formData.get("profilePhoto") as File,
  };

  const isValidatedPayload = validationRequest(payload, createDoctorZodSchema);

  if (!isValidatedPayload.success && isValidatedPayload.errors) {
    return {
      success: isValidatedPayload.success,
      message: "Validation failed",
      formData: payload,
      errors: isValidatedPayload.errors,
    };
  }

  if (!isValidatedPayload.data) {
    return {
      success: isValidatedPayload.success,
      message: "Validation failed",
      formData: payload,
      errors: isValidatedPayload.errors,
    };
  }

  // const doctorData = {
  //   name: validatedPayload.name,
  //   email: validatedPayload.email,
  //   contactNumber: validatedPayload.contactNumber,
  //   address: validatedPayload.address,
  //   registrationNumber: validatedPayload.registrationNumber,
  //   experience: validatedPayload.experience,
  //   gender: validatedPayload.gender,
  //   appoinmentFee: validatedPayload.appoinmentFee,
  //   qualification: validatedPayload.qualification,
  //   specialties: validatedPayload.specialties,
  //   currentWorkingPlace: validatedPayload.currentWorkingPlace,
  //   designation: validatedPayload.designation,
  // };

  // or

  const validatedPayload: any = isValidatedPayload.data;

  const doctorData = {
    ...validatedPayload,
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(doctorData));

  if (formData.get("profilePhoto")) {
    newFormData.append("file", formData.get("profilePhoto") as Blob);
  }

  try {
    const res = await serverFetch.post("/doctor/create", {
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
          : "Something went worng"
      }`,
      formData: isValidatedPayload,
    };
  }
};

const getAllDoctros = async (queryString: string) => {
  try {
    const res = await serverFetch.get(
      `/doctor${`${queryString ? `?${queryString}` : ""}`}`,
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        envVariable.NEXT_ENV === NextEnv.DEVELOPMENT
          ? error.message
          : "Something went worng"
      }`,
    };
  }
};

const getSingleDoctor = async (id: string) => {
  try {
    const res = await serverFetch.get(`/doctor/${id}`);
    const result = res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return errorMessage(error, "Fail to doctor fetch");
  }
};

const updateDoctor = async (
  id: string,
  _prevState: any,
  formData: FormData,
) => {
  const specialtiesString = formData.get("specialties");
  let specialties: string[] = [];

  try {
    const parsed = specialtiesString
      ? JSON.parse(specialtiesString.toString())
      : [];
    specialties = Array.isArray(parsed) ? parsed : [];
  } catch {
    specialties = [];
  }

  const removedSpecialtiesString = formData.get("removedSpecialties") as string;
  console.log(removedSpecialtiesString);
  let removedSpecialties: string[] = [];
  try {
    const parsed = removedSpecialtiesString
      ? JSON.parse(removedSpecialtiesString.toString())
      : [];
    removedSpecialties = Array.isArray(parsed) ? parsed : [];
  } catch {}
  const payload: Partial<IDoctor> = {
    name: formData.get("name") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    experience: Number(formData.get("experience")) as number,
    gender: formData.get("gender") as TGender,
    appoinmentFee: Number(formData.get("appoinmentFee")) as number,
    specialties,
    removedSpecialties,
    qualification: formData.get("qualification") as string,
    currentWorkingPlace: formData.get("currentWorkingPlace") as string,
    designation: formData.get("designation") as string,
    profilePhoto: formData.get("profilePhoto") as File,
  };

  const isValidatedPayload = validationRequest(payload, updateDoctorZodSchema);

  if (!isValidatedPayload.success && isValidatedPayload.errors) {
    return {
      success: isValidatedPayload.success,
      message: "Validation failed",
      formData: payload,
      errors: isValidatedPayload.errors,
    };
  }

  if (!isValidatedPayload.data) {
    return {
      success: isValidatedPayload.success,
      message: "Validation failed",
      formData: payload,
      errors: isValidatedPayload.errors,
    };
  }

  // const doctorData = {
  //   name: validatedPayload.name,
  //   email: validatedPayload.email,
  //   contactNumber: validatedPayload.contactNumber,
  //   address: validatedPayload.address,
  //   registrationNumber: validatedPayload.registrationNumber,
  //   experience: validatedPayload.experience,
  //   gender: validatedPayload.gender,
  //   appoinmentFee: validatedPayload.appoinmentFee,
  //   qualification: validatedPayload.qualification,
  //   specialties: validatedPayload.specialties,
  //   currentWorkingPlace: validatedPayload.currentWorkingPlace,
  //   designation: validatedPayload.designation,
  // };

  // or

  const validatedPayload: any = isValidatedPayload.data;

  try {
    const res = await serverFetch.patch(`/doctor/${id}`, {
      body: JSON.stringify(validatedPayload),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
          : "Something went worng"
      }`,
      formData: isValidatedPayload,
    };
  }
};

const softDeleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/soft-delete/${id}`);
    const result = res.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return errorMessage(error, "Fail to delete doctor");
  }
};

const deleteDoctor = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/doctor/${id}`, {
      credentials: "include",
    });
    const result = res.json();
    return result;
  } catch (error) {
    console.log(error);
    return errorMessage(error, "Fail to delete doctor");
  }
};

export const doctorService = {
  createDoctor,
  getAllDoctros,
  getSingleDoctor,
  updateDoctor,
  softDeleteDoctor,
  deleteDoctor,
};
