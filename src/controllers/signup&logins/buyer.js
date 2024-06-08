import Buyer from '../../models/buyer.models'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'

export const buyerRegister = async (req, res) => {
    try {

        const user = await Buyer.create(req.body)
        return response.sendSuccess(res, 200, 'please verify your kyc and enjoy', [user])
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
        //console.log(existingUser)
        
        if (existingUser.password != password) {
            return response.sendError(res, 400, "In valid password")
        }
        const userToken = await jwtToken.generateToken({
            "jwt": "jwtToken"
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

export const buyerUpdate = async (req, res) => {
    try {
        const { userId } = req.query
        const updatedUser = await Buyer.findByIdAndUpdate(userId, req.body, {
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

//@description  delete login function
//@route        
//@acess        protected
export const buyerDelete = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return response.sendError(res, 400, 'please send userId to delete')
        }
        const deleteUser = await Buyer.findByIdAndDelete(userId)
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