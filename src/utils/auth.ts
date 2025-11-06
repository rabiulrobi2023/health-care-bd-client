import { envVariable } from "@/config/envConfig";

const auth = async () => {
  try {
    const res = await fetch(`${envVariable.baseApi}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Authentication fail");
    }

    return {
      isAuthenticated: true,
      user: data.data,
    };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};

export default auth;
