import Joi from 'joi'
import { sendError } from '../utils/response-util'

export const createProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category: Joi.string().required(),
            farmer: Joi.string().required()
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
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const schema = Joi.object({
            name: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            category: Joi.string(),
            farmer: Joi.string()
        })

        const validateSchema = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return sendError(res, 500, error.message)
    }
}

