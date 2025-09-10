"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { logout } from "@/modules/auth/actions/logout";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  isLoggedIn: boolean;
};

export default function MainNavbar({ isLoggedIn }: Props) {
  const pathname = usePathname();
  const onHistory = pathname === "/history" || pathname.startsWith("/history/");
  const { isMobile, state } = useSidebar();
  const shrinkForSidebar = onHistory && !isMobile && state === "expanded";
  // Keep navbar full-width; history sidebar does not shrink it anymore.

  return (
    <nav
      className="flex items-center justify-between px-4 py-3 bg-accent sticky top-0 z-40"
      style={shrinkForSidebar ? {
        marginLeft: "var(--sidebar-width)",
        width: "calc(100% - var(--sidebar-width))",
      } : undefined}
    >
      <div className="flex items-center gap-2">
        {onHistory && <SidebarTrigger className="mr-1" />}
        <Link href="/generate" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={30} height={30} />
          <span className="text-base sm:text-lg font-semibold text-accent-foreground">React AI</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn && !onHistory && (
          <Link href="/history">
            <Button size="sm">History</Button>
          </Link>
        )}
        {onHistory ? (
          <Link href="/generate">
            <Button size="sm" className="gap-2">Create New</Button>
          </Link>
        ) : null}
        {isLoggedIn ? (
          <form action={logout}>
            <LogoutSubmit />
          </form>
        ) : (
          <>
            <Link href="/sign-in">
              <Button size="sm" variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}

function LogoutSubmit() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" variant="destructive" disabled={pending} className="min-w-24">
      {pending ? (<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />) : ("Logout")}
    </Button>
  );
}

