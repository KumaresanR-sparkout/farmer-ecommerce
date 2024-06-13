import Admin from '../../models/admin.model'
import Order from '../../models/order.model'
import Product from '../../models/product.model'
import Farmer from '../../models/former.model'
import Buyer from '../../models/buyer.models'
import * as response from '../../utils/response-util'

export const adminLists = async (req, res) => {
    try {
        const farmers = await Admin.find({}, { 'password': 0 })
        return response.sendSuccess(res, 200, 'admin Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const adminDetails = async (req, res) => {
    try {

        const admin = await Admin.findById(req.params.id).select('-password')
        if (!admin) {
            return response.sendError(res, 400, 'admin not found')
        }
        return response.sendSuccess(res, 200, 'search admin lists', admin)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const topSellingProduct = async (req, res) => {
    try {
        let date = new Date()
        let endDate = new Date(date)
        let startDate = new Date(date)
        if (req.query.start) {
            startDate.setFullYear(req.query.start, 1, 0)
        }
        if (req.query.end) {
            endDate.setFullYear(req.query.end, 11, 31)
        }
        const filterData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        productId: '$product_id',
                    },
                    orderCount: {
                        $sum: 1
                    },
                    totalQuantity: {
                        $sum: '$quantity'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    product_id: '$_id.productId',
                    total_quantity: '$totalQuantity',
                    order_count: '$orderCount',

                }
            },
            {
                $sort: {
                    total_quantity: -1
                }
            },
            {
                $limit: 5
            }
        ])
        const farmerCount = await Farmer.countDocuments()
        const buyerCount = await Buyer.countDocuments()
        const productCount = await Product.countDocuments()
        const farmerProducts = await Product.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $count: 'total_products'
            },
            {
                $project: {
                    arrival_products: '$total_products'
                }
            }
        ])

        const filterField = req.query.start && req.query.end ? startDate.getFullYear() + '-' + endDate.getFullYear() : startDate.getFullYear()
        const topProducts = {
            total_farmers: farmerCount,
            total_users: buyerCount,
            top_selling_products: filterData,
            farmer_product: {
                total_products: productCount,
                [filterField]: farmerProducts[0].arrival_products
            }
        }
        return response.sendSuccess(res, 200, 'admin dasnboard lists', topProducts)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}