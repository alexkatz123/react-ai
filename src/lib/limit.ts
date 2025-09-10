// src/lib/limit.ts
import Cookies from "js-cookie";

const LIMIT = parseInt(process.env.NEXT_PUBLIC_LIMIT || "5", 10);

function getMidnightUTC(): Date {
  const now = new Date();
  const reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return reset; // next midnight
}

export type LimitState = {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
};

export function checkLimit(addAttempt = false): LimitState {
  const now = Date.now();
  const resetAt = getMidnightUTC();

  let timestamps: number[] = [];
  try {
    timestamps = JSON.parse(Cookies.get("roast-history") || "[]");
  } catch {
    timestamps = [];
  }

  // keep only today’s timestamps
  timestamps = timestamps.filter((t) => t >= resetAt.getTime() - 24 * 60 * 60 * 1000);

  let allowed = timestamps.length < LIMIT;
  let remaining = Math.max(0, LIMIT - timestamps.length);

  if (addAttempt && allowed) {
    timestamps.push(now);
    Cookies.set("roast-history", JSON.stringify(timestamps), {
      expires: 1,
    });
    remaining = Math.max(0, LIMIT - timestamps.length);
    allowed = remaining > 0;
  }

  return { allowed, remaining, resetAt };
}
