import { TweetRepository } from "../repository/index.js";
import { AppError } from "./errors/index.js";

const tweetRepository = new TweetRepository();

export async function populateComment(id) {
    try {
        var tweet = await tweetRepository.getPopullatedComment(id);
        await Promise.all(tweet.comments.map(populateNestedComments));
        return tweet;
    } catch (error) {
        if(error.name == "ClientError") {
            throw error;
        }
        throw new AppError(
            "HelperFunctionError",
            "Comment Helper Faced an Issue",
            "Error occured while populating the comments of a tweet."
        );
    }
}

async function populateNestedComments(comment) {
    try {
        await comment.populate({ path: 'comments' });
        await Promise.all(comment.comments.map(populateNestedComments));
    } catch (error) {
        throw new AppError(
            "HelperFunctionError",
            "Comment Helper Faced an Issue",
            "Error occured while populating the comments of a comments."
        );
    }
}
