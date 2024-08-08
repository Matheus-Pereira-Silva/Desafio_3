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
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const router = (0, express_1.Router)();
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});
router.get('/uupload-url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) {
        return res.status(400).json({ message: 'File name and type are required' });
    }
    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
        ACL: 'public-read'
    };
    try {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            ContentType: fileType,
            ACL: 'public-read'
        });
        const uploadURL = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 300 });
        res.status(200).json({ uploadURL });
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating upload URL', error });
    }
}));
exports.default = router;
