import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    father_name: {
        type: String
    },
    email: {
        type: String,
        allowNull: false
    },
    roll_no: {
        type: Number,
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    course: {
        type: String
    }

},

    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const User = mongoose.model('users', userSchema)

export default User;