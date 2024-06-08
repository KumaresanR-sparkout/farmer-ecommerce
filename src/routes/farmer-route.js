import express from 'express'
import * as farmerValidation from '../validations/farmer-validation'
import * as farmerController from '../controllers/signup&logins/farmer'
import * as farmerDetails from '../controllers/farmers/farmer-controller'
const router = express.Router()

//@POST
router.post('/farmer',farmerValidation.farmerRegister, farmerController.farmerRegister)

//GET
router.get('/farmer', farmerValidation.farmerLogin, farmerController.farmerLogin)
router.get('/farmer/lists',farmerDetails.farmerLists)
router.get('/farmer/search',farmerDetails.farmerSearch)
//@PUT

//@PATCH
router.patch('/farmer', farmerValidation.farmerUpdate, farmerController.farmerUpdate)
//@DELETE
router.delete('/farmer', farmerValidation.farmerDelete, farmerController.farmerDelete)

export default router