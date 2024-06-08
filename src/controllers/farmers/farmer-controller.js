import Farmer from '../../models/former.model'
import * as response from '../../utils/response-util'

export const farmerLists = async (req, res) => {
    try {
        const farmers = await Farmer.find({}, { 'password': 0, '__v': 0 })
        return response.sendSuccess(res, 200, 'Farmer Lists', farmers)
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const farmerSearch=async(req,res)=>{
    try{
        const farmerDetails=await Farmer.find({
            $or:[
                {...req.query}
            ]
        },
        { 'password': 0, '__v': 0 })
        //console.log(farmerDetails)
        return response.sendSuccess(res,200,'search farmer lists',farmerDetails)
    }
    catch(error){
        return response.sendError(res,500,error.message)
    }
}