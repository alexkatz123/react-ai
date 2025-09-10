import type { Mode } from "../types";

export const modeMeta: Record<
  Mode,
  { label: string; desc: string; badge: string; dot: string; border: string }
> = {
  roast: {
    label: "Roast",
    desc: "Sarcastic, witty, specific — never hateful. Playful burns only.",
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-600",
    border: "border-red-200",
  },
  compliment: {
    label: "Compliment",
    desc: "Warm, genuine. Highlights one standout quality.",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-600",
    border: "border-emerald-200",
  },
  random: {
    label: "Random",
    desc: "50/50 roast or compliment. Spin the wheel.",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-500",
    border: "border-yellow-200",
  },
  ai_decide: {
    label: "AI Decide",
    desc: "Model chooses tone from the image context.",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-600",
    border: "border-indigo-200",
  },
};

export const modeLabel = (m: Mode) => modeMeta[m].label;
