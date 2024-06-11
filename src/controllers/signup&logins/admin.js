import Admin from '../../models/admin.model'
import mongoose from 'mongoose'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'
import { encryptPassword, decryptPassword } from '../../bcrypt/bcrypt'

export const adminRegister = async (req, res) => {
    try {

        const encrypt = await encryptPassword(req.body.password)
        req.body.password = encrypt

        const user = await Admin.create({ ...req.body, ...req.role })
        return response.sendSuccess(res, 200, 'created', [user])
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
            "jwt": "admin"
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

export const adminUpdate = async (req, res) => {
    try {
        const { userId } = req.query
        if(!userId){
            return response.sendError(res,400,'pass id to update')
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return response.sendError(res,400,'send valid id')
        }
        const updatedUser = await Admin.findByIdAndUpdate(userId, req.body, {
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


export const adminDelete = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return response.sendError(res, 400, 'please send userId to delete')
        }
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return response.sendError(res,400,'send valid id')
        }
        const deleteUser = await Admin.findByIdAndDelete(userId)
        
        if (!deleteUser) {
            return response.sendError(res, 400, 'you are not the user to delete the details')
        }
        return response.sendSuccess(res, 200, 'deleted your details', [deleteUser])

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}