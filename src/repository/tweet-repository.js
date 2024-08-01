import { Tweet } from '../models/index.js';

class TweetRepository {
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