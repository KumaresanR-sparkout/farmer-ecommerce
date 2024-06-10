import { required } from "joi"
import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

export default mongoose.model('Order', OrderSchema)
