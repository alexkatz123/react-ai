export type Mode = "roast" | "compliment" | "random" | "ai_decide";

export type RoastResult = { ok: boolean; reply?: string; error?: string };

export type RoastFormValues = { image: File[]; mode: Mode };

export type RoastAction = (formData: FormData) => Promise<RoastResult>;
