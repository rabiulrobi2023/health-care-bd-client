/* eslint-disable @typescript-eslint/no-explicit-any */
import { envVariable } from "@/config/envConfig";
import { NextEnv } from "@/const/const";

export const errorMessage = (error: any, defaultMessage: string) => {
  return {
    success: false,
    message:
      envVariable.NEXT_ENV === NextEnv.DEVELOPMENT
        ? error.message
        : defaultMessage,
  };
};
