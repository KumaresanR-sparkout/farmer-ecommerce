import express from 'express'
import * as farmerValidation from '../../validations/farmer-validation'
import * as farmerController from '../../controllers/signup&logins/farmer'
import * as farmers from '../../controllers/farmers/farmer-controller'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/farmer', farmerValidation.farmerRegister, farmerController.farmerRegister)

//GET
router.get('/farmer', farmerValidation.farmerLogin, farmerController.farmerLogin)
router.get('/farmer/lists', jwt.farmerToken, farmers.farmerLists)
router.get('/farmer/search', jwt.farmerToken, farmers.farmerSearch)
router.get('/farmer/details', jwt.farmerToken, farmers.farmerDetails)
//@PUT

//@PATCH
router.patch('/farmer', jwt.farmerToken, farmerValidation.farmerUpdate, farmerController.farmerUpdate)
//@DELETE
router.delete('/farmer', jwt.farmerToken, farmerValidation.farmerDelete, farmerController.farmerDelete)

export default router