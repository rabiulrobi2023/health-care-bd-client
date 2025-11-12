"use server"

import { envVariable } from "@/config/envConfig";
import { NextEnv } from "@/const/const";
import { TToken } from "@/types/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type TSameSite = "strict" | "lax" | "none";

export const setToken = async (
  tokenName: string,
  token: string,
  age: number,
  path: string,
  sameSite: TSameSite
) => {
  const cookieStore = await cookies();

  cookieStore.set(tokenName, token, {
    secure: envVariable.NEXT_ENV === NextEnv.PRODUCTION,
    httpOnly: true,
    maxAge: age || 1000 * 60 * 60,
    path: path,
    sameSite: sameSite || "lax",
  });
};

export const getToken = async (tokenName: TToken) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(tokenName)?.value;
  return token || null;
};

export const verifyToken = async(token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret) as JwtPayload;
  return verifiedToken;
};

export const deleteToken = async (tokenName: string) => {
  const cookieSotre = cookies();
  (await cookieSotre).delete(tokenName);
};
