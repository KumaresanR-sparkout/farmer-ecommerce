import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

export default mongoose.model('AdminCategory', schema)