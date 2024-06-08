import { sendError } from '../utils/response-util'
export const admin = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        req.role = { role: 'admin' }
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}

export const subAdmin = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return sendError(res, 400, 'Empty body should not be accepted')
        }
        req.role = { role: 'subadmin' }
        next()
    }
    catch (error) {
        return sendError(res, 500, error.message)
    }
}