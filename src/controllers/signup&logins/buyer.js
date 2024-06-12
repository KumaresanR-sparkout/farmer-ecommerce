import Buyer from '../../models/buyer.models'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'
import { encryptPassword, decryptPassword } from '../../bcrypt/bcrypt'

export const buyerRegister = async (req, res) => {
    try {

        const encrypt = await encryptPassword(req.body.password)
        req.body.password = encrypt

        const user = await Buyer.create(req.body)
        return response.sendSuccess(res, 200, 'please verify your kyc and enjoy', user)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await Buyer.findOne({ "email": email })
        if (!existingUser) {
            return response.sendError(res, 400, "In valid email")
        }

        if (!existingUser.status) {
            return response.sendError(res, 400, 'please contact admin to unblock your acess')
        }

        const decrypt = await decryptPassword(password, existingUser.password)

        if (!decrypt) {
            return response.sendError(res, 400, "In valid password")
        }
        const userToken = await jwtToken.generateToken({
            "id": existingUser._id,
            "role": existingUser.role,
            "kyc": existingUser.kyc,
        })

        const sendUserDetails = {
            "userId": existingUser._id,
            "email": existingUser.email,
            "token": userToken
        }
        return response.sendSuccess(res, 200, "successfully login", sendUserDetails)

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerUpdate = async (req, res) => {
    try {

        const updatedUser = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).select('-password')

        if (!updatedUser) {
            return response.sendError(res, 400, 'you are not the user to update the details')
        }
        return response.sendSuccess(res, 200, 'updated your details', updatedUser)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const buyerDelete = async (req, res) => {
    try {
        const deleteUser = await Buyer.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            return response.sendError(res, 400, 'you are not the user to delete the details')
        }
        return response.sendSuccess(res, 200, 'deleted your details', deleteUser)

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}