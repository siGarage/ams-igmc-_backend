import GROUP from "../models/groupModel.js";


export default {

    //Group create
    async createGroup(req, res) {
        let request = req.body;
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
            let groups = await GROUP.find();
            return res.status(200).json(groups);
        } catch (err) {
            return res.status(400).send({ message: "Unable to fetch Groups datails!" })
        }
    },


    // Delete Group
    async deleteGroup(req, res) {
        try {
            let id = req.query.id;
            const group = await GROUP.findByIdAndRemove(id);
            if (!group) {
                return res.status(404).send({ message: "Group not found" })
            }
            return res.status(200).send({ status_code: 200, id: id, message: "Group deleted successfully." })
        } catch (err) {
            console.log(err);
            return res.status(400).send(err)
        }
    }


}