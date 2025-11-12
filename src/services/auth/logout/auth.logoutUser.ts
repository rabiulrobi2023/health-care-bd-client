"use server";
import { Token } from "@/const/const";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  try {
    const cookieStore = await cookies();

    // Remove both access and refresh tokens by setting them to empty with expired date
    cookieStore.set(Token.ACCESS_TOKEN, "", {
      expires: new Date(0),
      path: "/",
    });
    cookieStore.set(Token.REFRESH_TOKEN, "", {
      expires: new Date(0),
      path: "/",
    });

    redirect("/login");
  } catch (err) {
    console.error("Logout failed:", err);
    redirect("/login");
  }
}
