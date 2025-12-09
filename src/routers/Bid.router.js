import express from 'express'
import { createBid,getBidbyUserId, LeaderBoard,deleteBid,updateBid,getSingleBid,getAllBids} from '../controllers/Bid.controllers.js'
import {Authmiddleware} from '../middlewares/Auth.middleware.js'
import {bidLimiter} from '../middlewares/RateLimiter.middleware.js'
const router = express.Router();


router.post("/",Authmiddleware,bidLimiter, createBid)
router.get("/",Authmiddleware,getAllBids)
router.get('/:userId',Authmiddleware,getBidbyUserId)
router.get('/:BidId',Authmiddleware,getSingleBid)
router.delete('/:BidId',Authmiddleware,deleteBid)
router.get("/leaderboard/:Auctionid/top",Authmiddleware,LeaderBoard)
router.put('/:BidId',Authmiddleware,updateBid)



export default router;