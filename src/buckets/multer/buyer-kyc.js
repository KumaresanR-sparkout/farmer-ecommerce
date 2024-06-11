import multer from 'multer'
import path from 'path'
import mongoose from 'mongoose'
import * as response from '../../utils/response-util'
import Buyer from '../../models/buyer.models'
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        //console.log(file)
        cb(null, './src/buckets/uploads/')
    },
    filename: async (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
export default upload

export const updateBuyerKYC = async (req, res) => {
    try {

        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to update product')
        }
        const userId = req.query.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        const proofLocation = path.resolve(req.files[0].path)
        const body = {
            idProof: proofLocation
        }
        const updatekyc = await Buyer.findByIdAndUpdate(userId, body, {
            new: true
        }).select('-password -__v')

        if (!updatekyc) {
            return response.sendError(res, 400, 'not updated kyc')
        }
        //console.log('file-path:', path.resolve(req.files[0].path))
        return response.sendSuccess(res, 200, 'KYC status', [updatekyc])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}