import { ID, ExecutionMethod } from "appwrite";
import { storage, functions, databases } from "@/lib/appwrite";

const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID!;
const FUNCTION_ID = process.env.NEXT_PUBLIC_FUNCTION_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID!;
const CLIENT_API_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY!; // exposed on client

type RoastResult = {
  ok: boolean;
  reply?: string;
  error?: string;
};

export async function roastPicture(file: File): Promise<RoastResult> {
  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please provide a valid image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File too large (max 5MB).");
    }

    const fileId = ID.unique();
    await storage.createFile({
      bucketId: BUCKET_ID,
      fileId,
      file
    });

    const exec = await functions.createExecution({
      functionId: FUNCTION_ID,
      body: "",                 // no body for GET
      async: false,             // run synchronously
      xpath: `/?bucketId=${BUCKET_ID}&fileId=${fileId}&mode=roast`,
      method: ExecutionMethod.GET,
      headers: { "x-api-key": CLIENT_API_KEY }
    });

    const data: RoastResult = JSON.parse(exec.responseBody || "{}");

    if (!data.ok || !data.reply) {
      throw new Error(data.error || "Roast function failed");
    }

    await databases.createDocument({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      documentId: ID.unique(),
      data: {
        imageUrl: storage.getFileView({ bucketId: BUCKET_ID, fileId }).toString(),
        reply: data.reply
      }
    });

    return { ok: true, reply: data.reply };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return { ok: false, error: message };
  }
}
