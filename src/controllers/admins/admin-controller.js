import Admin from '../../models/admin.model'
import * as response from '../../utils/response-util'

export const adminLists = async (req, res) => {
    try {
        const farmers = await Admin.find({}, { 'password': 0, '__v': 0 })
        return response.sendSuccess(res, 200, 'admin Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const adminDetails = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'pass id to get details')
        }
        const farmerDetails = await Admin.findById(req.query.userId).select('-password -__v')
        if (!farmerDetails) {
            return response.sendError(res, 400, 'admins not found')
        }
        return response.sendSuccess(res, 200, 'search admin lists', farmerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}