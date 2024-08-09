import { Like } from "../models/index.js";
import CrudRepository from "./crud-repository.js";
import { ValidationError, AppError } from "../utils/errors/index.js";
import { StatusCodes } from "http-status-codes";

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async findUserByLikeable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        } catch (error) {
            if(error.name == "ValidationError") {
                throw new ValidationError
            }
            if(error.name == "CastError") {
                throw new AppError(
                    "ClientError",
                    "Made an Invalid Request.",
                    error.message,
                    StatusCodes.BAD_REQUEST
                );
            }
            throw new AppError(
                "RepositoryError",
                "Cannot Find User who Liked",
                "There was an in findUserByLikeable Function.",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

export default LikeRepository;