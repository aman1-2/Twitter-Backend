import { User } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        try {
            const response = await User.findOne({email: email});
            return response;
        } catch (error) {
            console.log("Error in the User Repository layer.",error);
            throw error;
        }
    }
};

export default UserRepository;