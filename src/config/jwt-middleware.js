import Jwt from 'passport-jwt';
import { PASSPORT_KEY } from './serverConfig.js';
import { User } from '../models/index.js';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //This says to ectract the token from the headers as a bearer token.
    secretOrKey: PASSPORT_KEY
}

//This is token validation code. For Jwt type strategy implementation.
export const passportAuth = (passport) => {
    try {
        passport.use(new JwtStrategy(option, async(Jwt_payload, done) => { 
            const user = await User.findById(Jwt_payload.id);
            if(!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        }));
    } catch (error) {
        console.log("Error faced within the passport auth jwt-middleware.",error);
        throw error;
    }
}