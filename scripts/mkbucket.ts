import { S3Client, CreateBucketCommand, PutPublicAccessBlockCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import { minioClient, MINIO_BUCKET } from "../lib/minio/index";

async function main() {
  try {
    await minioClient.send(new CreateBucketCommand({ Bucket: MINIO_BUCKET }));
    console.log("bucket created:", MINIO_BUCKET);
  } catch (e: any) {
    if (e.name === "BucketAlreadyOwnedByYou" || e.name === "BucketAlreadyExists") {
      console.log("bucket already exists:", MINIO_BUCKET);
    } else {
      throw e;
    }
  }
  await minioClient.send(new PutPublicAccessBlockCommand({
    Bucket: MINIO_BUCKET,
    PublicAccessBlockConfiguration: { BlockPublicAcls: false, IgnorePublicAcls: false, BlockPublicPolicy: false, RestrictPublicBuckets: false },
  }));
  await minioClient.send(new PutBucketPolicyCommand({
    Bucket: MINIO_BUCKET,
    Policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [{ Sid: "PublicRead", Effect: "Allow", Principal: "*", Action: ["s3:GetObject"], Resource: [`arn:aws:s3:::${MINIO_BUCKET}/*`] }],
    }),
  }));
  console.log("public policy applied");
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
