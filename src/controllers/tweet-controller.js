const { TweetService } = require('../services/index');

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
            success: true,
            data: {},
            message: "Unable to Create a Tweet.",
            err: error
        });
    }
}

module.exports = {
    createTweet
}