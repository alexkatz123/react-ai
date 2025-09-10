import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImagePlus, History, Sparkles } from "lucide-react";

export default function HistoryEmptyView() {
  return (
    <div className="w-full h-full p-6">
      <Card className="h-full flex flex-col">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <History className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">No item selected</CardTitle>
          <CardDescription>
            Pick a saved roast/compliment from the left — or create a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link href="/generate">
                <Button className="gap-2 w-full sm:w-auto">
                  <ImagePlus className="h-4 w-4" /> New Roast / Compliment
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" className="w-full sm:w-auto">Refresh History</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Upload an image
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose any face photo to get a playful roast or a kind compliment.
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Pick a mode
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Toggle between “Roast” and “Compliment” for the vibe you want.
                </p>
              </div>
              <div className="rounded-lg border p-4 bg-muted/30">
                <div className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Auto-saved to history
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every result is saved here so you can revisit or delete later.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

