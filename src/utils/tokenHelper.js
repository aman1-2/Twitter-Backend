import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config/serverConfig.js';

function createToken(payload) {
    try {
        const token = jwt.sign(payload, JWT_KEY, { expiresIn: '1h'});
        return token;
    } catch (error) {
        console.log("Something went wrong during the token creation.",error);
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_KEY);
    } catch (error) {
        console.log("Something went wrong in token validation");
        throw error;
    }
}

export default {
    createToken,
    verifyToken
}