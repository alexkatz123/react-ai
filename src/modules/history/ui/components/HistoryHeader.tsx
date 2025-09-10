import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { BadgeVariant } from "@/types/types";

type Props = {
  mode: BadgeVariant | string;
};

export default function HistoryHeader({ mode }: Props) {
  return (
    <CardHeader className="bg-gradient-to-r from-primary/10 via-transparent to-transparent">
      <div className="flex items-start justify-between gap-4">
        <div className="mt-3 flex-1">
          <CardTitle className="text-3xl">ReactAI</CardTitle>
          <CardDescription className="text-base">
            Your saved response, including the uploaded image and AI reply.
          </CardDescription>
        </div>
        <Badge variant={mode as BadgeVariant} className="capitalize">
          {mode}
        </Badge>
      </div>
    </CardHeader>
  );
}

