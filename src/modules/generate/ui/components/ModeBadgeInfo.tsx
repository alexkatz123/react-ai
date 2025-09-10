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
    <div className="flex flex-col items-end gap-1 sm:gap-2 max-w-[200px] sm:max-w-sm text-[11px] sm:text-xs leading-tight">
      <div
        className={`w-full rounded-md border ${modeMeta[mode].border} bg-muted/40 px-2 py-1 sm:px-3 sm:py-2 text-muted-foreground`}
      >
        <span className="font-medium text-foreground">
          {modeMeta[mode].label}:
        </span>{" "}
        <span className="block sm:inline whitespace-normal">{modeMeta[mode].desc}</span>
      </div>

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
        <div className="h-4" />
      )}
    </div>
  );
}
