import Joi from 'joi'
import { sendError } from '../utils/response-util'

export const createCategory = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const categorySchema = Joi.object({
            name: Joi.string(),
            farmer: Joi.string()
        }).with('name', 'farmer')

        const validateSchema = await categorySchema.validateAsync(req.body)
        next()
    } catch (error) {
        return sendError(res, 500, error.message)
    }
}



export const updateCategory = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return sendError(res, 400, 'send id to update category')
        }
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }

        const schema = Joi.object({
            name: Joi.string(),
            farmer: Joi.string()
        })

        const validateSchema = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return sendError(res, 500, error.message)
    }
}

