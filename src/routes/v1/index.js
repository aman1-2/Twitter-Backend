const express = require('express');
const router = express.Router();

const TweetController = require('../../controllers/tweet-controller');

router.post('/tweets', TweetController.createTweet);

module.exports = router;