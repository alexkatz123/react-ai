"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-accent">
        <div className="flex items-center gap-5">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-lg font-semibold text-accent-foreground">
            Roast/Compliments Bot
          </h1>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </nav>
      <div className="flex items-center justify-center p-8 flex-col">
        <div className="mb-12">
          <div className="p-8 flex flex-row">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={60}
              height={60}
              className="mr-2"
            />
            <h1 className="text-5xl">Roast/Compliments Bot</h1>
          </div>
          <Separator decorative/>
        </div>
        <div className="w-xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How It Works</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Upload an image, then pick your vibe: Roast, Compliment,
                  Random, or let AI decide for you.
                </p>
                <p>
                  Our model analyzes the photo and instantly generates a witty,
                  funny, or wholesome response — perfect for sharing or just
                  having a laugh.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Roast Mode</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Feeling brave? Roast mode delivers sarcastic burns and cheeky
                  jokes based on your photo.
                </p>
                <p>
                  It’s all in good fun — no hard feelings, just playful jabs
                  designed to make you laugh.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Compliment Mode</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Want a boost instead? Compliment mode generates uplifting,
                  positive comments about your picture.
                </p>
                <p>
                  Great for sharing with friends, posting online, or just
                  brightening your day.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Random & AI Choose</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Random mode keeps you guessing — could be a roast, could be a
                  compliment, could be totally unexpected.
                </p>
                <p>
                  With AI Choose, the bot decides which style suits the image
                  best, blending humor and positivity in a unique way.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-12">
          <Link href="/roast">
            <Button size="lg">Get Roasted</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
