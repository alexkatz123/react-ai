import { getLoggedInUser } from "@/lib/auth";
import { client, databases } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID!;
const ENDPOINT = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = process.env.APPWRITE_PROJECT!;

function buildFileViewUrl(fileId: string) {
  return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
}

export default async function HistoryPage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
  Query.equal("userId", user.$id),
]);

  const docs = res.documents;

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">My History</h1>

      {docs.length === 0 && (
        <p className="text-muted-foreground">You haven’t roasted or complimented anything yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <Card key={doc.$id} className="overflow-hidden">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base">AI Response</CardTitle>
              <Badge variant="outline">{doc.mode}</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={buildFileViewUrl(doc.fileId)}
                  alt="Uploaded"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm whitespace-pre-wrap">{doc.reply}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
