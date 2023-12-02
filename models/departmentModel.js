
import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hod: {
        type: String
    },
    notes: {
        type: String
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Department = mongoose.model('departments', DepartmentSchema)

export default Department;