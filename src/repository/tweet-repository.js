const { Tweet } = require('../models/index');

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

module.exports = TweetRepository;