const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    /*A tweet can have multiple hashtags and a hashtag can have multiple tweets.*/
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, { timestamps: true });

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
module.exports = Hashtag;