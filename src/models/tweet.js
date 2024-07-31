const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        max: [250, "Tweet Cannot have more than 250 characters."],
        required: true
    },
    
    /*A tweet can have multiple hashtags and a hashtag can have multiple tweets.*/
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

/*In an actual Twitter we don't have an option to update a tweet so either we have to delete a tweet or just leave it. */