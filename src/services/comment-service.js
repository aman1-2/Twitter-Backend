import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId, modelType, userId, content) {
        try {
            if(modelType == 'Tweet') {
                var commentable = await this.tweetRepository.get(modelId);
            } else if(modelType == 'Comment') {
                var commentable = await this.commentRepository.get(modelId);
            } else {
                throw new error ("Unknown Model Encountered");
            }

            //Storing the parent tweet on which comment is made.
            if(modelType == 'Comment') {
                var newComment = await this.commentRepository.create({
                    content: content,
                    user: userId,
                    onModel: modelType,
                    commentable: modelId,
                    parent: commentable.parent
                });
            } else {
                var newComment = await this.commentRepository.create({
                    content: content,
                    user: userId,
                    onModel: modelType,
                    commentable: modelId,
                    parent: modelId
                });
            }

            await commentable.comments.push(newComment.id);
            await commentable.save();

            return newComment;
        } catch (error) {
            console.log("Error occured inside the comment service layer.", error);
            throw error;
        }
    }
};

export default CommentService;