import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getLoggedInUser, createSessionClient } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

async function signOut() {
  "use server";
  const { account } = await createSessionClient();
  await account.deleteSession("current");
  (await cookies()).delete("appwrite-session");
  redirect("/sign-in");
}

export default async function TestAuthPage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>You’re logged in!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <form action={signOut}>
          <Button type="submit" variant="outline" className="w-full">
            Sign out
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
