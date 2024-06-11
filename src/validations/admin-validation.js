import Joi from 'joi'
import { sendError } from '../utils/response-util'

export const adminRegister = async (req, res, next) => {
    try {
        const user = { ...req.body, ...req.role }
        const validateUserSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required(),
            contact: Joi.string().required(),
            role: Joi.string().valid('admin', 'subadmin').required()
        }).with('name', 'email')
        const validatedSchema = await validateUserSchema.validateAsync(user)
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
            password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)).required()
        }).with('email', 'password')

        const validatedSchema = await validateLoginSchema.validateAsync({ email, password })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const adminUpdate = async (req, res, next) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return sendError(res, 400, 'please send userId to update')
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendError(res, 400, 'send valid id');
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
            contact: Joi.string()
        })

        const validatedSchema = await validateUpdateSchema.validateAsync({ userId, ...user })
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

//@description  validating delete user data
export const adminDelete = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return sendError(res, 400, "please send userId to delete")
        }
        const { userId } = req.query
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendError(res, 400, 'send valid id');
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

