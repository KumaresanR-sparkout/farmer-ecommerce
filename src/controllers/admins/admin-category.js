import AdminCategory from '../../models/admin-category.model'
import AdminProduct from '../../models/admin-product.model'
import Product from '../../models/product.model'
import * as response from '../../utils/response-util'

export const createCategory = async (req, res) => {
    try {
        const category = await AdminCategory.create(req.body)
        return response.sendSuccess(res, 200, 'category has created', category)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await AdminCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!category) {
            return response.sendError(res, 400, 'no category found to update')
        }
        return response.sendSuccess(res, 200, 'category has updated', category)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const adminCategory = await AdminCategory.findByIdAndDelete(req.params.id)
        if (!adminCategory) {
            return response.sendError(res, 400, 'no category found to delete')
        }
        const adminProduct = await AdminProduct.deleteMany({ category: req.params.id })

        if (adminProduct.deletedCount == 0) {
            return response.sendError(res, 400, 'no admin product found to delete')

        }
        await Product.deleteMany({ category_id: req.params.id })

        return response.sendSuccess(res, 200, 'category and releated things deleted', [])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const listCategory = async (req, res) => {
    try {
        const categoryList = await AdminCategory.find()
        return response.sendSuccess(res, 200, 'category list', categoryList)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const categoryDetails = async (req, res) => {
    try {
        const category = await AdminCategory.findById(req.params.id)
        if (!category) {
            return response.sendError(res, 400, 'no category found')
        }
        return response.sendSuccess(res, 200, 'category Details', category)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}