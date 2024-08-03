import { TweetService } from '../services/index.js';

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.create(req.body);
        return res.status(201).json({
            success: true,
            data: tweet,
            message: "Successfully Created a new Tweet.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Unable to Create a Tweet.",
            err: error
        });
    }
}

const getTweet = async (req, res) => {
    try {
        const tweet = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            data: tweet,
            message: "Success Fetched the Tweet Detail.",
            err: {}
        });
    } catch (error) {
        console.log("Error in the tweet Controller layer.",error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Error while fetching the Tweet Detail.",
            err: error
        });
    }
}

export default {
    createTweet,
    getTweet
};