import { LikeRepository, TweetRepository, CommentRepository } from "../repository/index.js";
import { AppError, ServiceError } from "../utils/errors/index.js";
import { StatusCodes } from "http-status-codes";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            if(modelType == 'Tweet') {
                var likeable = await this.tweetRepository.getPopullatedLike(modelId);
            } else if(modelType == 'Comment') {
                var likeable = await this.commentRepository.get(modelId);
            } else {
                throw new AppError(
                    "ClientError",
                    "Made a Invalid Request",
                    "The modelType send in the request is not acceptable.",
                    StatusCodes.BAD_REQUEST
                );
            }

            const exists = await this.likeRepository.findUserByLikeable({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            
            if(exists) {
                likeable.likes.pull(exists.id);
                await likeable.save();
                await this.likeRepository.delete(exists.id);
                var isAdded = false;
            } else {
                const newLike = await this.likeRepository.create({
                    user: userId,
                    onModel: modelType,
                    likeable: modelId
                });
                likeable.likes.push(newLike);
                await likeable.save();
                var isAdded = true;
            }

            return isAdded;
        } catch (error) {
            if(error.name == "RepositoryError" || error.name == "ValidationError" || error.name == "ClientError") {
                throw error;
            }
            throw new ServiceError();
        }
    }
};

export default LikeService;