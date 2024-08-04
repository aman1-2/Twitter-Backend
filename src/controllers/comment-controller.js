import { CommentService } from "../services/index.js";

const commentService = new CommentService();

const create = async (req, res) => {
    try {
        const modelId = req.query.modelId;
        const modelType = req.query.modelType;
        const userId = req.user.id;
        const content = req.body.content;

        const comment = await commentService.create(modelId, modelType, userId, content);

        return res.status(201).json({
            success: true,
            data: comment,
            message: "Successfully Created a Comment.",
            err: {}
        });
    } catch (error) {
        console.log("Error occured in comment controller layer.", error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Error occured while creating a Comment.",
            err: error
        });
    }
}

export default {
    create
};