import multer from 'multer'
import path from 'path'
import * as response from '../../utils/response-util'
import Buyer from '../../models/buyer.models'
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

        const proofLocation = path.resolve(req.files[0].path)
        const body = {
            id_proof: proofLocation
        }
        const updatekyc = await Buyer.findByIdAndUpdate(req.params.id, body, {
            new: true
        }).select('-password')

        if (!updatekyc) {
            return response.sendError(res, 400, 'not able to update kyc')
        }

        return response.sendSuccess(res, 200, 'KYC status', updatekyc)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}