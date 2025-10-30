/* eslint-disable @typescript-eslint/no-explicit-any */
import { TLoginFormData } from "@/components/modules/auth/LoginForm";
import { envVariable } from "@/config/envConfig";

const loginUser = async (loginInfo: TLoginFormData) => {
  console.log(loginInfo);
  try {
    const res = await fetch(`${envVariable.baseApi}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data)
    return data;

  } catch (err: any) {
    console.log("Error in fun:", err);
    throw new Error(err.message || "An error occurred while loggin");
  }
};

export default loginUser;
