import { Hashtag } from '../models/index.js';
import CrudRepository from './crud-repository.js';
import { ValidationError, AppError } from '../utils/errors/index.js';
import { StatusCodes } from 'http-status-codes';

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag);
    }
    
    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
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
                "Cannot create a Hashtag",
                "There was an issue creating a Hashtag Please try again later.",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findByName(data) {
        try {
            const response = await Hashtag.find({
                title: data
            });
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
                "Cannot Find a Hashtag",
                "There was an issue While Finding a Hashtag with Name.",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async bulkCreate(data) {
        try {
            const response = await Hashtag.insertMany(data);
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
                "Cannot BulkCreate Hashtags",
                "There was an issue while creating HashTags in Bulk.",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};

export default HashtagRepository;