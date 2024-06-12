import Joi from 'joi'
import { sendError } from '../utils/response-util'

export const createProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        const schema = Joi.object({
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category_id: Joi.string().hex().length(24).required(),
            product_id: Joi.string().hex().length(24).required(),
            farmer_id: Joi.string().hex().length(24).required()
        })
        await schema.validateAsync(req.body)
        next()

    } catch (error) {
        return sendError(res, 500, error.message)
    }
}



export const updateProduct = async (req, res, next) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const schema = Joi.object({
            price: Joi.number(),
            quantity: Joi.number(),
            category_id: Joi.string().hex().length(24),
            product_id: Joi.string().hex().length(24),
            farmer_id: Joi.string().hex().length(24)
        })

        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return sendError(res, 500, error.message)
    }
}

