import { required } from "joi"
import mongoose from "mongoose"

const ShipmentSchema = mongoose.Schema({
    from: {
        type: String,
        trime: true,
        required: true
    },
    to: {
        type: String,
        trime: true,
        required: true
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('Shipment', ShipmentSchema)