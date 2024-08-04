import { LikeRepository, TweetRepository, CommentRepository } from "../repository/index.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            if(modelType == 'Tweet') {
                var likeable = await this.tweetRepository.getPopullatedLike(modelId);
            } else if(modelType == 'Comment') {
                var likeable = await this.commentRepository.get(modelId);
            } else {
                throw new Error('unknown model type');
            }

            const exists = await this.likeRepository.findUserByLikeable({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            
            if(exists) {
                likeable.likes.pull(exists.id);
                await likeable.save();
                await this.likeRepository.delete(exists.id);
                var isAdded = false;
            } else {
                const newLike = await this.likeRepository.create({
                    user: userId,
                    onModel: modelType,
                    likeable: modelId
                });
                likeable.likes.push(newLike);
                await likeable.save();
                var isAdded = true;
            }

            return isAdded;
        } catch (error) {
            console.log("Error in the like service layer.",error);
            throw error;
        }
    }
};

export default LikeService;