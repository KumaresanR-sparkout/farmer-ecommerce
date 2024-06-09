import Admin from '../../models/admin.model'
import * as response from '../../utils/response-util'

export const subAdminLists = async (req, res) => {
    try {
        const farmers = await Admin.find({}, { 'password': 0, '__v': 0 })
        return response.sendSuccess(res, 200, 'Farmer Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const subAdminDetails = async (req, res) => {
    try {
        if (Object.keys(req.query).length == 0) {
            return response.sendError(res, 400, 'pass id to get details')
        }
        const farmerDetails = await Admin.findById(req.query.userId).select('-password -__v')
        if (!farmerDetails) {
            return response.sendError(res, 400, 'subadmins not found')
        }
        //console.log(farmerDetails)
        return response.sendSuccess(res, 200, 'search farmer lists', farmerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}