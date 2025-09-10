"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AuthLayout({
  children,
  mode, // "signin" or "signup"
}: {
  children: React.ReactNode;
  mode: "signin" | "signup";
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar (same style as main app) */}
      <nav className="flex items-center justify-between px-4 py-3 bg-accent sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={34} height={34} />
          <h1 className="text-base sm:text-lg font-semibold text-accent-foreground">
            React AI
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {mode === "signin" ? (
            <Link href="/sign-up">
              <Button size="sm" variant="outline">Sign Up</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button size="sm" variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
