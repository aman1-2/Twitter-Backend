import { LikeService } from "../services/index.js";

const likeService = new LikeService();

const toggleLike = async(req, res) => {
    try {
        const modelId = req.query.modelId;
        const modelType = req.query.modelType;
        const userId = req.body.userId;

        const islike = await likeService.toggleLike(modelId, modelType, userId);
        
        res.status(200).json({
            success: true,
            isLiked: islike,
            message: "Toggle Like Operation done.",
            err: {} 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong in Toggle Like Operation.",
            err: error 
        });
    }
}

export default {
    toggleLike
}