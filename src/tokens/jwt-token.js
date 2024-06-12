import JWT from 'jsonwebtoken'
import env from 'dotenv'
import Admin from '../models/admin.model'
import Farmer from '../models/former.model'
import Buyer from '../models/buyer.models'
import { sendError } from '../utils/response-util'
env.config()

export const generateToken = async (data) => {
    const generateJwtToken = await JWT.sign(
        data, process.env.SECRET, {
        expiresIn: '15d'
    })
    return generateJwtToken
}

export const buyerToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return sendError(res, 400, 'send token to acess the route')
    }
    const bearerToken = token.split(' ')[1]
    const verifyJwtToken = await JWT.verify(bearerToken, process.env.SECRET)
    const buyer = await Buyer.findById(verifyJwtToken.id)
    if (!buyer) {
        return sendError(res, 400, 'send valid token')
    }
    next()
}

export const farmerToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return sendError(res, 400, 'send token to acess the route')
    }
    const bearerToken = token.split(' ')[1]
    const verifyJwtToken = await JWT.verify(bearerToken, process.env.SECRET)
    const farmer = await Farmer.findById(verifyJwtToken.id)
    if (!farmer) {
        return sendError(res, 400, 'send valid token')
    }
    next()
}

export const adminToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return sendError(res, 400, 'send token to acess the route')
    }
    const bearerToken = token.split(' ')[1]
    const verifyJwtToken = await JWT.verify(bearerToken, process.env.SECRET)
    const admin = await Admin.findById(verifyJwtToken.id)
    if (!admin) {
        return sendError(res, 400, 'send valid token')
    }
    next()
}