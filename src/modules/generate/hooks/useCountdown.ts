"use client";

import { useEffect, useState } from "react";

export function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(0, target.getTime() - Date.now())
  );

  useEffect(() => {
    const tick = () => {
      setTimeLeft(Math.max(0, target.getTime() - Date.now()));
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");

  return `${hours}:${minutes}`;
}
