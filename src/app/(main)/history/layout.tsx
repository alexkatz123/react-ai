import { getLoggedInUser } from "@/lib/auth";
import { databases } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";
import HistoryLayoutView from "@/modules/history/ui/views/HistoryLayoutView";
import type { HistoryDoc } from "@/modules/history/types";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;

export default async function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("userId", user.$id),
  ]);
  const docs = res.documents as unknown as HistoryDoc[];

  return <HistoryLayoutView docs={docs}>{children}</HistoryLayoutView>;
}
