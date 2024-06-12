import Admin from '../../models/admin.model'
import * as response from '../../utils/response-util'

export const adminLists = async (req, res) => {
    try {
        const farmers = await Admin.find({}, { 'password': 0 })
        return response.sendSuccess(res, 200, 'admin Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const adminDetails = async (req, res) => {
    try {

        const admin = await Admin.findById(req.params.id).select('-password')
        if (!admin) {
            return response.sendError(res, 400, 'admin not found')
        }
        return response.sendSuccess(res, 200, 'search admin lists', admin)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}