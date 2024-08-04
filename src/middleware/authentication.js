import Token from '../utils/tokenHelper.js';
import { UserRepository } from '../repository/index.js';

export async function isAuthenticated(req, res, next) {
    try {
        const userRepository = new UserRepository();

        const token = req.headers['x-access-token'];
        
        const response = Token.verifyToken(token);
        if(!response) {
            throw {error: 'Invalid token'};
        }

        const user = await userRepository.get(response.id);
        if(!user) {
            throw {error: "No user with the corresponding token exists."};
        }

        req.body.user = user;

        next();
    } catch (error) {
        console.log("Something went wrong in the auth process");
        return res.status(500).json({
            success: false,
            data: {},
            message: "Error faced during user authentication.",
            err: error
        });
        
    }
}