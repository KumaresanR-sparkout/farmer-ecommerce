import Buyer from '../../models/buyer.models'
import mongoose from 'mongoose'
import { sendEmail } from '../../emails/mail-sender'
import { KYCApproveTemplate } from '../../emails/templates/approve-kyc-template'
import * as response from '../../utils/response-util'

export const buyerKYCProcess = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to update the KYC')
        }
        const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).select('-password')

        if (!buyer) {
            return response.sendError(res, 400, 'cound not update your status')
        }
        await sendEmail(buyer.email, 'your kyc has been approved', KYCApproveTemplate(buyer.name))
        return response.sendSuccess(res, 200, 'kyc status', buyer)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const allBuyers = async (req, res) => {
    try {
        const allBuyer = await Buyer.find({}, { password: 0 })
        return response.sendSuccess(res, 200, 'all buyers', allBuyer)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const pendingKYCBuyers = async (req, res) => {
    try {
        const kycPendingBuyers = await Buyer.find({
            kyc: 'pending'
        })

        return response.sendSuccess(res, 200, 'kyc pending buyers', kycPendingBuyers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const BuyerDetails = async (req, res) => {
    try {

        const buyerDetails = await Buyer.findById(req.params.id).select('-password')
        if (!buyerDetails) {
            return response.sendError(res, 400, 'no buyer details found')
        }
        return response.sendSuccess(res, 200, 'buyer details', buyerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerSearch = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send query to search')
        }
        const buyerDetails = await Buyer.find({
            $or: [
                { ...req.body }
            ]
        },
            { 'password': 0, 'id_proof': 0 })

        return response.sendSuccess(res, 200, 'search buyer lists', buyerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerStatus = async (req, res) => {
    try {

        const buyer = await Buyer.findByIdAndUpdate(req.params.id, {
            status: false
        }).select('name email status')
        if (!buyer) {
            return response.sendError(res, 400, 'no user found to update')
        }
        return response.sendSuccess(res, 200, 'buyer has been blocked', buyer)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}