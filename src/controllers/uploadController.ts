// src/controllers/uploadController.ts
import { Request, Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure o cliente S3
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN || undefined // Inclua se necessário
  }
});

export const generateUploadURL = async (req: Request, res: Response) => {
  const { fileName, fileType } = req.query;

  if (typeof fileName !== 'string' || typeof fileType !== 'string') {
    return res.status(400).json({ message: 'File name and type must be strings' });
  }

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read' as const
  };

  try {
    console.log('Generating URL with params:', s3Params);

    const command = new PutObjectCommand(s3Params);
    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 });

    res.status(200).json({ uploadURL });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    res
      .status(500)
      .json({ message: 'Error generating upload URL', error: (error as Error).message });
  }
};
