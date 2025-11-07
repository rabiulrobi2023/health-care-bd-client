/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { envVariable } from "@/config/envConfig";

export const loginUser = async (currentState: any, formData: FormData) => {
  console.log({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(`${envVariable.baseApi}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Login fail",
    };
  }
};
