
import mongoose from 'mongoose';

const StudentAttendenceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    subject_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    date: {
        type: Date,
        required: true
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const StudentAttendence = mongoose.model('studentAttendences', StudentAttendenceSchema)

export default StudentAttendence;