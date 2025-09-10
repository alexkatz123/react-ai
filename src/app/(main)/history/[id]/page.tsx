import { getLoggedInUser } from "@/lib/auth";
import { databases } from "@/lib/appwrite";
import { notFound, redirect } from "next/navigation";
import { Query } from "node-appwrite";
import HistoryDetailView from "@/modules/history/ui/views/HistoryDetailView";
import { buildFileViewUrl } from "@/modules/history/utils/files";
import type { HistoryDoc } from "@/modules/history/types";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

export default async function HistoryDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("$id", id),
    Query.equal("userId", user.$id),
  ]);
  const doc = res.documents[0] as unknown as HistoryDoc | undefined;
  if (!doc) notFound();

  const imageUrl = buildFileViewUrl(doc.fileId);

  return (
    <HistoryDetailView
      mode={doc.mode}
      imageUrl={imageUrl}
      reply={doc.reply}
      fileId={doc.fileId}
      docId={doc.$id}
    />
  );
}
