import Joi from 'joi'
import { sendError } from '../utils/response-util'
export const idValidation = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().hex().length(24).required()
        })
        await schema.validateAsync(req.params)
        next()
    }
    catch (error) {
        return sendError(res, 400, 'send valid id')
    }
}