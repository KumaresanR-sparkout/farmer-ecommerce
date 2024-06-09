import Category from '../../models/category.model'
import * as response from '../../utils/response-util'

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return response.sendSuccess(res, 200, 'category created', [category])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}
export const listCategory = async (req, res) => {
    try {
        const categoryList = await Category.find({}, { 'createdAt': 0, 'updatedAt': 0, '__v': 0 })
            .populate({
                path: 'farmer', select: { '__v': 0, 'password': 0, 'role': 0 }
            })

        return response.sendSuccess(res, 200, 'category list', categoryList)
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const categoryDetails = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'pass id to get category details')
        }
        const categoryDetails = await Category.findById(req.query.categoryId)
            .populate({
                path: 'farmer', select: { '__v': 0, 'password': 0, 'role': 0 }
            }).select('-__v -createdAt -updatedAt')
        if (!categoryDetails) {
            return response.sendError(res, 400, 'no category found by id')
        }
        return response.sendSuccess(res, 200, 'category details', [categoryDetails])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.query.categoryId, req.body, {
            new: true
        })
        if (!category) {
            return response.sendError(res, 400, 'no category find to update')
        }
        return response.sendSuccess(res, 200, 'updated category', [category])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const deleteCategory = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'send id to delete')
        }
        const deleteCategory = await Category.findByIdAndDelete(req.query.categoryId)
        if (!deleteCategory) {
            return response.sendError(res, 400, 'no category find to delete')
        }
        return response.sendSuccess(res, 200, 'deleted category', [deleteCategory])
    } catch (error) {
        return response.sendError(res, 500, error.message)
    }
}