/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { envVariable } from "@/config/envConfig";
import z from "zod";
import { parse } from "cookie";
import { Token } from "@/const/const";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  checkLoginUserAndRouteOwnerSame,
  getDefaultDashboard,
  verifyToken,
} from "@/lib/auth-utils";
import { redirect } from "next/navigation";

const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginUser = async (currentState: any, formData: FormData) => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const redirectTo = formData.get("redirect");

    const validatedFields = loginValidationSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res: Response = await fetch(`${envVariable.baseApi}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const gottenCookies = res.headers.getSetCookie();

    if (!gottenCookies.length) {
      throw new Error("No token found");
    }

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    gottenCookies.forEach((cookie) => {
      const parsedCookie = parse(cookie);
      if (parsedCookie[Token.ACCESS_TOKEN]) {
        accessTokenObject = parsedCookie;
      }
      if (parsedCookie[Token.REFRESH_TOKEN]) {
        refreshTokenObject = parsedCookie;
      }
    });

    if (!accessTokenObject || !refreshTokenObject) {
      throw new Error("Missing authentication tokens");
    }

    const cookieStore = await cookies();

    cookieStore.set(Token.ACCESS_TOKEN, accessTokenObject.accessToken, {
      secure: false,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "lax",
    });

    cookieStore.set(Token.REFRESH_TOKEN, refreshTokenObject.refreshToken, {
      secure: false,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "lax",
    });

    const verifiedToken: JwtPayload | string = verifyToken(
      accessTokenObject.accessToken
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    if (redirectTo) {
      const isOwnerAndUserSame = checkLoginUserAndRouteOwnerSame(
        redirectTo as string,
        verifiedToken.user
      );

      redirect(
        isOwnerAndUserSame
          ? (redirectTo as string)
          : getDefaultDashboard(verifiedToken.role)
      );
    } else {
      redirect(getDefaultDashboard(verifiedToken.role));
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: "Login fail",
    };
  }
};
