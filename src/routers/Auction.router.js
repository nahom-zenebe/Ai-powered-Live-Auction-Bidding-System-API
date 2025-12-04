import express from 'express'
import {DeleteAuction,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'


const router=express()


router.post("/",CreateAuction)
router.get("/",getAllAuction)
router.get('/:AuctionId',getSingleAuction)
router.delete('/:AuctionId',DeleteAuction)
router.put('/:AuctionId',UpdateAuction)



export default router