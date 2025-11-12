export const Token = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHERS: "OTHERS",
} as const;

export const UserRoles = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
} as const;

export const RouteOwner = {
  COMMON: "COMMON",
  ...UserRoles,
  NONE: "NONE",
} as const;
