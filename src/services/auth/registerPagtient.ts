/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { envVariable } from "@/config/envConfig";

export const registerPatient = async (
  currentState: any,
  formData: FormData
) => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        email: formData.get("email"),
        contactNumber: formData.get("contactNumber"),
        gender: formData.get("gender"),
        address: formData.get("address"),
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));
    const res = await fetch(`${envVariable.baseApi}/patient`, {
      method: "POST",
      body: newFormData,
    }).then((res) => res.json());
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return { error: "Registration fail" };
  }
};
