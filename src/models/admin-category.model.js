import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('AdminCategory', schema)