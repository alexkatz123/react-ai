import { getLoggedInUser } from "@/lib/auth";
import { cookies } from "next/headers";
import MainLayoutClient from "@/modules/main/ui/components/MainLayoutClient";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await getLoggedInUser();
  const isLoggedIn = !!user;
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultSidebarOpen = sidebarState ? sidebarState === "true" : true;
  return (
    <MainLayoutClient isLoggedIn={isLoggedIn} defaultSidebarOpen={defaultSidebarOpen}>
      {children}
    </MainLayoutClient>
  );
}
