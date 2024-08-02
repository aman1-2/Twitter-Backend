import { Like } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async findUserByLikeable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        } catch (error) {
            console.log("Error in the likes repository layer");
            throw error;
        }
    }
}

export default LikeRepository;