const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        max: [250, "Tweet Cannot have more than 250 characters."],
        required: true
    },
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

/*In an actual Twitter we don't have an option to update a tweet so either we have to delete a tweet or just leave it. */