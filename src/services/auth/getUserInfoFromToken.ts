/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tokens } from "@/const/const";
import { getToken, verifyToken } from "./tokenHandler";
import { envVariable } from "@/config/envConfig";
import { TJwtPayload, TUserInfoFormToken } from "@/types/types";

export const getUserInfoFromToken = async () => {
  try {
    const accessToken = await getToken(Tokens.ACCESS_TOKEN);
    if (!accessToken) {
      return null;
    }
    const verifedToken = (await verifyToken(
      accessToken,
      envVariable.JWT_ACCESS_SECRET as string
    )) as TJwtPayload;

    if (!verifedToken) {
      return null;
    }

    const userInfo: TUserInfoFormToken = {
      email: verifedToken.email,
      role: verifedToken.role,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
