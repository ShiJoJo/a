
import express from 'express'
import Admin from '../controller/admin/admin'
import Role from '../controller/admin/roles'
const router = express.Router()
router.post('/login', Admin.login);
router.post('/loginOut', Admin.loginOut);
router.post('/register', Admin.register);
router.post('/menu', Role.getAdminMenu);
router.post('/role', Role.getAdminRole);
export default router