import Product from '../../models/product.model'
import Order from '../../models/order.model'
import { sendEmail } from '../../emails/mail-sender'
import { buyerTemplate } from '../../emails/templates/buyer-template'
import { farmerTemplate } from '../../emails/templates/farmer-template'
import { availableCountry } from '../middlewares/shipment-country'
import * as response from '../../utils/response-util'
import mongoose from 'mongoose'

export const filterProducts = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to get the details')
        }

        let categoryId = req.body.categoryId
        let farmerName = req.body.farmerName
        let productName = req.body.productName
        // console.log(product)
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
                path: 'productId', match: {
                    $or: [
                        { product: { $regex: productRegex, $options: 'i' } },
                    ]
                },
                select: { 'createdAt': 0, 'updatedAt': 0, '__v': 0, }
            })
            .populate({
                path: 'farmerId', match: {
                    $or: [
                        { name: { $regex: farmerRegex, $options: 'i' } },
                    ]
                }, select: { 'password': 0, '__v': 0 }
            })
        //console.log(productLists)
        //return res.send("123")

        const filterData = []
        productLists.forEach(data => {
            if (data.productId != null) {
                filterData.push({
                    farmerName: data.farmerId.name,
                    country: data.farmerId.country,
                    productname: data.productId.product
                })
            }

        })

        console.log(filterData)
        return response.sendSuccess(res, 200, 'filtered lists', filterData)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const orderProducts = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send productId to order the products')
        }
        const productId = req.query.productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return response.sendError(res, 400, 'send valid id')
        }
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to order product')
        }
        const { buyerName, buyerId, buyerEmail, buyerCountry, quantity } = req.body
        const order = await Product.findById(productId)
            .populate({ path: 'productId', select: { 'createdAt': 0, 'updatedAt': 0, '__v': 0, } })
            .populate({ path: 'farmerId', select: { 'password': 0, '__v': 0 } })
        //console.log(order)

        if (!order) {
            return response.sendError(res, 400, 'send valid productId')
        }
        if (order.quantity < quantity) {
            return response.sendError(res, 400, 'requested quantity not available')
        }
        const shipment = await availableCountry(buyerCountry, order.farmerId.country)
        if (!shipment) {
            return response.sendError(res, 400, 'shipment is not available your country')
        }
        order.quantity -= quantity
        await order.save()
        const data = {
            name: order.productId.product,
            price: order.price,
            quantity: quantity,
            totalPrice: order.price * quantity

        }

        await Order.create({
            buyerId: buyerId,
            farmerId: order.farmerId._id,
            productId: productId,
            productName: order.productId.product,
            quantity: data.quantity
        })

        await sendEmail(buyerEmail, 'your order has been confirmed', buyerTemplate({ buyer: buyerName, ...data }))
        await sendEmail(order.farmerId.email, 'product has been ordered', farmerTemplate({
            buyerName: buyerName,
            productName: data.name,
            quantity: data.quantity,
            totalPrice: data.price * data.quantity
        }))
        return response.sendSuccess(res, 200, 'order details', [data])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const productDetails = async (req, res) => {
    try {
        const product = await Product.find()
        .populate({ path: 'productId', select: { 'createdAt': 0, 'updatedAt': 0, '__v': 0, },
        populate:{
            path:'category'
        } })
        
        const filterProdct = []
        product.forEach(data => {
            filterProdct.push({
                productName: data.productId.product,
                category: data.productId.category.category,
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