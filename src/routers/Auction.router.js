/**
 * @swagger
 * tags:
 *   name: Auction
 *   description: Auction management and operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Auction:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - start_time
 *         - end_time
 *         - category_id
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         seller_id:
 *           type: string
 *         bids:
 *           type: array
 *           items:
 *             type: string
 *         min_bid:
 *           type: number
 *         current_bid:
 *           type: number
 *         category_id:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, active, expired, sold]
 *         current_winner:
 *           type: string
 *       example:
 *         title: "iPhone 14 Pro Max"
 *         description: "Brand new, sealed box"
 *         start_time: "2025-01-10T12:00:00Z"
 *         end_time: "2025-01-11T12:00:00Z"
 *         images: ["image1.jpg", "image2.jpg"]
 *         seller_id: "675db23ac15"
 *         min_bid: 500
 *         current_bid: 550
 *         category_id: "category123"
 *         status: "active"
 */


import express from 'express'
import {DeleteAuction,getAuctionByStatus,activateAuction,UpdateAuction,getSingleAuction,getAllAuction,CreateAuction} from '../controllers/Auction.controllers.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
import {AdminMiddleware} from '../middlewares/Admin.middleware.js'
const router=express()


router.post("/:AuctionId",Authmiddleware,CreateAuction)
router.get("/",Authmiddleware,getAllAuction)
router.get('/:AuctionId',Authmiddleware,getSingleAuction)
router.delete('/:AuctionId',Authmiddleware,DeleteAuction)
router.patch("/:AuctionId",Authmiddleware,activateAuction)
router.put('/:AuctionId',Authmiddleware,UpdateAuction)
router.get("/getAuctionbyQuery",getAuctionByStatus)


export default router