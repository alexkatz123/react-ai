import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/SignUpView";
import { AuthLayout } from "@/modules/auth/ui/views/layouts/AuthLayout";

async function signUpWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string) || "";

  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession({ email, password });

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/generate");
}

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/generate");

  return (
    <AuthLayout mode="signup">
      <SignUpView action={signUpWithEmail} />
    </AuthLayout>
  );
}

