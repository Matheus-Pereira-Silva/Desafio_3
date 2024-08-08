"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUploadURL = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
// Configure o cliente S3
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN || undefined // Inclua se necessário
    }
});
const generateUploadURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, fileType } = req.query;
    if (typeof fileName !== 'string' || typeof fileType !== 'string') {
        return res.status(400).json({ message: 'File name and type must be strings' });
    }
    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
        ACL: 'public-read'
    };
    try {
        console.log('Generating URL with params:', s3Params);
        const command = new client_s3_1.PutObjectCommand(s3Params);
        const uploadURL = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 300 });
        res.status(200).json({ uploadURL });
    }
    catch (error) {
        console.error('Error generating upload URL:', error);
        res
            .status(500)
            .json({ message: 'Error generating upload URL', error: error.message });
    }
});
exports.generateUploadURL = generateUploadURL;
