"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { Loader2, RotateCcw, UploadIcon, Flame } from "lucide-react";

import ModeSelector from "../components/ModeSelector";
import ModeBadgeInfo from "../components/ModeBadgeInfo";
import UserImagePanel from "../components/UserImagePanel";
import ResponsePanel from "../components/ResponsePanel";

import { useTypingEffect } from "../../hooks/useTyping";
import { useObjectUrl } from "../../hooks/useObjectUrl";
import { useCountdown } from "../../hooks/useCountdown";
import type { RoastAction, RoastFormValues } from "../../types";
import { checkLimit, type LimitState } from "@/lib/limit";

type Props = { roastAction: RoastAction };

export default function RoastView({ roastAction }: Props) {
  const [reply, setReply] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [dzBlockClick, setDzBlockClick] = useState(false);

  const [limit, setLimit] = useState<LimitState>(() => checkLimit());
  const [mounted, setMounted] = useState(false); // ✅ hydration-safe
  const countdown = useCountdown(limit.resetAt);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setLimit(checkLimit()), 10_000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<RoastFormValues>({
    defaultValues: { image: [], mode: "roast" },
  });
  const currentMode = form.watch("mode");
  const file = form.watch("image")?.[0] ?? null;

  const imageUrl = useObjectUrl(file);
  const { typed } = useTypingEffect(reply);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  function clearForNewSelection() {
    setReply("");
    setError(null);
    setCopied(false);
    setCompleted(false);
  }
  function lockDzClick(ms = 500) {
    setDzBlockClick(true);
    setTimeout(() => setDzBlockClick(false), ms);
  }

  async function onSubmit(values: RoastFormValues) {
    const current = checkLimit();
    if (!current.allowed) {
      setError("Limit reached: You can only generate 5 responses every 24h.");
      return;
    }
    if (!values.image?.[0]) return;
    clearForNewSelection();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", values.image[0]);
      fd.append("mode", values.mode);

      const res = await roastAction(fd);
      setLimit(checkLimit(true)); // ✅ record usage

      if (res.ok && res.reply) setReply(res.reply);
      else setError(res.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const canGenerate =
    mounted && !!file && !loading && !completed && limit.allowed;

  function hardReset() {
    setReply("");
    setError(null);
    setCopied(false);
    setCompleted(false);
    form.reset({ image: [], mode: form.getValues("mode") || "roast" });
  }

  function openPicker() {
    if (!hiddenInputRef.current) return;
    hiddenInputRef.current.value = "";
    hiddenInputRef.current.click();
  }

  return (
    <div className="w-full h-screen overflow-hidden p-4 md:p-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl h-full flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <div className="flex items-start justify-between gap-4">
              <div className="mt-3 flex-1">
                <CardTitle className="text-3xl">ReactAI</CardTitle>
                <CardDescription className="text-base">
                  Upload an image, pick a mode, then generate a one-shot
                  response.
                </CardDescription>
              </div>
              <ModeBadgeInfo
                mode={currentMode}
                limit={limit}
                countdown={countdown}
                mounted={mounted}
              />
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-8 flex flex-col min-h-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 flex flex-col gap-4 min-h-0"
              >
                <div className="flex items-center gap-3">
                  <ModeSelector
                    value={currentMode}
                    onChange={(m) =>
                      form.setValue("mode", m, { shouldDirty: true })
                    }
                    disabled={mounted ? loading || !limit.allowed : false}
                    className="w-48 justify-between"
                  />

                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      type="button"
                      variant={completed ? "ghost" : "outline"}
                      className="gap-2"
                      onClick={() => (completed ? hardReset() : openPicker())}
                      disabled={mounted ? loading || !limit.allowed : false}
                    >
                      {completed ? (
                        <>
                          <RotateCcw className="h-4 w-4" /> Reset
                        </>
                      ) : (
                        <>
                          <UploadIcon className="h-4 w-4" /> Choose another
                          image
                        </>
                      )}
                    </Button>

                    <input
                      ref={hiddenInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          form.setValue("image", [f], {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                          clearForNewSelection();
                          lockDzClick();
                        }
                      }}
                    />

                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={mounted ? !canGenerate : false}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />{" "}
                          Processing…
                        </>
                      ) : (
                        <>
                          <Flame className="h-4 w-4" /> Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex-1 min-h-0 grid grid-cols-1 gap-8 lg:grid-cols-2 overflow-hidden">
                  <UserImagePanel
                    control={form.control}
                    name={"image"}
                    imageUrl={imageUrl}
                    loading={loading}
                    dzBlockClick={dzBlockClick}
                    disabled={mounted ? !limit.allowed : false}
                    onPick={openPicker}
                    onDropped={(f) => {
                      form.setValue("image", [f], {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      clearForNewSelection();
                      lockDzClick();
                    }}
                  />

                  <ResponsePanel
                    reply={reply}
                    typed={typed}
                    error={error}
                    loading={loading}
                    copied={copied}
                    onCopy={async () => {
                      await navigator.clipboard.writeText(reply || typed);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 800);
                    }}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
