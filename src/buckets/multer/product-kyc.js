import multer from 'multer'
import path from 'path'
import * as response from '../../utils/response-util'
import Product from '../../models/product.model'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/buckets/uploads/product-images/')
    },
    filename: async (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
export default upload

export const updateProductKyc = async (req, res) => {
    try {
        const imageLocation = path.resolve(req.files[0].path)
        const body = {
            url: imageLocation
        }
        const productKYC = await Product.findByIdAndUpdate(req.params.id, body, {
            new: true
        }).select('-createdAt -updatedAt')
        if (!productKYC) {
            return response.sendError(res, 400, 'no product found to update')
        }

        return response.sendSuccess(res, 200, 'product KYC status', productKYC)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
