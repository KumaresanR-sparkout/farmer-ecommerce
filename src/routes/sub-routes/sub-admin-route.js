import express from 'express'
import * as subAdminValidation from '../../validations/sub-admin-validation'
import * as roleMiddleware from '../../middlewares/role-middleware'
import * as subAdminController from '../../controllers/signup&logins/sub-admin'
import * as subAdmins from '../../controllers/subadmins/sub-admin-controller'
import * as jwt from '../../tokens/jwt-token'
const router = express.Router()

//@POST


//GET
router.get('/sub-admin/user', roleMiddleware.subAdmin, subAdminValidation.SubAdminLogin, subAdminController.subAdminRegister)
router.get('/sub-admin/lists', subAdmins.subAdminLists)
router.get('/sub-admin/details', subAdmins.subAdminDetails)
//@PUT

//@PATCH
router.patch('/sub-admin/user', subAdminValidation.SubAdminUpdate, subAdminController.subAdminUpdate)
//@DELETE
router.delete('/sub-admin/user', subAdminValidation.SubAdminDelete, subAdminController.subAdminDelete)

export default router