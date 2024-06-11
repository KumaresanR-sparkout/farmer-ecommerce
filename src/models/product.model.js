import { required } from "joi"
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminCategory'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminProduct'
    },
    farmerId: {
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