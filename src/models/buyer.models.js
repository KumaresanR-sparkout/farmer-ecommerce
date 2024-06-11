import mongoose from "mongoose"
import { sendEmail } from '../emails/mail-sender'
import { KYCVerifyTemplate } from '../emails/templates/verify-kyc-template'
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
    country: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        default: 'buyer'
    },
    status: {
        type: String,
        default: 'unblock',
        enum: ['unblock', 'block']
    },
    kyc: {
        type: String,
        default: 'pending',
        enum: ['approved', 'rejected', 'pending']
    },
    idProof: {
        type: 'string',
        trim: true,
        default: null
    }
})

BuyerSchema.post('save', async (buyer, next) => {

    await sendEmail(buyer.email, 'verify your identity for KYC', KYCVerifyTemplate(buyer.name))
    next()
})

export default mongoose.model('Buyer', BuyerSchema)