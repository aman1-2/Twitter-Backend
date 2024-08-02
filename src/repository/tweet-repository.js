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
            console.log("Error in repository layer.");
            console.log(error);
        }
    }
};

export default TweetRepository;