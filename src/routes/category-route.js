import express from 'express'
import * as category from '../controllers/categories/category-controller'
import * as validations from '../validations/category-validation'
const router=express.Router()

//@POST
router.post('/category',validations.createCategory,category.createCategory)

//@GET
router.get('/category/lists',category.listCategory)
router.get('/category/details',category.categoryDetails)
//@PUT
router.patch('/category',validations.updateCategory,category.updateCategory)
//@DELETE 
router.delete('/category',category.deleteCategory)

export default router
