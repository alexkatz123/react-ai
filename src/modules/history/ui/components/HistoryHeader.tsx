import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BadgeVariant } from "@/types/types";
import { deleteHistory } from "@/modules/history/actions/delete";

type Props = {
  mode: BadgeVariant | string;
  fileId?: string;
  docId?: string;
};

export default function HistoryHeader({ mode, fileId, docId }: Props) {
  return (
    <CardHeader className="bg-gradient-to-r from-primary/10 via-transparent to-transparent">
      <div className="flex items-start justify-between gap-4">
        <div className="mt-3 flex-1">
          <CardTitle className="text-3xl">ReactAI</CardTitle>
          <CardDescription className="text-base">
            Your saved response, including the uploaded image and AI reply.
          </CardDescription>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={mode as BadgeVariant} className="capitalize">
            {mode}
          </Badge>
          {fileId && docId ? (
            <form action={deleteHistory.bind(null, fileId, docId)}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </CardHeader>
  );
}
