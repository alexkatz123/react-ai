"use client";

import type { Mode } from "../../types";
import { modeMeta } from "../../utils/mode";

type Props = {
  mode: Mode;
  limit: { allowed: boolean; remaining: number; resetAt: Date | null };
  countdown: string;
  mounted?: boolean;
};

export default function ModeBadgeInfo({ mode, limit, countdown, mounted }: Props) {
  return (
    <div className="flex flex-col items-end gap-2 max-w-sm text-xs">
      {/* Mode explainer */}
      <div
        className={`rounded-md border ${modeMeta[mode].border} bg-muted/40 px-3 py-2 text-muted-foreground`}
      >
        <span className="font-medium text-foreground">
          {modeMeta[mode].label}:
        </span>{" "}
        {modeMeta[mode].desc}
      </div>

      {/* Tries + countdown */}
      {mounted ? (
        limit.resetAt && (
          <div className="text-muted-foreground">
            {limit.allowed ? (
              <span>
                {limit.remaining} tries left today (resets in {countdown})
              </span>
            ) : (
              <span className="text-red-600">
                Limit reached. Resets in {countdown}
              </span>
            )}
          </div>
        )
      ) : (
        // Render an empty placeholder so server & client match
        <div className="h-4" />
      )}
    </div>
  );
}
