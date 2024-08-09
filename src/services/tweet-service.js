import { TweetRepository, HashtagRepository } from '../repository/index.js';
import { populateComment } from '../utils/commetHelper.js';
import { ServiceError } from '../utils/errors/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        try {
            const content = data.content;
            //This regex extracts the hashtag
            //Forming array of tags from content.
            var tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
            if(tags.length > 0) {
                tags = new Set (tags.map((tag) => {
                    return tag.substring(1).toLowerCase();
                }));
            }
            const tweet = await this.tweetRepository.create(data);

            //Finding alreday present tags from tags array and then only extracting title of tags and storing in an array.
            let alreadyPresentTag = await this.hashtagRepository.findByName(Array.from(tags));
            let titleOfPresentTags = alreadyPresentTag.map((tag) => tag.title);
            let newTags = Array.from(tags).filter((tag) => !titleOfPresentTags.includes(tag)); //Now inside newTags we need only those tags to create already present shouldn't be there.
            //Currently tags hold string of array created an object out of it so that we can pass it into bulkcreate.
            newTags = newTags.map((tag) => {
                return {title: tag, tweets: [tweet.id]}
            });

            await this.hashtagRepository.bulkCreate(newTags);

            //Adding the current tweet inside the already present tags.
            alreadyPresentTag.forEach((tag) => {
                tag.tweets.push(tweet.id);
                tag.save();
            });

            /**Points to create hashtags and here
             * 1. Bulk Create in Mongoose
             * 2. Filter title of hashtag based on multiple tags
             * 3. How to add tweet ID inside all the hashtags
             */
            return tweet;
        } catch (error) {
            if(error.name == "RepositoryError" || error.name == "ValidationError" || error.name == "ClientError") {
                throw error;
            }
            throw new ServiceError();
        }
    }

    async get(id) {
        try {
            const tweet = await populateComment(id);
            return tweet;
        } catch (error) {
            if(error.name == "RepositoryError" || error.name == "ValidationError" || error.name == "ClientError" || error.name == "HelperFunctionError") {
                throw error;
            }
            throw new ServiceError();
        }
    }
};

export default TweetService;

/**
 * The tweet content might look like -> This is my #first #Tweet, really #excited.
 * All the hashtags will be stored in tags array tag = [#first, #Tweet, #excited]
 * Then modifying the tags array by removing the hashtag symbol and then storing the data in it.
 * tag = [first, Tweet, excited]
 */