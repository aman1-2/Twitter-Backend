import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, S3_BUCKET_NAME } from './serverConfig';

aws.config.update({
    region: AWS_REGION,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

export default upload;