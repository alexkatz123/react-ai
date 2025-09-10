import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createAdminClient, getLoggedInUser } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/SignInView";
import { AuthLayout } from "@/modules/auth/ui/views/layouts/AuthLayout";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession({ email, password });

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/generate");
}

export default async function SignInPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/generate");

  return (
    <AuthLayout mode="signin">
      <SignInView action={signInWithEmail} />
    </AuthLayout>
  );
}

