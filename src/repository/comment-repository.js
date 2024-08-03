import { Comment } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment)
    }
};

export default CommentRepository;