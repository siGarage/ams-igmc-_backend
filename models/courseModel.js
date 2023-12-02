
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    subjects: {
        type: Array
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Course = mongoose.model('courses', CourseSchema)

export default Course;