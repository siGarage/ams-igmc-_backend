import GROUP from "../models/groupModel.js";


export default {

    //Group create
    async createGroup(req, res) {
        let request = req.body;
        if (Object.keys(request).length == 0) {
            return res.json(reply.failed("All input is required!"));
        }
        let validation = new Validator(request, {
            name: 'required|string'
        });
        if (validation.fails()) {
            let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
            return res.json(reply.failed(validation.errors.first(err_key)));
        }
        let exist = await GROUP.findOne({ "group_name": request.group_name });
        if (exist) {
            return res.status(200).send({ message: 'This group name is already exists!' });
        }
        try {
            let group = await GROUP.create(request);
            return res.status(200).send({ status_code: 200, group: group, message: "Group created successfully." });
        } catch (err) {
            return res.status(400).send({ message: "Something Went Wrong!" })
        }
    },


    // Get Groups
    async getGroup(req, res) {
        try {
            const groups = await GROUP.find();
            return res.status(200).json(groups);
        } catch (err) {
            return res.status(400).send({ message: "Unable to fetch groups list." })
        }
    },


    // Delete Group
    async deleteGroup(req, res) {
        try {
            let id = req.query.id;
            const group = await GROUP.findByIdAndRemove(id);
            if (!group) {
                return res.status(404).send({ message: "Group not found." })
            }
            return res.status(200).send({id: id, message: "Group deleted successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    }


}