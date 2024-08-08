"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const REGION = process.env.AWS_REGION || 'us-east-2';
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN || '';
const s3 = new client_s3_1.S3Client({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN
    }
});
exports.default = s3;
