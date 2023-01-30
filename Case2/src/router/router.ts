import {Router} from "express";
import homeController from "../controller/HomeController";
import userController from "../controller/UserController";
export const router = Router();

//home
router.get('/home',homeController.showHome)
router.post('/home', homeController.showHomeSearch)

router.get('/create',homeController.showFormCreate)
router.post('/create',homeController.create)

router.get('/edit/:id', homeController.showFormEdit)
router.post('/edit/:id',homeController.update)

router.get('/delete/:id',homeController.showFormDelete)
router.get('/deletePost/:id',homeController.remove)

//user
router.get('/login',userController.showFormLogin)
router.post('/login',userController.login)
router.get('/register',userController.showFormRegister)
router.post('/register',userController.register)
router.get('/logout',userController.logOut)