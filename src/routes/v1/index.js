import express from 'express';
const router = express.Router();

import TweetController from '../../controllers/tweet-controller.js';

router.post('/tweets', TweetController.createTweet);

export default router;