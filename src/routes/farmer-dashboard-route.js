import express from 'express'
import * as farmer from '../controllers/farmers/farmer-dashboard'
const router = express.Router()

//@POST


//GET
router.get('/farmer/dashboard/lists',farmer.listProducts)
// router.get('/farmer', farmerValidation.farmerLogin, farmerController.farmerLogin)
// router.get('/farmer/lists',farmers.farmerLists)
// router.get('/farmer/search',farmers.farmerSearch)
// router.get('/farmer/details',farmers.farmerDetails)
//@PUT

//@PATCH
// router.patch('/farmer', farmerValidation.farmerUpdate, farmerController.farmerUpdate)
//@DELETE
// router.delete('/farmer', farmerValidation.farmerDelete, farmerController.farmerDelete)

export default router