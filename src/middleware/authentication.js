import passport from 'passport';

// import Token from '../utils/tokenHelper.js';
// import { UserRepository } from '../repository/index.js';

export const isAuthenticated = (req, res, next) => {
    try {
        passport.authenticate('jwt', (err, user) => {
            if(err) next(err);
            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorised access.",
                });
            }
            req.user = user;
            next();
        })(req, res, next);

        // const userRepository = new UserRepository();

        // const token = req.headers['x-access-token'];
        
        // const response = Token.verifyToken(token);
        // if(!response) {
        //     throw {error: 'Invalid token'};
        // }

        // const user = await userRepository.get(response.id);
        // if(!user) {
        //     throw {error: "No user with the corresponding token exists."};
        // }

        // req.body.user = user;
        // next();
    } catch (error) {
        console.log("Something went wrong in the auth process",error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Error faced during user authentication.",
            err: error
        });
        
    }
}