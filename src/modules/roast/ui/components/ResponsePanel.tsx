"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";

type Props = {
  reply: string;
  typed: string;
  error: string | null;
  loading: boolean;
  copied: boolean;
  onCopy: () => void;
};

export default function ResponsePanel({ reply, typed, error, loading, copied, onCopy }: Props) {
  const showLoadingCaret = loading;

  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold">AI Response</h3>
        {(typed || reply) && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 gap-2"
            onClick={onCopy}
            disabled={loading}
          >
            {copied ? (<><Check className="h-4 w-4" /> Copied</>) : (<><Copy className="h-4 w-4" /> Copy</>)}
          </Button>
        )}
      </div>

      <Card className="flex-1 min-h-[360px]">
        <CardContent className="p-8 w-full h-full">
          <div className="w-full h-full overflow-y-auto pr-2">
            {error ? (
              <div className="text-sm text-red-600">{error}</div>
            ) : showLoadingCaret ? (
              <div className="pt-1">
                <span
                  aria-hidden="true"
                  className="inline-block align-text-bottom"
                  style={{
                    width: "4px",
                    height: "1.2em",
                    backgroundColor: "currentColor",
                    animation: "caret-blink 1s steps(1) infinite",
                  }}
                />
              </div>
            ) : reply ? (
              typed.length < reply.length ? (
                <pre className="m-0 whitespace-pre-wrap text-[0.98rem] leading-7">
                  {typed}
                  <span
                    aria-hidden="true"
                    className="inline-block align-text-bottom ml-1"
                    style={{ width: "4px", height: "1.2em", backgroundColor: "currentColor" }}
                  />
                </pre>
              ) : (
                <pre className="m-0 whitespace-pre-wrap text-[0.98rem] leading-7">{reply}</pre>
              )
            ) : null}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes caret-blink {
          0%, 40% { opacity: 1; }
          50%, 90% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
