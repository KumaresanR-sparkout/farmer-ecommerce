import mongoose from 'mongoose'
import Farmer from '../../models/former.model'
import * as response from '../../utils/response-util'

export const farmerLists = async (req, res) => {
    try {
        const farmers = await Farmer.find({}, { 'password': 0 })
        return response.sendSuccess(res, 200, 'Farmer Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerSearch = async (req, res) => {
    try {
        if (Object.keys(req.body).length == 0) {
            return response.sendError(res, 400, 'empty content should not be accepted')
        }
        const farmerDetails = await Farmer.find({
            $or: [
                { ...req.body }
            ]
        },
            { 'password': 0 })

        return response.sendSuccess(res, 200, 'search farmer lists', farmerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerDetails = async (req, res) => {
    try {

        const farmerDetails = await Farmer.findById(req.params.id).select('-password')
        if (!farmerDetails) {
            return response.sendError(res, 400, 'farmer not found')
        }

        return response.sendSuccess(res, 200, 'farmer details', farmerDetails)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}