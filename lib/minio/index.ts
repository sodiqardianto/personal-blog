import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT ? Number(process.env.MINIO_PORT) : undefined;
const useSsl = process.env.MINIO_USE_SSL !== "false";
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;
const bucket = process.env.MINIO_BUCKET_NAME ?? "personal-blog";
const publicUrl = process.env.MINIO_PUBLIC_URL ?? `https://${endpoint}`;

if (!endpoint || !accessKey || !secretKey) {
  throw new Error("Minio/S3 environment variables are not set");
}

export const minioClient = new S3Client({
  region: "us-east-1",
  endpoint: `${useSsl ? "https" : "http"}://${endpoint}${port ? `:${port}` : ""}`,
  forcePathStyle: true,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
});

export const MINIO_BUCKET = bucket;
export const MINIO_PUBLIC_BASE = `${publicUrl.replace(/\/$/, "")}/${bucket}`;

export function publicImageUrl(key: string): string {
  return `${MINIO_PUBLIC_BASE}/${key.replace(/^\//, "")}`;
}
