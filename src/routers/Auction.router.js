

import express from 'express'
import {DeleteAuction,RatingAuction,VerifyAuction,getAuctionByStatus,activateAuction,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
import {AdminMiddleware} from '../middlewares/Admin.middleware.js'
const router = express.Router();

router.post("/:AuctionId",Authmiddleware,CreateAuction)
router.get("/",Authmiddleware,getAllAuction)
router.patch("/verfiyAuction/:AuctionId/:userId",Authmiddleware,VerifyAuction)
router.get('/:AuctionId',Authmiddleware,getSingleAuction)
router.delete('/:AuctionId',Authmiddleware,DeleteAuction)
router.patch("/rating/:AuctionId",Authmiddleware,RatingAuction)
router.patch("/:AuctionId",Authmiddleware,activateAuction)
router.put('/:AuctionId',Authmiddleware,UpdateAuction)
router.get("/getAuctionbyQuery",getAuctionByStatus)


export default router