import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },

    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel'
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

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;