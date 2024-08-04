import express from 'express';
const router = express.Router();

import TweetController from '../../controllers/tweet-controller.js';
import LikeController from '../../controllers/like-controller.js';
import CommentController from '../../controllers/comment-controller.js';
import AuthController from '../../controllers/auth-controller.js';
import { isAuthenticated } from '../../middleware/authentication.js';

router.post('/tweets', isAuthenticated, TweetController.createTweet);
router.get('/tweet/:id', TweetController.getTweet);

router.post('/likes/toggle', isAuthenticated, LikeController.toggleLike);

router.post('/comments', isAuthenticated, CommentController.create);

router.post('/users/signup', AuthController.signUp);
router.post('/users/signin', AuthController.signIn);

export default router;