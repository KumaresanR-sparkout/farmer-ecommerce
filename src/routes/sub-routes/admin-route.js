import express from 'express'
import * as adminValidation from '../../validations/admin-validation'
import * as adminController from '../../controllers/signup&logins/admin'
import * as admins from '../../controllers/admins/admin-controller'
import * as buyerController from '../../controllers/signup&logins/buyer'
import * as buyerManagement from '../../controllers/buyers/buyer-management'
import * as adminCategory from '../../controllers/admins/admin-category'
import * as adminCategoryValidation from '../../validations/admin-category-validation'
import * as adminProductValidation from '../../validations/admin-product-validation'
import * as adminProduct from '../../controllers/admins/admin-product'
import * as farmerController from '../../controllers/signup&logins/farmer'
import * as farmers from '../../controllers/farmers/farmer-controller'
import * as shipment from '../../controllers/shipment/shipment-admin'
import * as validation from '../../validations/query-validation'
import * as jwt from '../../tokens/jwt-token'
import { updateProductKyc } from '../../controllers/products/product-controller'
const router = express.Router()

//ADMIN ROUTER
router.post('/', adminValidation.adminRegister, adminController.adminRegister)
router.post('/category', jwt.adminToken, adminCategoryValidation.createCategory, adminCategory.createCategory)
router.post('/product', jwt.adminToken, adminProductValidation.createProduct, adminProduct.createProduct)
router.post('/shipment', jwt.adminToken, shipment.createShipment)

router.get('/', adminValidation.adminLogin, adminController.adminLogin)
router.get('/lists', jwt.adminToken, admins.adminLists)
router.get('/details/:id', validation.idValidation, jwt.adminToken, admins.adminDetails)
router.get('/product/:id', jwt.adminToken, validation.idValidation, adminProduct.getProductDetails)
router.get('/products/details', jwt.adminToken, adminProduct.productDetails)
router.get('/category/lists', jwt.adminToken, adminCategory.listCategory)
router.get('/category/details/:id', jwt.adminToken, validation.idValidation, adminCategory.categoryDetails)

router.patch('/:id', jwt.adminToken, validation.idValidation, adminValidation.adminUpdate, adminController.adminUpdate)
router.patch('/category/:id', jwt.adminToken, validation.idValidation, adminCategoryValidation.updateCategory, adminCategory.updateCategory)
router.patch('/product/:id', jwt.adminToken, validation.idValidation, adminProductValidation.updateProduct, adminProduct.updateProduct)

router.delete('/:id', jwt.adminToken, validation.idValidation, adminController.adminDelete)
router.delete('/category/:id', jwt.adminToken, validation.idValidation, adminCategory.deleteCategory)
router.delete('/product/:id', jwt.adminToken, validation.idValidation, adminProduct.deleteProduct)
router.delete('/shipment/:id', jwt.adminToken, validation.idValidation, shipment.deleteShipment)

//FARMER ROUTER
router.get('/farmer/lists', jwt.adminToken, farmers.farmerLists)
router.get('/farmer/search', jwt.adminToken, farmers.farmerSearch)
router.get('/farmer/details/:id', jwt.adminToken, validation.idValidation, farmers.farmerDetails)
router.patch('/farmer/product/kyc/:id', jwt.adminToken, validation.idValidation, updateProductKyc)

router.delete('/farmer/:id', jwt.adminToken, validation.idValidation, farmerController.farmerDelete)

//BUYER ROUTER
router.get('/buyer/pending', jwt.adminToken, buyerManagement.pendingKYCBuyers)
router.get('/buyer/lists', jwt.adminToken, buyerManagement.allBuyers)
router.get('/buyer/details/:id', jwt.adminToken, validation.idValidation, buyerManagement.BuyerDetails)
router.get('/buyer/search', jwt.adminToken, buyerManagement.buyerSearch)

router.patch('/buyer/kyc/:id', jwt.adminToken, validation.idValidation, buyerManagement.buyerKYCProcess)
router.patch('/buyer/status/:id', jwt.adminToken, validation.idValidation, buyerManagement.buyerStatus)

router.delete('/buyer/:id', jwt.adminToken, validation.idValidation, buyerController.buyerDelete)

export default router
