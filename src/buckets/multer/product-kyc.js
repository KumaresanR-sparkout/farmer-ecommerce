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
        const productId = req.query.productId
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to update product')
        }
        const imageLocation = path.resolve(req.files[0].path)
        const body = {
            status: 'approved',//rejected
            url: imageLocation
        }
        const productKYC = await Product.findByIdAndUpdate(productId, body, {
            new: true
        }).select('-createdAt -updatedAt')
        //console.log('file-path:', path.resolve(req.files[0].path))
        return response.sendSuccess(res, 200, 'product KYC status', [productKYC])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}