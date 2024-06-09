import Farmer from '../../models/former.model'
import Product from '../../models/product.model'
import category from '../../models/category.model'
import * as response from '../../utils/response-util'

//List Products (filter by category, search by name)
export const listProducts = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'send body of content')
        }
        const productLists = await Product.find()
            .populate({
                path: 'category', match: {
                    $or: [{
                        _id: req.body.categoryId
                    },
                    { name: req.body.name }
                    ]
                }, select: { 'createdAt': 0, 'updatedAt': 0, '__v': 0 }
            })
            .populate({
                path: 'farmer', select: { 'password': 0, '__v': 0 }
            })

        //console.log(productLists)
        return response.sendSuccess(res, 200, 'product List', productLists)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}