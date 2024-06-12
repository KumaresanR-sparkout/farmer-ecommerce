import Joi from 'joi'
import { sendError } from "../utils/response-util"

export const createProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            product: Joi.string().required(),
            category: Joi.string().hex().length(24).required()
        })
        await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res, next) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            product: Joi.string(),
            category: Joi.string().hex().length(24)
        })
        await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}