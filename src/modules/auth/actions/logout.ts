"use server";

import { createSessionClient } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
  } catch {
    // ignore
  }
  try {
    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", "", { expires: new Date(0), path: "/" });
  } catch {
    // ignore
  }
  redirect("/");
}

