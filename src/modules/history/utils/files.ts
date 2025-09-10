export function buildFileViewUrl(
  fileId: string,
  options?: {
    endpoint?: string;
    bucketId?: string;
    projectId?: string;
  }
) {
  const ENDPOINT =
    options?.endpoint ||
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    "https://cloud.appwrite.io/v1";
  const BUCKET_ID =
    options?.bucketId ||
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!
  const PROJECT_ID =
    options?.projectId ||
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT!

  return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
}
