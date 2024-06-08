import mongoose from "mongoose"

const FarmerSchema = new mongoose.Schema({
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
        default: 'farmer'
    }
})

export default mongoose.model('Farmer', FarmerSchema)