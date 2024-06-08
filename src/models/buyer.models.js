import mongoose from "mongoose"

const BuyerSchema = new mongoose.Schema({
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
    role:{
        type:String,
        default:'buyer'
    }
})

export default mongoose.model('Buyer', BuyerSchema)