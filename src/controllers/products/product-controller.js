import mongoose from 'mongoose'
import Product from '../../models/product.model'
import Order from '../../models/order.model'
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
        //return res.send('123')
        const { categoryId, product } = req.body
        if (categoryId && (!mongoose.Types.ObjectId.isValid(categoryId))) {
            return response.sendError(res, 400, 'send valid id')
        }
        let categoryFilter = {}
        if (!categoryId) {
            categoryFilter = {}
        }
        else {
            categoryFilter.categoryId = categoryId
        }
        //console.log(categoryFilter)
        const productList = await Product.find(categoryFilter, { 'createdAt': 0, 'updatedAt': 0, '__v': 0 })
            .populate({
                path: 'productId', match: {
                    $or: [
                        { product: { $regex: product, $options: 'i' } },
                    ]
                }, select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 },
                populate: {
                    path: 'category', select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 }
                }
            })

        const filterData = productList.filter(data => data.productId != null)

        return response.sendSuccess(res, 200, 'category list', filterData)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {

        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'pass id to get product details')
        }
        if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        const productDetails = await Product.findOne(req.query, { 'createdAt': 0, 'updatedAt': 0, '__v': 0 })
            .populate({
                path: 'productId', select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 },
                populate: {
                    path: 'category', select: { '__v': 0, 'createdAt': 0, 'updatedAt': 0 }
                }
            })
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
        if (!mongoose.Schema.Types.ObjectId.isValid(req.query.productId)) {
            return response.sendError(res, 400, 'send valid id')
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

export const farmerProductOrder = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to get details')
        }
        if (!mongoose.Types.ObjectId.isValid(req.query.farmerId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        const farmerOrder = await Order.find({ farmerId: req.query.farmerId }).populate({ path: 'productId' })
        return response.sendSuccess(res, 200, 'farmer order products', farmerOrder)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateProductKyc = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to get details')
        }
        //return res.send(req.query.productId)
        if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        if(Object.keys(req.body).length==0){
            return response.sendError(res, 400, 'empty body should not be accepted')
        }
        const updateKyc=await Product.findByIdAndUpdate(req.query.productId,req.body,{new:true})
        if(!updateKyc){
            return response.sendError(res,400,'no product found to update')
        }
        return response.sendSuccess(res,200,'updated product kyc',updateKyc)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}