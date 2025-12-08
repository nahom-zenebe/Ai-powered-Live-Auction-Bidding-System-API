import express from 'express'
import {Createwallet, debitWallet, creditWallet} from '../controllers/Wallet.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();


router.post("/createwallet",Authmiddleware,Createwallet)
router.post("/creditwallet",Authmiddleware, creditWallet)

router.post("/debitwallet",Authmiddleware,debitWallet)


export default router;