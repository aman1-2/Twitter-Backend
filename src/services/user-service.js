import { UserRepository } from "../repository/index.js";
import bcrypt from 'bcrypt';
import Token from "../utils/tokenHelper.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    
    //Creation of the new user.
    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Error in the User service layer.");
            throw error;
        }
    }

    async signIn(data) {
        try {
            const user = await this.userRepository.findBy(data.email);
            if(!user) {
                throw {
                    error: "No User Found, First register."
                };
            }

            const encryptedPassword = user.password;
            const passwordMatch = this.verifyPassword(data.password, encryptedPassword);
            if(!passwordMatch) {
                throw {
                    error: "Password in Incorrect."
                };
            }
            
            const newJWT = Token.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Error in the User SignIn service layer.",error);
            throw error;
        }
    }

    verifyPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);
        } catch (error) {
            console.log("Error while verifying the user password.");
            throw error;
        }
    }

    
};

export default UserService;