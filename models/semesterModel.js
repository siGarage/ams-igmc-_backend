
import mongoose from 'mongoose';

const SemesterSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
    subjects: {
        type: Array
    },
    description: {
        type: String
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Semester = mongoose.model('semesters', SemesterSchema)

export default Semester;