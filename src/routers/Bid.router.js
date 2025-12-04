import express from 'express'
import { createBid,getAuctionByStatus,deleteBid,updateBid,getSingleBid,getAllBids} from '../controllers/Bid.controllers.js'
import {Authmiddleware} from '../middlewares/Auth.middleware.js'

const router=express()


router.post("/",Authmiddleware, createBid)
router.get("/",Authmiddleware,getAllBids)
router.get('/:BidId',Authmiddleware,getSingleBid)
router.delete('/:BidId',Authmiddleware,deleteBid)
router.get("/getAuctionbyQuery",getAuctionByStatus)
router.put('/:BidId',Authmiddleware,updateBid)



export default router