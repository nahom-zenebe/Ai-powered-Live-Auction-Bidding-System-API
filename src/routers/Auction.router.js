

import express from 'express'
import {DeleteAuction,RatingAuction,RecommendationAuction,VerifyAuction,isAuctionFavorites,getAuctionByStatus,activateAuction,AidataBidpredication,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'
import {aucitonLimiter} from '../middlewares/RateLimiter.middleware.js'
import {Authmiddleware} from '../middlewares/Auth.middleware.js'

const router = express.Router();

router.post("/",CreateAuction)
router.get("/",Authmiddleware,getAllAuction)
router.patch("/verfiyAuction/:AuctionId/:userId",Authmiddleware,VerifyAuction)
router.get('/:AuctionId',Authmiddleware,getSingleAuction)
router.delete('/:AuctionId',Authmiddleware,DeleteAuction)
router.patch("/rating/:AuctionId",Authmiddleware,RatingAuction)
router.patch("/:AuctionId",Authmiddleware,activateAuction)
router.put('/:AuctionId',Authmiddleware,UpdateAuction)
router.get("/auctionrecommendation",RecommendationAuction)
router.get('/AI-Auctiondata/:AuctionId/:UserId',Authmiddleware,AidataBidpredication)
router.get("/getAuctionbyQuery",getAuctionByStatus)
router.patch("/favorite/:userId",isAuctionFavorites)


export default router