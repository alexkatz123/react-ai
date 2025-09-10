"use server";

import { storage, databases } from "@/lib/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID!;

export async function deleteHistory(fileId: string, docId: string) {
  // delete file
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (e) {
    console.error("Error deleting file:", e);
  }

  // delete document
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
  } catch (e) {
    console.error("Error deleting document:", e);
  }

  // refresh and redirect
  revalidatePath("/history");
  redirect("/history");
}
