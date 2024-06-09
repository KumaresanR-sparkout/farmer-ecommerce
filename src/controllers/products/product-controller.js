import Product from '../../models/product.model'
import * as response from '../../utils/response-util'

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        return response.sendSuccess(res, 200, 'product created', [product])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const listProduct = async (req, res) => {
    try {
        const productList = await Product.find({}, { 'createdAt': 0, 'updatedAt': 0, '__v': 0 })
            .populate({
                path: 'category', select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 }
            })
            .populate({
                path: 'farmer', select: { '__v': 0, 'password': 0, 'role': 0 }
            })

        return response.sendSuccess(res, 200, 'category list', productList)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'pass id to get product details')
        }
        const productDetails = await Product.findById(req.query.productId)
            .populate({
                path: 'category', select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 }
            })
            .populate({
                path: 'farmer', select: { '__v': 0, 'password': 0, 'role': 0 }
            })
            .select('-__v -createdAt -updatedAt')
        if (!productDetails) {
            return response.sendError(res, 400, 'no product found by id')
        }
        return response.sendSuccess(res, 200, 'product details', [productDetails])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.query.productId, req.body, {
            new: true
        })
        if (!product) {
            return response.sendError(res, 400, 'no product find to update')
        }
        return response.sendSuccess(res, 200, 'updated product', [product])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to delete')
        }
        const deleteProduct = await Product.findByIdAndDelete(req.query.productId)
        if (!deleteProduct) {
            return response.sendError(res, 400, 'no category find to delete')
        }
        return response.sendSuccess(res, 200, 'deleted category', [deleteProduct])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}