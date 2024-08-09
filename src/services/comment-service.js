import { CommentRepository, TweetRepository } from "../repository/index.js";
import { AppError, ServiceError } from "../utils/errors/index.js";
import { StatusCodes } from "http-status-codes";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId, modelType, userId, content) {
        try {
            if(modelType == 'Tweet') {
                var commentable = await this.tweetRepository.get(modelId);
            } else if(modelType == 'Comment') {
                var commentable = await this.commentRepository.get(modelId);
            } else {
                throw new AppError(
                    "ClientError",
                    "Made a Invalid Request",
                    "The modelType send in the request is not acceptable.",
                    StatusCodes.BAD_REQUEST
                );
            }

            //Storing the parent tweet on which comment is made.
            if(modelType == 'Comment') {
                var newComment = await this.commentRepository.create({
                    content: content,
                    user: userId,
                    onModel: modelType,
                    commentable: modelId,
                    parent: commentable.parent
                });
            } else {
                var newComment = await this.commentRepository.create({
                    content: content,
                    user: userId,
                    onModel: modelType,
                    commentable: modelId,
                    parent: modelId
                });
            }

            await commentable.comments.push(newComment.id);
            await commentable.save();

            return newComment;
        } catch (error) {
            if(error.name == "RepositoryError" || error.name == "ValidationError" || error.name == "ClientError") {
                throw error;
            }
            throw new ServiceError();
        }
    }
};

export default CommentService;