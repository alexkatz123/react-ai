"use client";

import MainNavbar from "./MainNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayoutClient({
  isLoggedIn,
  defaultSidebarOpen = true,
  children,
}: {
  isLoggedIn: boolean;
  defaultSidebarOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <div className="min-h-screen flex flex-col w-screen">
        <MainNavbar isLoggedIn={isLoggedIn} />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </SidebarProvider>
  );
}

