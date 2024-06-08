import JWT from 'jsonwebtoken'
import env from 'dotenv'
import { sendError } from '../utils/response-util'
env.config()

//@description  Generating the token token
export const generateToken = async (data) => {
    const generateJwtToken = await JWT.sign(
        data, process.env.SECRET, {
        expiresIn: '15d'
    })
    return generateJwtToken
}

//@description  Verifying the user sended token
export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]
    const verifyJwtToken = await JWT.verify(token, process.env.SECRET)
    if (verifyJwtToken.jwt != 'jwtToken') {
        return sendError(res, 401, 'send token to acess the route')
    }
    next()
}