import Product from '../../models/product.model'
import Order from '../../models/order.model'
import * as response from '../../utils/response-util'
import { sendEmail } from '../../emails/mail-sender'
import { productApproveTemplate } from '../../emails/templates/product-approve-template'

export const createProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body)
        return response.sendSuccess(res, 200, 'product created', product)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const listProduct = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'empty content should not accepted')
        }

        const productList = await Product.find({}, { 'createdAt': 0, 'updatedAt': 0 })
            .populate({
                path: 'product_id', select: { 'createdAt': 0, 'updatedAt': 0 },
            })
            .populate({
                path: 'category_id', select: { 'createdAt': 0, 'updatedAt': 0 },
            })

        const regex = new RegExp(req.body.search, 'g')
        const filterData = productList.filter(data => {
            if (data.category_id.category.match(regex) || data.product_id.product.match(regex)) {
                return data
            }
        })

        return response.sendSuccess(res, 200, 'category list', filterData)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {

        const productDetails = await Product.findById(req.params.id)
            .populate({
                path: 'product_id', select: { 'createdAt': 0, 'updatedAt': 0 },
                populate: {
                    path: 'category', select: { 'createdAt': 0, 'updatedAt': 0 }
                }
            })
        if (!productDetails) {
            return response.sendError(res, 400, 'no product found by id')
        }
        return response.sendSuccess(res, 200, 'product details', productDetails)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!product) {
            return response.sendError(res, 400, 'no product find to update')
        }
        return response.sendSuccess(res, 200, 'updated product', product)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deleteProduct) {
            return response.sendError(res, 400, 'no product find to delete')
        }
        return response.sendSuccess(res, 200, 'deleted category', deleteProduct)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerProductOrder = async (req, res) => {
    try {

        const farmerOrder = await Order.find({ farmer_id: req.params.id }, { 'createdAt': 0, 'updatedAt': 0 })
            .populate({ path: 'product_id', select: { 'createdAt': 0, 'updatedAt': 0 } })
        return response.sendSuccess(res, 200, 'farmer order products', farmerOrder)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProductKyc = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'empty body should not be accepted')
        }
        const updateKyc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updateKyc) {
            return response.sendError(res, 400, 'no product found to update')
        }
        await sendEmail('kumare002345k@gmail.com', 'Product Approval', productApproveTemplate())
        return response.sendSuccess(res, 200, 'updated product kyc', updateKyc)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}