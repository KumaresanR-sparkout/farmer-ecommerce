import mongoose from "mongoose"
import Joi from 'joi'
import { sendError } from "../utils/response-util"

export const createProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            product: Joi.string().required(),
            category: Joi.string().required()
        })
        const validatedSchema = await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return sendError(res, 400, 'send id to update the category')
        }
        // if (!mongoose.Types.ObjectId(req.query.categoryId)) {
        //     return sendError(res, 400, 'send valid category id')
        // }
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty content should not be accepted')
        }
        const schema = Joi.object({
            product: Joi.string(),
            category: Joi.string()
        })
        const validatedSchema = await schema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}