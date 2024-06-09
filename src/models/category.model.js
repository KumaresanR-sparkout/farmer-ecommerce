import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    }
},
    {
        timestamps: true
    })

export default mongoose.model('Category', CategorySchema)