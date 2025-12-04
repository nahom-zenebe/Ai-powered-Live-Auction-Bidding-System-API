import express from 'express'
import { login, signup,VerifyUser } from '../controllers/Auth.controller.js'

const router=express()



router.post("/signup",signup)
router.post("/login",login)
router.get("/verify/:id",VerifyUser)



export default router