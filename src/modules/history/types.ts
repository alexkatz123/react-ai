import type { BadgeVariant } from "@/types/types";

export type HistoryDoc = {
  $id: string;
  userId: string;
  fileId: string;
  reply: string;
  mode: BadgeVariant | string;
};

