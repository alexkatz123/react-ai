import { Card, CardContent } from "@/components/ui/card";
import { deleteHistory } from "@/modules/history/actions/delete";

type Props = {
  reply: string;
  fileId: string;
  docId: string;
};

export default function ResponseCard({ reply, fileId, docId }: Props) {
  return (
    <Card className="h-[420px] sm:h-[520px] lg:h-[calc(100vh-300px)]">
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto pr-2">
          <p className="text-sm whitespace-pre-wrap">{reply}</p>
        </div>
        <div className="pt-4">
          <form action={deleteHistory.bind(null, fileId, docId)}>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
