import multer from 'multer'
import path from 'path'
import * as response from '../../utils/response-util'
import Buyer from '../../models/buyer.models'
import { json } from 'express'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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
        const userId=req.query.userId
        const proofLocation=path.resolve(req.files[0].path)
        const body={
            idProof:proofLocation
        }
        const updatekyc=await Buyer.findByIdAndUpdate(userId, body, {
            new: true
        }).select('-password -__v')
        //console.log('file-path:', path.resolve(req.files[0].path))
        return response.sendSuccess(res,200,'KYC status',[updatekyc])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}