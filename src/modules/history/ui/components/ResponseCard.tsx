import { Card, CardContent } from "@/components/ui/card";

type Props = {
  reply: string;
};

export default function ResponseCard({ reply }: Props) {
  return (
    <Card className="h-[420px] sm:h-[520px] lg:h-[calc(100vh-300px)]">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2">
          <p className="text-sm whitespace-pre-wrap">{reply}</p>
        </div>
      </CardContent>
    </Card>
  );
}
