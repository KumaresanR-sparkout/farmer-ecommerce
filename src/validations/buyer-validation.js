import Joi from 'joi'
import mongoose from 'mongoose'
import { sendError } from '../utils/response-util'

export const buyerRegister = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        const validateUserSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required(),
            contact: Joi.string().required(),
            country:Joi.string().required()
        }).with('name', 'email')
        const validatedSchema = await validateUserSchema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const buyerLogin = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        const { email, password } = req.body
        const validateLoginSchema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required()
        }).with('email', 'password')

        const validatedSchema = await validateLoginSchema.validateAsync({ email, password })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const buyerUpdate = async (req, res, next) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return sendError(res, 400, 'please send userId to update')
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendError(res, 400, 'send valid id')
        }
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'no body content find to update')
        }
        const user = req.body
        const validateUpdateSchema = Joi.object({
            userId: Joi.string(),
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)),
            contact: Joi.string(),
            country:Joi.string()
        })

        const validatedSchema = await validateUpdateSchema.validateAsync({ userId, ...user })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}


export const buyerDelete = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return sendError(res, 400, "please send userId to delete")
        }
        const { userId } = req.query
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendError(res, 400, 'send valid id')
        }
        const validateDeleteSchema = Joi.object({
            userId: Joi.string().required(),
        })
        const validatedSchema = await validateDeleteSchema.validateAsync({ userId })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

