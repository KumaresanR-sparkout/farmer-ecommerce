import express from 'express'
import * as adminValidation from '../../validations/admin-validation'
import * as roleMiddleware from '../../middlewares/role-middleware'
import * as adminController from '../../controllers/signup&logins/admin'
import * as admins from '../../controllers/admins/admin-controller'
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
import * as shipment from '../../controllers/shipment/shipment-admin'
import * as jwt from '../../tokens/jwt-token'
import { updateProductKyc } from '../../controllers/products/product-controller'
const router = express.Router()

//@POST
router.post('/user', roleMiddleware.admin, adminValidation.adminRegister, adminController.adminRegister)
router.post('/category', jwt.adminToken, adminCategoryValidation.createCategory, adminCategory.createCategory)
router.post('/product', jwt.adminToken, adminProductValidation.createProduct, adminProduct.createProduct)
router.post('/shipment', jwt.adminToken, shipment.createShipment)


//GET
router.get('/user', roleMiddleware.admin, adminValidation.adminLogin, adminController.adminLogin)
router.get('/buyer/pending', jwt.adminToken, buyerManagement.pendingKYCBuyers)
router.get('/buyer/lists', jwt.adminToken, buyerManagement.allBuyers)
router.get('/buyer/details', jwt.adminToken, buyerManagement.BuyerDetails)
router.get('/buyer/search', jwt.adminToken, buyerManagement.buyerSearch)
router.get('/farmer/lists', jwt.adminToken, farmers.farmerLists)
router.get('/farmer/search', jwt.adminToken, farmers.farmerSearch)
router.get('/farmer/details', jwt.adminToken, farmers.farmerDetails)
router.get('/product/details', jwt.adminToken, adminProduct.productDetails)
router.get('/product', jwt.adminToken, adminProduct.getProductDetails)
router.get('/lists', jwt.adminToken, admins.adminLists)
router.get('/details', jwt.adminToken, admins.adminDetails)
router.get('/category/lists',jwt.adminToken,adminCategory.listCategory)
router.get('/category/details',jwt.adminToken,adminCategory.categoryDetails)



//@PUT

//@PATCH
router.patch('/user', jwt.adminToken, adminValidation.adminUpdate, adminController.adminUpdate)
router.patch('/buyer/kyc', jwt.adminToken, buyerManagement.buyerKYCProcess)
router.patch('/category', jwt.adminToken, adminCategoryValidation.updateCategory, adminCategory.updateCategory)
router.patch('/product', jwt.adminToken, adminProductValidation.updateProduct, adminProduct.updateProduct)
router.patch('/product/kyc', jwt.adminToken, updateProductKyc)


//@DELETE
router.delete('/user', jwt.adminToken, adminValidation.adminDelete, adminController.adminDelete)
router.delete('/buyer', jwt.adminToken, buyerValidation.buyerDelete, buyerController.buyerDelete)
router.delete('/farmer', jwt.adminToken, farmerValidation.farmerDelete, farmerController.farmerDelete)
router.delete('/category', jwt.adminToken, adminCategory.deleteCategory)
router.delete('/product', jwt.adminToken, adminProduct.deleteProduct)
router.delete('/shipment', jwt.adminToken, shipment.deleteShipment)

export default router
