import { Tweet } from '../models/index.js';
import { ValidationError, AppError } from '../utils/errors/index.js';
import CrudRepository from './crud-repository.js';
import { StatusCodes } from 'http-status-codes';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async create(data) {
        try{
            const tweet = await Tweet.create(data)
            return tweet;
        } catch (error) {
            if(error.name == "ValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "RepositoryError",
                "Cannot create a Tweet",
                "There was an issue creating a Tweet Please try again later.",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getPopullatedLike(id) {
        try {
            const response = await Tweet.findById(id).populate({path: 'likes'}).exec();
            return response;
        } catch (error) {
            if(error.name == "ValidationError") {
                throw new ValidationError(error);
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
                "Like Popullation Error",
                "Error Occured during Populating Likes",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getPopullatedComment(id) {
        try {
            const response = await Tweet.findById(id).populate({ path: 'comments' });
            return response;
        } catch (error) {
            if(error.name == "ValidationError") {
                throw new ValidationError(error);
            }
            if(error.name == "CastError") {
                throw new AppError(
                    "ClientError",
                    "Wrong detail passed",
                    error.message,
                    StatusCodes.BAD_REQUEST
                )
            }
            throw new AppError(
                "RepositoryError",
                "Comment Popullation Error",
                "Error Occured during Populating Comments",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};

export default TweetRepository;