import { Tweet } from '../models/index.js';
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async create(data) {
        try{
            const tweet = await Tweet.create(data)
            return tweet;
        } catch (error) {
            console.log("Error in Tweet repository layer.");
            console.log(error);
        }
    }

    async getPopullatedLike(id) {
        try {
            const response = await Tweet.findById(id).populate({path: 'likes'}).exec();
            return response;
        } catch (error) {
            console.log("Error in the Tweet repository layer");
            throw error;
        }
    }
};

export default TweetRepository;