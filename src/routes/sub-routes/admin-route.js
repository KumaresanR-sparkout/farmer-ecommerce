import express from 'express'
import * as adminValidation from '../../validations/admin-validation'
import * as subAdminValidation from '../../validations/sub-admin-validation'
import * as roleMiddleware from '../../middlewares/role-middleware'
import * as adminController from '../../controllers/signup&logins/admin'
import * as subAdminController from '../../controllers/signup&logins/sub-admin'
import * as buyerController from '../../controllers/signup&logins/buyer'
import * as buyerValidation from '../../validations/buyer-validation'
import * as buyerManagement from '../../controllers/buyers/buyer-management'
import * as adminCategory from '../../controllers/admins/admin-category'
import * as adminCategoryValidation from '../../validations/admin-category-validation'
import * as adminProductValidation from '../../validations/admin-product-validation'
import * as adminProduct from '../../controllers/admins/admin-product'
import * as farmerValidation from '../../validations/farmer-validation'
import * as farmerController from '../../controllers/signup&logins/farmer'
import * as farmers from '../../controllers/farmers/farmer-controller'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST
router.post('/admin/user', roleMiddleware.admin, adminValidation.adminRegister, adminController.adminRegister)
router.post('/admin/subadmin', jwt.adminToken, roleMiddleware.subAdmin, subAdminValidation.SubAdminRegister, subAdminController.subAdminRegister)
router.post('/admin/category', jwt.adminToken, adminCategoryValidation.createCategory, adminCategory.createCategory)
router.post('/admin/product', jwt.adminToken, adminProductValidation.createProduct, adminProduct.createProduct)

//GET
router.get('/admin/user', roleMiddleware.admin, adminValidation.adminLogin, adminController.adminLogin)
router.get('/admin/buyer/pending', jwt.adminToken, buyerManagement.pendingKYCBuyers)
router.get('/admin/buyer/lists', jwt.adminToken, buyerManagement.allBuyers)
router.get('/admin/buyer/details', jwt.adminToken, buyerManagement.BuyerDetails)
router.get('/admin/buyer/search', jwt.adminToken, buyerManagement.buyerSearch)
router.get('/admin/farmer/lists', jwt.adminToken, farmers.farmerLists)
router.get('/admin/farmer/search', jwt.adminToken, farmers.farmerSearch)
router.get('/admin/farmer/details', jwt.adminToken, farmers.farmerDetails)

//@PUT

//@PATCH
router.patch('/admin/user', jwt.adminToken, adminValidation.adminUpdate, adminController.adminUpdate)
router.patch('/admin/buyer/kyc', jwt.adminToken, buyerManagement.buyerKYCProcess)
router.patch('/admin/category', jwt.adminToken, adminCategoryValidation.updateCategory, adminCategory.updateCategory)
router.patch('/admin/product', jwt.adminToken, adminProductValidation.updateProduct, adminProduct.updateProduct)


//@DELETE
router.delete('/admin/user', jwt.adminToken, adminValidation.adminDelete, adminController.adminDelete)
router.delete('/admin/buyer', jwt.adminToken, buyerValidation.buyerDelete, buyerController.buyerDelete)
router.delete('/admin/farmer', jwt.adminToken, farmerValidation.farmerDelete, farmerController.farmerDelete)
router.delete('/admin/category',jwt.adminToken,adminCategory.deleteCategory)



export default router