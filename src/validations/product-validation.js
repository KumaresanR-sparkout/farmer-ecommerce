import Joi from 'joi'
import { sendError } from '../utils/response-util'
import mongoose from 'mongoose'

export const createProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const category = mongoose.Types.ObjectId.isValid(req.body.categoryId)
        const product = mongoose.Types.ObjectId.isValid(req.body.productId)
        const farmer = mongoose.Types.ObjectId.isValid(req.body.farmerId)
        if (!category || !product || !farmer) {
            return sendError(res, 400, 'send valid id')
        }

        const schema = Joi.object({
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            categoryId: Joi.string().required(),
            productId: Joi.string().required(),
            farmerId: Joi.string().required()
        })
        const validateSchema = await schema.validateAsync(req.body)
        next()

    } catch (error) {
        return sendError(res, 500, error.message)
    }
}



export const updateProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return sendError(res, 400, 'send id to update product')
        }
        if (!mongoose.Types.ObjectId.isValid(req.query.productId)) {
            return sendError(res, 400, 'send valid id');
        }
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        
        const schema = Joi.object({
            price: Joi.number(),
            quantity: Joi.number(),
            categoryId: Joi.string(),
            productId: Joi.string(),
            farmerId: Joi.string()
        })

        const validateSchema = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return sendError(res, 500, error.message)
    }
}

