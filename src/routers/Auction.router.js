import express from 'express'
import {DeleteAuction,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
import {AdminMiddleware} from '../middlewares/Admin.middleware.js'
const router=express()


router.post("/",Authmiddleware,CreateAuction)
router.get("/",Authmiddleware,getAllAuction)
router.get('/:AuctionId',Authmiddleware,getSingleAuction)
router.delete('/:AuctionId',Authmiddleware,DeleteAuction)
router.put('/:AuctionId',Authmiddleware,UpdateAuction)



export default router