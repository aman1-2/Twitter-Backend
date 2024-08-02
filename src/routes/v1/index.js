import express from 'express';
const router = express.Router();

import TweetController from '../../controllers/tweet-controller.js';
import LikeController from '../../controllers/like-controller.js';

router.post('/tweets', TweetController.createTweet);
router.post('/likes/toggle', LikeController.toggleLike);

export default router;