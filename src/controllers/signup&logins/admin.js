import Admin from '../../models/admin.model'
import * as jwtToken from '../../tokens/jwt-token'
import * as response from '../../utils/response-util'

export const adminRegister = async (req, res) => {
    try {

        const user = await Admin.create({ ...req.body, ...req.role })
        return response.sendSuccess(res, 200, 'created', [user])
    }
    catch (error) {
        return response.sendError(res,500, error.message)
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await Admin.findOne({ "email": email })
        if (!existingUser) {
            return response.sendError(res, 400, "In valid email")
        }

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

export const adminUpdate = async (req, res) => {
    try {
        const { userId } = req.query
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

//@description  delete login function
//@route        
//@acess        protected
export const adminDelete = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId) {
            return response.sendError(res, 400, 'please send userId to delete')
        }
        const deleteUser = await Admin.findByIdAndDelete(userId)
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