import Admin from '../../models/admin.model'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'
import { encryptPassword, decryptPassword } from '../../bcrypt/bcrypt'

export const adminRegister = async (req, res) => {
    try {

        const encrypt = await encryptPassword(req.body.password)
        req.body.password = encrypt

        const user = await Admin.create(req.body)
        return response.sendSuccess(res, 200, 'created', user)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await Admin.findOne({ "email": email })
        if (!existingUser) {
            return response.sendError(res, 400, "In valid email")
        }

        const decrypt = await decryptPassword(password, existingUser.password)

        if (!decrypt) {
            return response.sendError(res, 400, "In valid password")
        }

        const userToken = await jwtToken.generateToken({
            "id": existingUser._id,
            "role": existingUser.role
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

export const adminUpdate = async (req, res) => {
    try {

        const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, {
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


export const adminDelete = async (req, res) => {
    try {

        const deleteUser = await Admin.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            return response.sendError(res, 400, 'you are not the user to delete the details')
        }
        return response.sendSuccess(res, 200, 'deleted your details', deleteUser)

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}