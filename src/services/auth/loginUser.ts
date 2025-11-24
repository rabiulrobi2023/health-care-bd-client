/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { envVariable } from "@/config/envConfig";
import z from "zod";
import { parse } from "cookie";
import { Tokens } from "@/const/const";

import { JwtPayload } from "jsonwebtoken";
import {
  checkLoginUserAndRouteOwnerSame,
  getDefaultDashboard,
} from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { setToken, verifyToken } from "@/services/auth/tokenHandler";
import { serverFetch } from "@/lib/serverFetch";
import { validationRequest } from "@/lib/validationRequest";
import { loginValidationSchema } from "@/zod/auth.validation";



export const loginUser = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const redirectTo = formData?.get("redirect");
    const isValidatePayload = validationRequest(payload, loginValidationSchema);
    if (!isValidatePayload.success) {
      return isValidatePayload;
    }

    const validatedPayload: any = isValidatePayload.data;
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to login");
    }

    const gottenCookies = res.headers.getSetCookie();

    if (!gottenCookies.length) {
      throw new Error("No token found");
    }

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    gottenCookies.forEach((cookie) => {
      const parsedCookie = parse(cookie);
      if (parsedCookie[Tokens.ACCESS_TOKEN]) {
        accessTokenObject = parsedCookie;
      }
      if (parsedCookie[Tokens.REFRESH_TOKEN]) {
        refreshTokenObject = parsedCookie;
      }
    });

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("Missing authentication tokens");
    }
    await setToken(
      Tokens.ACCESS_TOKEN,
      accessTokenObject.accessToken,
      parseInt(accessTokenObject["Max-Age"]),
      accessTokenObject.Path,
      accessTokenObject.SameSite
    );

    await setToken(
      Tokens.REFRESH_TOKEN,
      refreshTokenObject.refreshToken,
      parseInt(accessTokenObject["Max-Age"]),
      accessTokenObject.Path,
      accessTokenObject.SameSite
    );

    const verifiedToken: JwtPayload | string = await verifyToken(
      accessTokenObject.accessToken,
      envVariable.JWT_ACCESS_SECRET as string
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    if (redirectTo === null) {
      redirect(`${getDefaultDashboard(verifiedToken.role)}/?login=true`);
    } else {
      const isOwnerAndUserSame = checkLoginUserAndRouteOwnerSame(
        redirectTo as string,
        verifiedToken.user
      );

      redirect(
        `${
          isOwnerAndUserSame
            ? (redirectTo as string)
            : getDefaultDashboard(verifiedToken.role)
        }/?login=true`
      );
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: err.message || "Login fail",
    };
  }
};
