import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  imageUrl: string;
};

export default function ImageCard({ imageUrl }: Props) {
  return (
    <Card className="h-[420px] sm:h-[520px] lg:h-[calc(100vh-300px)] overflow-hidden">
      <CardContent className="h-full">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image src={imageUrl} alt="Uploaded" fill className="object-contain" />
        </div>
      </CardContent>
    </Card>
  );
}

