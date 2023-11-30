
import { isInteger } from 'lodash';
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    roll_no: {
        type: Number
    },
    avatar: {
        type: String
    },
    father_name: {
        type: String
    },
    phone_no: {
        type: Number
    },
    guardian_no: {
        type: Number
    },
    current_address: {
        type: String
    },
    permeanent_address: {
        type: String
    },
    batch: {
        type: Number
    },
    user_id: {
        type: String
    },
    course_id: {
        type: String
    },
    semester_id: {
        type: String
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    notes:{
        type:String
    },
    status: {
        type: Boolean
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Student = mongoose.model('students', StudentSchema)

export default Student;