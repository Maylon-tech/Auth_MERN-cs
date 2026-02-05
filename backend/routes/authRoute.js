import express from 'express'
import {
    Login,
    Logout,
    SignUp
} from '../controllers/authController.js'

const router = express.Router()

router.get("/signup", SignUp)

router.get("/login", Login)


router.get("/logout", Logout)


export default router