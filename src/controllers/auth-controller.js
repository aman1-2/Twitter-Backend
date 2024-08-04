import { UserService } from "../services/index.js";

const userService = new UserService();

const signUp = async(req, res) => {
    try {
        const reqData = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
        const newUser = userService.signUp(reqData);
        
        return res.status(201).json({
            success: true,
            data: newUser,
            message: "Successfully Created a User.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Unable to register you.",
            err: error
        });
    }
}

const signIn = async(req, res) => {
    try {
        const reqData = {
            email: req.body.email,
            password: req.body.password,
        }
        const token = await userService.signIn(reqData);
        
        return res.status(200).json({
            success: true,
            data: token,
            message: "User sign in successfully",
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Unable to Sign in User.",
            err: error
        });
    }
}

export default {
    signUp,
    signIn
}