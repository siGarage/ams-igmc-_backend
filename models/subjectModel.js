
import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    theory: {
        type: Boolean
    },
    practical: {
        type: Boolean
    },
    elective: {
        type: Boolean
    },
    status: {
        type: Boolean
    },
    description: {
        type: String
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Subject = mongoose.model('subjects', SubjectSchema)

export default Subject;