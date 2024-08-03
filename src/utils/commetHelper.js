import { TweetRepository } from "../repository/index.js";

const tweetRepository = new TweetRepository();

export async function populateComment(id) {
    try {
        var tweet = await tweetRepository.getPopullatedComment(id);
        await Promise.all(tweet.comments.map(populateNestedComments));
        return tweet;
    } catch (error) {
        console.log("Error in the comment helper function.");
        console.log(error);
    }
}

async function populateNestedComments(comment) {
    try {
        await comment.populate({ path: 'comments' });
        await Promise.all(comment.comments.map(populateNestedComments));
    } catch (error) {
        console.log("Error in the comment helper function.");
        console.log(error);
    }
}
