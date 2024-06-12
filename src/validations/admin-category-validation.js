import Joi from 'joi'
import { sendError } from "../utils/response-util"

export const createCategory = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            category: Joi.string().required()
        })
        await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const updateCategory = async (req, res, next) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            category: Joi.string()
        })
        await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}