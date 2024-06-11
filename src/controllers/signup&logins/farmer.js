import Farmer from '../../models/former.model'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'
import { encryptPassword, decryptPassword } from '../../bcrypt/bcrypt'

export const farmerRegister = async (req, res) => {
    try {

        const encrypt = await encryptPassword(req.body.password)
        req.body.password = encrypt

        const user = await Farmer.create(req.body)
        return response.sendSuccess(res, 200, 'created', [user])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await Farmer.findOne({ "email": email })
        if (!existingUser) {
            return response.sendError(res, 400, "In valid email")
        }

        const decrypt = await decryptPassword(password, existingUser.password)

        if (!decrypt) {
            return response.sendError(res, 400, "In valid password")
        }
        const userToken = await jwtToken.generateToken({
            "jwt": "farmer"
        })
        const sendUserDetails = {
            "userId": existingUser._id,
            "email": existingUser.email,
            "token": userToken
        }
        return response.sendSuccess(res, 200, "successfully login", [sendUserDetails])

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerUpdate = async (req, res) => {
    try {
        const { userId } = req.query
        const updatedUser = await Farmer.findByIdAndUpdate(userId, req.body, {
            new: true
        }).select('-password -__v')

        if (!updatedUser) {
            return response.sendError(res, 400, 'you are not the user to update the details')
        }
        return response.sendSuccess(res, 200, 'updated your details', [updatedUser])
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerDelete = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return response.sendError(res, 400, 'please send userId to delete')
        }
        const deleteUser = await Farmer.findByIdAndDelete(userId)
        //console.log(deleteUser)
        if (!deleteUser) {
            return response.sendError(res, 400, 'you are not the user to delete the details')
        }
        return response.sendSuccess(res, 200, 'deleted your details', [deleteUser])

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}