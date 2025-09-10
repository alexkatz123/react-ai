import { Card } from "@/components/ui/card";
import type { BadgeVariant } from "@/types/types";
import HistoryHeader from "../components/HistoryHeader";
import ImageCard from "../components/ImageCard";
import ResponseCard from "../components/ResponseCard";

type Props = {
  mode: BadgeVariant | string;
  imageUrl: string;
  reply: string;
  fileId: string;
  docId: string;
};

export default function HistoryDetailView({ mode, imageUrl, reply, fileId, docId }: Props) {
  return (
    <div className="w-full min-h-screen lg:h-[calc(100vh-56px)] lg:overflow-hidden p-4 md:p-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl lg:h-full flex flex-col lg:min-h-0">
        <Card className="lg:flex-1 flex flex-col lg:min-h-0">
          <HistoryHeader mode={mode} fileId={fileId} docId={docId} />

          <div className="p-8 flex flex-col lg:flex-1 lg:min-h-0">
            <div className="lg:flex-1 min-h-0 grid grid-cols-1 gap-8 lg:grid-cols-2 overflow-visible lg:overflow-hidden">
              <ImageCard imageUrl={imageUrl} />
              <ResponseCard reply={reply} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
