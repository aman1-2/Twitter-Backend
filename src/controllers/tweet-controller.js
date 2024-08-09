import upload from '../config/file-upload-s3-config.js';
import { TweetService } from '../services/index.js';
import { StatusCodes } from 'http-status-codes';

const tweetService = new TweetService();

const singleUploder = upload.single('image'); //You can use it inside the createTweet to have a image upload. It is like a middleware

const createTweet = async (req, res) => {
    try {
        // singleUploder(req, res, function(err, data){
        //     if(err) {
        //         return res.status(500).json({error: err});
        //     }
        //     console.log("File Object: ",file);
        //     console.log("Url: ", req.file.location);
        //     return res.status(200).json({msg: 'Ok'});
        // })
        const reqData = {
            content: req.body.content,
            user: req.user.id
        };

        if(!reqData.user || !reqData.content) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Content is must for Tweet Creation."
            });
        }
        const tweet = await tweetService.create(reqData);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: tweet,
            message: "Successfully Created a new Tweet.",
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.explanation
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
        return res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            error: error.explanation
        });
    }
}

export default {
    createTweet,
    getTweet
};