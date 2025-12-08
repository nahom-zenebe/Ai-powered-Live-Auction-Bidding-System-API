import express from 'express'
import {Createwallet} from '../controllers/Wallet.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();


router.post("/",Authmiddleware,Createwallet)




export default router;