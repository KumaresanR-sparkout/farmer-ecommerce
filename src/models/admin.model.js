import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    contact: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'subadmin', 'buyer', 'farmer'],
        trim: true,
        required: true
    },
})

export default mongoose.model('Admin', AdminSchema)