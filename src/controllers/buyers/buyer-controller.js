import Buyer from '../../models/buyer.models'
import * as response from '../../utils/response-util'

export const BuyerKYCProcess = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send buyerid to update')
        }
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'Empty content should not be accepted')
        }

        const buyerKYC = await Buyer.findByIdAndUpdate(req.query.userId, req.body, {
            new: true
        }).select('name email kyc')

        if (!buyerKYC) {
            return response.sendError(res, 400, 'not able to update kyc process')
        }
        return response.sendSuccess(res, 200, 'update kyc', [buyerKYC])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const allBuyers = async (req, res) => {
    try {
        const allBuyer = await Buyer.find({}, { password: 0 })
        return response.sendSuccess(res, 200, 'all buyers', allBuyers)
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
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send buyerid for details')
        }
        const buyerDetails = await Buyer.findById(req.query.buyerId).select('-password -__v')
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
        const buyerDetails = await Buyer.find({
            $or: [
                { ...req.query }
            ]
        },
            { 'password': 0, '__v': 0, 'idProof': 0 })
        //console.log(buyerDetails)
        return response.sendSuccess(res, 200, 'search buyer lists', buyerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}