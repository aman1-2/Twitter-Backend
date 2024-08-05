import upload from '../config/file-upload-s3-config.js';
import { TweetService } from '../services/index.js';

const tweetService = new TweetService();

const singleUploder = upload.single('image'); //You can use it inside the createTweet to have a image upload. It is like a middleware

const createTweet = async (req, res) => {
    try {
        // singleUploder(req, res, function(err, data){
        //     if(err) {
        //         return res.status(300).json({error: err});
        //     }
        //     console.log("File Object: ",file);
        //     console.log("Url: ", req.file.location);
        //     return res.status(200).json({msg: 'Ok'});
        // })
        const reqData = {
            content: req.body.content,
            user: req.user.id
        };
        const tweet = await tweetService.create(reqData);
        return res.status(201).json({
            success: true,
            data: tweet,
            message: "Successfully Created a new Tweet.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Unable to Create a Tweet.",
            err: error
        });
    }
}

const getTweet = async (req, res) => {
    try {
        const tweet = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            data: tweet,
            message: "Success Fetched the Tweet Detail.",
            err: {}
        });
    } catch (error) {
        console.log("Error in the tweet Controller layer.",error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Error while fetching the Tweet Detail.",
            err: error
        });
    }
}

export default {
    createTweet,
    getTweet
};