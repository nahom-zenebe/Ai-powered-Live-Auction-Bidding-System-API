import express from 'express'
import {DeleteAuction,activateAuction,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
import {AdminMiddleware} from '../middlewares/Admin.middleware.js'
const router=express()


router.post("/:AuctionId",Authmiddleware,CreateAuction)
router.get("/",Authmiddleware,getAllAuction)
router.get('/:AuctionId',Authmiddleware,getSingleAuction)
router.delete('/:AuctionId',Authmiddleware,DeleteAuction)
router.patch("/:AuctionId",Authmiddleware,activateAuction)
router.put('/:AuctionId',Authmiddleware,UpdateAuction)



export default router