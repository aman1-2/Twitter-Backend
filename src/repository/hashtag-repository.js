import { Hashtag } from '../models/index.js';
import CrudRepository from './crud-repository.js';

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag);
    }
    
    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
        } catch (error) {
            console.log("Error in the Repository layer.")
            console.log(error);
        }
    }

    async findByName(data) {
        try {
            const response = await Hashtag.find({
                title: data
            });
            return response;
        } catch (error) {
            console.log("Error in the Repository layer.")
            console.log(error);
        }
    }

    async bulkCreate(data) {
        try {
            const response = await Hashtag.insertMany(data);
            return response;
        } catch (error) {
            console.log("Error in the Repository layer.")
            console.log(error);
        }
    }
};

export default HashtagRepository;