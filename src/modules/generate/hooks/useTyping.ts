import { useEffect, useState } from "react";

export function useTypingEffect(source: string) {
  const [typed, setTyped] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!source) {
      setTyped("");
      setCompleted(false);
      return;
    }
    setTyped("");
    setCompleted(false);

    let i = 0;
    let cancelled = false;
    const base = 22;
    const punct = 10;

    const tick = () => {
      if (cancelled) return;
      setTyped((p) => p + source[i]);
      i++;
      if (i >= source.length) {
        setCompleted(true);
        return;
      }
      const ch = source[i - 1];
      const delay = /[.,!?;:]/.test(ch) ? punct : base;
      setTimeout(tick, delay);
    };

    const t = setTimeout(tick, base);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [source]);

  return { typed, completed, setCompleted };
}
