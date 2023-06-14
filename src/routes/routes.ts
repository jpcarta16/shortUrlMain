import { Router, Request, Response } from "express";
import * as authController from '../controllers/auth.controller'
import * as auth from '../middleware/auth.middleware'
// import * as urlController from '../controllers/url.controller'
import * as authMiddleware from '../middleware/auth.middleware'

const router = Router()

router.post('/singup', authController.singUp)
router.post('/login', authController.login)
// router.get('/users/:username/urls', authController.urlsUser)
router.get('/users/:username', authController.getAllUSers)

export default router