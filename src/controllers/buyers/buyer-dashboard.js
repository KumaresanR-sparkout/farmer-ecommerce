import mongoose from 'mongoose'
import Product from '../../models/product.model'
import Order from '../../models/order.model'
import { sendEmail } from '../../emails/mail-sender'
import { buyerTemplate } from '../../emails/templates/buyer-template'
import { farmerTemplate } from '../../emails/templates/farmer-template'
import { availableCountry } from '../utils/shipment-country'
import * as response from '../../utils/response-util'

export const filterProducts = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to get the details')
        }
        let categoryId = req.body.categoryId
        let farmerName = req.body.farmerName
        let productName = req.body.productName

        if (categoryId && (!mongoose.Types.ObjectId.isValid(categoryId))) {
            return response.sendError(res, 400, 'send valid id')
        }
        let categoryFilter = {}
        if (categoryId) {
            categoryFilter.category_id = categoryId
        }
        let productRegex = productName
        let farmerRegex = farmerName
        if (!productName) {
            productRegex = ''
        }
        if (!farmerName) {
            farmerRegex = ''
        }

        const productLists = await Product.find(categoryFilter)
            .populate({
                path: 'product_id', match: {
                    $or: [
                        { product: { $regex: productRegex, $options: 'i' } },
                    ]
                },
                select: { 'createdAt': 0, 'updatedAt': 0 }
            })
            .populate({
                path: 'farmer_id', match: {
                    $or: [
                        { name: { $regex: farmerRegex, $options: 'i' } },
                    ]
                }, select: { 'password': 0 }
            })

        const filterData = []
        productLists.forEach(data => {
            if (data.product_id != null) {
                filterData.push({
                    farmerName: data.farmer_id.name,
                    country: data.farmer_id.country,
                    productname: data.product_id.product
                })
            }

        })

        return response.sendSuccess(res, 200, 'filtered lists', filterData)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const orderProducts = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to order product')
        }
        const { buyerName, buyerId, buyerEmail, buyerCountry, quantity } = req.body
        const order = await Product.findById(req.params.id)
            .populate({ path: 'product_id', select: { 'createdAt': 0, 'updatedAt': 0 } })
            .populate({ path: 'farmer_id', select: { 'password': 0 } })

        if (!order) {
            return response.sendError(res, 400, 'no product found this id')
        }
        if (order.quantity < quantity) {
            return response.sendError(res, 400, 'requested quantity not available')
        }
        const shipment = await availableCountry(buyerCountry, order.farmer_id.country)
        if (!shipment) {
            return response.sendError(res, 400, 'shipment is not available your country')
        }
        order.quantity -= quantity
        await order.save()
        const data = {
            name: order.product_id.product,
            price: order.price,
            quantity: quantity,
            totalPrice: order.price * quantity

        }

        await Order.create({
            buyer_id: buyerId,
            buyer_email: buyerEmail,
            farmer_id: order.farmer_id._id,
            category_id: order.category_id,
            product_id: req.params.id,
            product_name: order.product_id.product,
            quantity: data.quantity
        })

        sendEmail(buyerEmail, 'your order has been confirmed', buyerTemplate({ buyer: buyerName, ...data }))
        sendEmail(order.farmer_id.email, 'product has been ordered', farmerTemplate({
            buyerName: buyerName,
            productName: data.name,
            quantity: data.quantity,
            totalPrice: data.price * data.quantity
        }))
        return response.sendSuccess(res, 200, 'order details', data)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {
        const product = await Product.find()
            .populate({
                path: 'product_id', select: { 'createdAt': 0, 'updatedAt': 0 },
                populate: {
                    path: 'category'
                }
            })

        const filterProdct = []
        product.forEach(data => {
            filterProdct.push({
                productName: data.product_id.product,
                category: data.product_id.category.category,
                quantity: data.quantity,
                price: data.price
            })
        })
        return response.sendSuccess(res, 200, 'Farmer products', filterProdct)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerOrders = async (req, res) => {
    try {
        const buyerOrder = await Order.find({ buyer_id: req.params.id })
            .populate({ path: 'product_id' })
        return response.sendSuccess(res, 200, 'buyer order lists', buyerOrder)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}