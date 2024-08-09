import { CommentService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";

const commentService = new CommentService();

const create = async (req, res) => {
    try {
        const modelId = req.query.modelId;
        const modelType = req.query.modelType;
        const userId = req.user.id;
        const content = req.body.content;

        const comment = await commentService.create(modelId, modelType, userId, content);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: comment,
            message: "Successfully Created a Comment.",
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

export default {
    create
};