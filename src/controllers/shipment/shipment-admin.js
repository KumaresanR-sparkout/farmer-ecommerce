import Shipment from '../../models/shipment.model'
import * as response from '../../utils/response-util'
export const createShipment = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'Empty body should not pass')
        }
        const shipment = await Shipment.create(req.body)
        return response.sendSuccess(res, 200, 'Shipment created', shipment)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id)
        if (!shipment) {
            return response.sendError(res, 400, 'you are not the user to delete the details')
        }
        return response.sendSuccess(res, 200, 'Shipment Deleted', shipment)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}