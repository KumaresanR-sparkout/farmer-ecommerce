import Admin from '../../models/admin.model'
import Order from '../../models/order.model'
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
        date.setDate(date.getDate() - 2)
        const filterData = await Order.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gte: date
                    }
                }
            },
            {
                $group: {
                    _id: {
                        productId: '$product_id',
                        farmerId: '$farmer_id'
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
                    productId: '$_id.productId',
                    farmerId: '$_id.farmerId',
                    totalQuantity: '$totalQuantity',
                    orderCount: '$orderCount',

                }
            },
            {
                $sort: {
                    totalQuantity: -1
                }
            },
            {
                $limit: 5
            }
        ])
        return response.sendSuccess(res, 200, 'top selling products', filterData)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}