import { Client, Storage, Functions, Databases, Account } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1") // default set to appwrite cloud
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); 

export const storage = new Storage(client);
export const functions = new Functions(client);
export const databases = new Databases(client);
export const account = new Account(client);


export { client };
