import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminCategory',
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

export default mongoose.model('AdminProduct', schema)