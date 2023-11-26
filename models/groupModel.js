
import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    group_name: {
        type: String
    }, 
    description: {
        type: String
    },
    facultyAttedenceViewPermission: {
        type: Boolean
    },
    studentAttendenceViewPermision: {
        type: Boolean
    },
    facultyAttendeceUpdatePermission: {
        type: Boolean
    },
    studentAttendenceUpdatePermission: {
        type: Boolean
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Group = mongoose.model('groups', GroupSchema)

export default Group;