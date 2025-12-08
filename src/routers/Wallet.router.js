import express from 'express'
import {Createwallet,unlockAmountwallet,lockAmountwallet, debitWallet, creditWallet} from '../controllers/Wallet.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();


router.post("/createwallet",Authmiddleware,Createwallet)
router.post("/creditwallet",Authmiddleware, creditWallet)
router.post("/lockamount",Authmiddleware,lockAmountwallet)
router.post("/unlockamount",Authmiddleware,unlockAmountwallet)
router.post("/debitwallet",Authmiddleware,debitWallet)


export default router;