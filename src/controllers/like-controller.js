import { LikeService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";

const likeService = new LikeService();

const toggleLike = async(req, res) => {
    try {
        const modelId = req.query.modelId;
        const modelType = req.query.modelType;
        const userId = req.user.id;

        const islike = await likeService.toggleLike(modelId, modelType, userId);
        
        res.status(StatusCodes.CREATED).json({
            success: true,
            isLiked: islike,
            message: "Toggle Like Operation done.",
            err: {} 
        });
    } catch (error) {
        res.status(error.statusCode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.explanation 
        });
    }
}

export default {
    toggleLike
}