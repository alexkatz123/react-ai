import "server-only";

import {
  Client,
  Storage,
  Functions,
  Databases,
  ID,
  ExecutionMethod,
} from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getLoggedInUser } from "@/lib/auth"; // <- you'll use your existing auth util

/** Helper to enforce required envs */
function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}

/** ---- Appwrite client (server) ---- */
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(required("APPWRITE_PROJECT"))
  .setKey(required("APPWRITE_API_KEY"));

const storage = new Storage(client);
const functions = new Functions(client);
const databases = new Databases(client);

/** ---- Config ---- */
const BUCKET_ID = required("APPWRITE_BUCKET_ID");
const FUNCTION_ID = required("APPWRITE_FUNCTION_ID");
const DATABASE_ID = required("APPWRITE_DATABASE_ID");
const COLLECTION_ID = required("APPWRITE_COLLECTION_ID");
const CLIENT_API_KEY = required("ROAST_CLIENT_API_KEY");

/** Types */
export type RoastResult =
  | { ok: true; reply: string }
  | { ok: false; error: string };

export type Mode = "roast" | "compliment" | "random" | "ai_decide";

type Uploadable =
  | { file: File; filename?: string }
  | { buffer: Buffer; filename: string };

type FunctionExecResponse = {
  ok?: boolean;
  reply?: string;
  error?: string;
};

/** Main entry */
export async function roastPicture(
  input: Uploadable,
  mode: Mode = "roast"
): Promise<RoastResult> {
  try {
    // Normalize input
    let inputFile: Awaited<ReturnType<typeof InputFile.fromBuffer>>;
    if ("file" in input) {
      const f = input.file;
      if (!f.type?.startsWith?.("image/"))
        return { ok: false, error: "Please provide a valid image file." };
      if (f.size > 5 * 1024 * 1024)
        return { ok: false, error: "File too large (max 5MB)." };

      const ab = await f.arrayBuffer();
      inputFile = InputFile.fromBuffer(Buffer.from(ab), f.name || "upload.bin");
    } else {
      if (input.buffer.byteLength > 5 * 1024 * 1024)
        return { ok: false, error: "File too large (max 5MB)." };
      inputFile = InputFile.fromBuffer(
        input.buffer,
        input.filename || "upload.bin"
      );
    }

    // Upload file
    const fileId = ID.unique();
    await storage.createFile({
      bucketId: BUCKET_ID,
      fileId,
      file: inputFile,
    });

    // Execute function
    const xpath = `/?bucketId=${encodeURIComponent(
      BUCKET_ID
    )}&fileId=${encodeURIComponent(fileId)}&mode=${encodeURIComponent(mode)}`;

    const exec = await functions.createExecution({
      functionId: FUNCTION_ID,
      body: "",
      async: false,
      xpath,
      method: ExecutionMethod.GET,
      headers: { "x-api-key": CLIENT_API_KEY },
    });

    let parsed: FunctionExecResponse = {};
    try {
      parsed = JSON.parse(exec.responseBody || "{}") as FunctionExecResponse;
    } catch {
      /* ignore */
    }

    if (!parsed.ok || typeof parsed.reply !== "string" || !parsed.reply.trim()) {
      return {
        ok: false,
        error: parsed.error || "Roast function failed",
      };
    }

    // --- Check logged in user ---
    const user = await getLoggedInUser();

    if (!user) {
      // Not logged in → cleanup file, don't save
      try {
        await storage.deleteFile(BUCKET_ID, fileId);
      } catch {
        /* ignore */
      }
      return { ok: true, reply: parsed.reply };
    }

    // Logged in → save doc
    await databases.createDocument({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      documentId: ID.unique(),
      data: {
        userId: user.$id,
        fileId,
        mode,
        reply: parsed.reply,
      },
    });

    return { ok: true, reply: parsed.reply };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Unknown error occurred";
    return { ok: false, error: message };
  }
}
