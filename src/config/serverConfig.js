import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const SALT = bcrypt.genSaltSync(10);
const JWT_KEY = process.env.JWT_KEY;
const PASSPORT_KEY = process.env.PASSPORT_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

export {
    PORT,
    DB_URL,
    SALT,
    JWT_KEY,
    PASSPORT_KEY,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID,
    S3_BUCKET_NAME
};