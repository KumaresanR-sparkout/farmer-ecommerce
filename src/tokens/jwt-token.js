import JWT from 'jsonwebtoken'
import env from 'dotenv'
import { sendError } from '../utils/response-util'
env.config()

export const generateToken = async (data) => {
    const generateJwtToken = await JWT.sign(
        data, process.env.SECRET, {
        expiresIn: '15d'
    })
    return generateJwtToken
}

export const buyerKYCToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return sendError(res, 400, 'send token to acess the route')
    }
    const bearerToken = token.split(' ')[1]
    const verifyJwtToken = await JWT.verify(bearerToken, process.env.SECRET)

    if (verifyJwtToken.role != 'buyer') {
        return sendError(res, 400, 'your not the right user to acess the resource')
    }
    if (verifyJwtToken.kyc == 'pending') {
        return sendError(res, 400, 'verify your kyc to acess the resources')
    }
    next()
}

export const buyerToken = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return sendError(res, 400, 'send token to acess the route')
    }
    const bearerToken = token.split(' ')[1]
    const verifyJwtToken = await JWT.verify(bearerToken, process.env.SECRET)

    if (verifyJwtToken.role != 'buyer') {
        return sendError(res, 400, 'your not the right user to acess the resource')
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

    if (verifyJwtToken.jwt != 'farmer') {
        return sendError(res, 400, 'your not the right user to acess the resource')
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

    if (verifyJwtToken.jwt != 'admin') {
        return sendError(res, 400, 'your not the right user to acess the resource')
    }
    next()
}