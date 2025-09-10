// src/app/(main)/generate/page.tsx
import "server-only";
import RoastView from "@/modules/roast/ui/views/roast-view";
import { roastPicture, type Mode, type RoastResult as ServerRoastResult } from "@/lib/roast";

// UI-facing result shape expected by RoastView
type UIRoastResult = { ok: boolean; reply?: string; error?: string };

export default function Page() {
  async function roastAction(formData: FormData): Promise<UIRoastResult> {
    "use server";
    try {
      const file = formData.get("image") as File | null;
      const mode = (formData.get("mode") as Mode | null) ?? "roast";
      if (!file) return { ok: false, error: "No file provided" };

      const res: ServerRoastResult = await roastPicture({ file }, mode);

      if (res.ok) {
        return { ok: true, reply: res.reply };
      }
      return { ok: false, error: res.error };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Server error";
      return { ok: false, error: msg };
    }
  }

  return <RoastView roastAction={roastAction} />;
}

