class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Error in the repository layer.",error)
            throw error ("Error found in the crud repository.");
        }
    }

    async delete(id) {
        try {
            await this.model.findByIdAndDelete(id);
            return true;
        } catch (error) {
            console.log("Error in the repository layer.",error)
            new error ("Error found in the crud repository.");
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, {new: true});
            return response;
        } catch (error) {
            console.log("Error in the repository layer.",error)
            new error ("Error found in the crud repository.");
        }
    }

    async get(id) {
        try {
            const response = await this.model.findById(id);
            return response;
            /*exec() will return a promise otherwise the normal mongoose query returns a thenable. */
        } catch (error) {
            console.log("Error in the repository layer.",error)
            new error ("Error found in the crud repository.");
        }
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
            /*exec() will return a promise otherwise the normal mongoose query returns a thenable. */
        } catch (error) {
            console.log("Error in the repository layer.",error)
            new error ("Error found in the crud repository.");
        }
    }
};

export default CrudRepository;