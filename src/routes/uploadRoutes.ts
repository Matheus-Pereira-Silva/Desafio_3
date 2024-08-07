import { Router } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
});

router.get('/uupload-url', async (req, res) => {
  const { fileName, fileType } = req.query;

  if (!fileName || !fileType) {
    return res.status(400).json({ message: 'File name and type are required' });
  }

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName as string,
    ContentType: fileType as string,
    ACL: 'public-read'
  };

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName as string,
      ContentType: fileType as string,
      ACL: 'public-read'
    });

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.status(200).json({ uploadURL });
  } catch (error) {
    res.status(500).json({ message: 'Error generating upload URL', error });
  }
});

export default router;
