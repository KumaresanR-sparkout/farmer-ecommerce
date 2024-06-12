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
        default: 'admin',
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Admin', AdminSchema)