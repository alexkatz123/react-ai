"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Camera,
  Laugh,
  Heart,
  Sparkles,
  ShieldCheck,
  Share2,
  ImagePlus,
  ArrowRight,
} from "lucide-react";

import { FeatureCard } from "../components/FeatureCard";
import { ModePill } from "../components/ModePill";
import { StepDot } from "../components/StepDot";

export function LandingView(
  { user }: { user: { email: string; name: string } | null }
) {
  return (
    <>
      {/* Navbar is provided by (main)/layout */}

      <main className="min-h-[calc(100vh-56px)]">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 via-transparent to-transparent">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="roast">Roast</Badge>
                  <Badge variant="compliment">Compliment</Badge>
                  <Badge variant="random">Random</Badge>
                  <Badge variant="aiDecide">AI Decide</Badge>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Upload a photo. Get roasted or praised — your call.
                </h2>
                <p className="mt-3 text-muted-foreground text-balance">
                  Pick a mode — Roast, Compliment, Random, or let AI decide.
                  Fast, one-shot responses tuned for laughs or good vibes.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/generate">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#how" className="sm:ml-2">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      How it works
                    </Button>
                  </a>
                </div>
              </div>

              {/* Preview card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Preview</CardTitle>
                  <CardDescription>
                    Exactly what you’ll use inside the app.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video w-full rounded-xl border border-dashed bg-muted grid place-items-center">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="rounded-lg p-3 bg-background text-muted-foreground">
                        <ImagePlus className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium">Drop an image here</p>
                      <p className="text-xs text-muted-foreground">
                        or click to browse • Max 5MB
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2">
                    <Button variant="roast" className="justify-start">
                      Roast
                    </Button>
                    <Button variant="compliment" className="justify-start">
                      Compliment
                    </Button>
                    <Button variant="random" className="justify-start">
                      Random
                    </Button>
                    <Button variant="aiDecide" className="justify-start">
                      AI Decide
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                      AI Response
                    </p>
                    <p className="text-sm text-balance">
                      “Nice. You&apos;ve captured the exact moment your camera gave
                      up and decided to become a potato. Bold choice.”
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link href="/generate">
                      <Button className="w-full">Open the App</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Camera className="h-5 w-5" />}
              title="Image-aware"
              desc="Understands the scene to craft targeted burns or genuine praise."
            />
            <FeatureCard
              icon={<Laugh className="h-5 w-5" />}
              title="Actually funny"
              desc="Roasts land with wit, not hate. Keep it playful, keep it sharp."
            />
            <FeatureCard
              icon={<Heart className="h-5 w-5" />}
              title="Wholesome mode"
              desc="Compliments are short, specific, and feel natural — not cringe."
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="AI Decide"
              desc="Let the model pick the vibe based on the image context."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Safe by design"
              desc="No hateful content. Guardrails keep things light and fun."
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="One-tap copy"
              desc="Copy and share anywhere. Perfect for group chats."
            />
          </div>
        </section>

        {/* Modes strip */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Modes</CardTitle>
              <CardDescription>Pick your flavor. You can switch anytime.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ModePill label="Roast" className="bg-red-100 text-red-700 border-red-200" />
              <ModePill label="Compliment" className="bg-emerald-100 text-emerald-700 border-emerald-200" />
              <ModePill label="Random" className="bg-yellow-100 text-yellow-800 border-yellow-200" />
              <ModePill label="AI Decide" className="bg-indigo-100 text-indigo-700 border-indigo-200" />
            </CardContent>
          </Card>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold">How It Works</h3>
            <p className="text-muted-foreground mt-1">Three steps. That’s it.</p>
          </div>

          <div className="rounded-xl border bg-card">
            <div className="px-4 sm:px-6 pt-6">
              <div className="flex items-center gap-3">
                <StepDot>1</StepDot>
                <p className="text-sm sm:text-base">Upload a photo. Any image works.</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <StepDot>2</StepDot>
                <p className="text-sm sm:text-base">Choose Roast, Compliment, Random, or AI Decide.</p>
              </div>
              <div className="flex items-center gap-3 mt-3 mb-4">
                <StepDot>3</StepDot>
                <p className="text-sm sm:text-base">Copy your response. Share it. Done.</p>
              </div>
            </div>
            <Separator />
            <div className="p-4 sm:p-6">
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What’s Roast mode?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>Sarcastic burns and cheeky jokes based on your photo. It’s fun and witty, not hateful.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What’s Compliment mode?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>Short, genuine compliments that highlight one standout detail from the image.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What’s Random / AI Decide?</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>Random flips a coin between Roast and Compliment. AI Decide lets the model pick a style that fits the image’s vibe.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <Card className="bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold">Ready to try it?</h4>
                <p className="text-muted-foreground mt-1">
                  Fire it up and get your first roast or compliment in seconds.
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link href="/generate" className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto">
                    Open the App
                  </Button>
                </Link>
                <a href="#how" className="w-full md:w-auto">
                  <Button size="lg" variant="outline" className="w-full md:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={18} height={18} />
            <span>Roast/Compliments Bot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/generate" className="hover:underline">Open App</Link>
            <a href="#how" className="hover:underline">How it works</a>
          </div>
        </div>
      </footer>
    </>
  );
}

