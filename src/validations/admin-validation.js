import Joi from 'joi'
import { sendError } from '../utils/response-util'

export const adminRegister = async (req, res, next) => {
    try {
        const validateUserSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required(),
            contact: Joi.string().required()
        }).with('name', 'email')
        await validateUserSchema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const validateLoginSchema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/))
        }).with('email', 'password')

        await validateLoginSchema.validateAsync({ email, password })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const adminUpdate = async (req, res, next) => {
    try {

        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'no body content find to update')
        }

        const validateUpdateSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)),
            contact: Joi.string()
        })

        await validateUpdateSchema.validateAsync(req.body)
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}



