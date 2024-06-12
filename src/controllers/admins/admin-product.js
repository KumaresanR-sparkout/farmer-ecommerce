import AdminProduct from '../../models/admin-product.model'
import Product from '../../models/product.model'
import * as response from '../../utils/response-util'

export const createProduct = async (req, res) => {
    try {
        const product = await AdminProduct.create(req.body)
        return response.sendSuccess(res, 200, 'category has created', product)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await AdminProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!product) {
            return response.sendError(res, 400, 'no product found to update')
        }
        return response.sendSuccess(res, 200, 'product has updated', product)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const deleteProduct = async (req, res) => {
    try {

        const adminProduct = await AdminProduct.findByIdAndDelete(req.params.id)
        if (!adminProduct) {
            return response.sendError(res, 400, 'no product found to delete')
        }
        await Product.deleteMany({ product_id: req.params.id })

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

        const product = await AdminProduct.findById(req.params.id)
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