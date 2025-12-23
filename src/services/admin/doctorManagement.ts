/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVariable } from "@/config/envConfig";
import { NextEnv } from "@/const/const";
import { TDoctor } from "@/interface/doctor.interface";
import { TGender } from "@/interface/share.interface";
import { serverFetch } from "@/lib/serverFetch";
import { validationRequest } from "@/lib/validationRequest";
import {
  createDoctorZodSchema,
  updateDoctorZodSchema,
} from "@/zod/doctor.validation";
import { errorMessage } from "../utils/errorMessage";

const createDoctor = async (_preState: any, formData: FormData) => {
  try {
    const payload: TDoctor = {
      name: formData.get("name") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("constactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("expreience") as string),
      gender: formData.get("gender") as TGender,
      appointmentFee: Number(formData.get("appointmentFee")) as number,
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };

    const isValidatedPayload = validationRequest(
      payload,
      createDoctorZodSchema
    ).data;
    if (!isValidatedPayload) {
      return isValidatedPayload;
    }

    const validatedPaload = {
      password: isValidatedPayload.password,
      doctor: {
        name: isValidatedPayload.name,
        email: isValidatedPayload.email,
        contactNumber: isValidatedPayload.contactNumber,
        address: isValidatedPayload.address,
        registrationNumber: isValidatedPayload.registrationNumber,
        experience: isValidatedPayload.experience,
        gender: isValidatedPayload.gender,
        appointmentFee: isValidatedPayload.appointmentFee,
        qualification: isValidatedPayload.qualification,
        currentWorkingPlace: isValidatedPayload.currentWorkingPlace,
        designation: isValidatedPayload.designation,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPaload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("doctor/create", {
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
    };
  }
};

const getAllDoctros = async (quaryString: string) => {
  try {
    const res = await serverFetch.get(
      `/doctor${quaryString ? `${quaryString}` : ""}`
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
  formData: FormData
) => {
  try {
    const payload: Partial<TDoctor> = {
      name: formData.get("name") as string,
      contactNumber: formData.get("contactNumber") as string,
      address: formData.get("address") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      experience: Number(formData.get("experience") as string),
      gender: formData.get("gender") as "MALE" | "FEMALE",
      appointmentFee: Number(formData.get("appointmentFee") as string),
      qualification: formData.get("qualification") as string,
      currentWorkingPlace: formData.get("currentWorkingPlace") as string,
      designation: formData.get("designation") as string,
    };

    const isValidatedPayload = validationRequest(
      payload,
      updateDoctorZodSchema
    ).data;

    if (!isValidatedPayload) {
      return isValidatedPayload;
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(isValidatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.patch(`/doctor/${id}`, { body: newFormData });
    const result = res.json();
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
    const res = await serverFetch.delete(`/doctor/${id}`);
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
