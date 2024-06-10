import Product from '../../models/product.model'
import Order from '../../models/order.model'
import { sendEmail } from '../../emails/mail-sender'
import { buyerTemplate } from '../../emails/templates/buyer-template'
import { farmerTemplate } from '../../emails/templates/farmer-template'
import { availableCountry } from '../middlewares/shipment-country'
import * as response from '../../utils/response-util'

export const filterProducts = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to get the details')
        }
        const productLists = await Product.find()
            .populate({
                path: 'category', select: { 'createdAt': 0, 'updatedAt': 0, '__v': 0 }
            })
            .populate({
                path: 'farmer', select: { 'password': 0, '__v': 0 }
            })
        //console.log(req.body)
        const filterData = []
        productLists.forEach(data => {
            if (data.name == req.body.name || data.farmer.name == req.body.farmer) {
                //console.log(data)
                filterData.push(data)
            }
        })

        //console.log(filterData)
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
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send content to order product')
        }

        const productId = req.query.productId
        const { buyerName, buyerId, buyerEmail, buyerCountry, quantity } = req.body
        const order = await Product.findById(productId)
            .populate({ path: 'farmer', select: { 'password': 0, '__v': 0, } })

        if (!order) {
            return response.sendError(res, 400, 'send valid productId')
        }
        if (order.quantity < quantity) {
            return response.sendError(res, 400, 'requested quantity not available')
        }
        const shipment = await availableCountry(buyerCountry, order.farmer.country)
        if (!shipment) {
            return response.sendError(res, 400, 'shipment is not available your country')
        }
        order.quantity -= quantity
        await order.save()
        const data = {
            name: order.name,
            price: order.price,
            quantity: quantity,
            totalPrice: order.price * quantity

        }
        await Order.create({
            buyerId: buyerId,
            farmerId: order.farmer._id,
            productId: productId,
            productName: data.name,
            quantity: data.quantity
        })

        await sendEmail(buyerEmail, 'your order has been confirmed', buyerTemplate({ buyer: buyerName, ...data }))
        await sendEmail(order.farmer.email, 'product has been ordered', farmerTemplate({
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