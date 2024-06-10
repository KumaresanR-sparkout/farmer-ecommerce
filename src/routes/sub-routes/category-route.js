import express from 'express'
import * as category from '../../controllers/categories/category-controller'
import * as validations from '../../validations/category-validation'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/farmer/category', jwt.farmerToken, validations.createCategory, category.createCategory)

//@GET
router.get('/farmer/category/lists', jwt.farmerToken, category.listCategory)
router.get('/farmer/category/details', jwt.farmerToken, category.categoryDetails)
//@PUT
router.patch('/farmer/category', jwt.farmerToken, validations.updateCategory, category.updateCategory)
//@DELETE 
router.delete('/farmer/category', jwt.farmerToken, category.deleteCategory)

export default router
