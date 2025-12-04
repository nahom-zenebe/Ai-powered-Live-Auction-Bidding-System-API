import express from 'express'
import { createBid,deleteBid,updateBid,getSingleBid,getAllBids} from '../controllers/Auction.controllers.js'


const router=express()


router.post("/", createBid)
router.get("/",getAllBids)
router.get('/:AuctionId',getSingleBid)
router.delete('/:AuctionId',deleteBid)
router.put('/:AuctionId',updateBid)



export default router