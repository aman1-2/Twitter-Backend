import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        max: [250, "Tweet Cannot have more than 250 characters."],
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    image: {
        type: String
    }
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;

/*In an actual Twitter we don't have an option to update a tweet so either we have to delete a tweet or just leave it. */