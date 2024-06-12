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
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminCategory',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminProduct',
        required: true
    },
    farmer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'rejected']
    },
    url: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

export default mongoose.model('Product', ProductSchema)