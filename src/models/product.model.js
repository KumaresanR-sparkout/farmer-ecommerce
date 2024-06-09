import { required } from "joi"
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    status: {
        type: String,
        enum: ['approved', 'rejected'],
        default: null
    },
    url: {
        type: String,
        trim: true,
        default: null
    }
})

export default mongoose.model('Product', ProductSchema)