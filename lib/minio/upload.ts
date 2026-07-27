import { randomUUID } from "crypto";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { minioClient, MINIO_BUCKET, publicImageUrl } from "./index";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image exceeds 10MB limit");
  }

  const ext = path.extname(file.name) || ".jpg";
  const key = `covers/${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await minioClient.send(
    new PutObjectCommand({
      Bucket: MINIO_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    }),
  );

  return publicImageUrl(key);
}
