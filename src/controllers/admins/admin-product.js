import AdminProduct from '../../models/admin-product.model'
import Product from '../../models/product.model'
import mongoose from 'mongoose'
import * as response from '../../utils/response-util'

export const createProduct = async (req, res) => {
    try {
        const product = await AdminProduct.create(req.body)
        return response.sendSuccess(res, 200, 'category has created', [product])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await AdminProduct.findByIdAndUpdate(req.query.productId, req.body, {
            new: true
        })
        return response.sendSuccess(res, 200, 'product has updated', [product])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to delete')
        }
        if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        const adminProduct = await AdminProduct.findByIdAndDelete(req.query.productId)
        if (!adminProduct) {
            return response.sendError(res, 400, 'no product found to delete')
        }
        const product = await Product.deleteMany({ productId: req.query.productId })
        // if (product.deletedCount == 0) {
        //     return response.sendError(res, 400, 'no product found to delete')

        // }
        return response.sendSuccess(res, 200, 'product and releated things deleted', [])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {

        const product = await AdminProduct.find()
            .populate({ path: 'category' })
        return response.sendSuccess(res, 200, 'product details', product)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const getProductDetails = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to get details')
        }
        if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        const product = await AdminProduct.findById(req.query.productId)
            .populate({ path: 'category' })
        if (!product) {
            return response.sendError(res, 400, 'no product found')
        }
        return response.sendSuccess(res, 200, 'product details', product)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}