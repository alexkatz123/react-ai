import { getLoggedInUser } from "@/lib/auth";
import { LandingView } from "@/modules/landing/ui/views/LandingView";

export default async function Page() {
  const user = await getLoggedInUser();
  return <LandingView user={user} />;
}
