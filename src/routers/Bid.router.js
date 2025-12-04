import express from 'express'
import { createBid,deleteBid,updateBid,getSingleBid,getAllBids} from '../controllers/Auction.controllers.js'


const router=express()


router.post("/", createBid)
router.get("/",getAllBids)
router.get('/:BidId',getSingleBid)
router.delete('/:BidId',deleteBid)
router.put('/:BidId',updateBid)



export default router