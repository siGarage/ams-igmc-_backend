
import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    group_name: {
        type: String
    },
    users_id: {
        type: Array,
    }
},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

);

const Group = mongoose.model('groups', GroupSchema)

export default Group;