import { Client, Account, Databases, Storage, Functions, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint(
    process.env.APPWRITE_ENDPOINT ||
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://cloud.appwrite.io/v1"
  )
  .setProject(
    (process.env.APPWRITE_PROJECT || process.env.NEXT_PUBLIC_APPWRITE_PROJECT)!
  )
  .setKey(process.env.APPWRITE_API_KEY!); // server-side only

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { client, ID };
