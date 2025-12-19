import express from "express";
import {
  createBid,
  getAllBids,
  getSingleBid,
  getBidsByUser,
  updateBid,
  deleteBid,
  LeaderBoard,
} from "../controllers/Bid.controllers.js";

import { Authmiddleware } from "../middlewares/Auth.middleware.js";
import { bidLimiter } from "../middlewares/RateLimiter.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bids
 *   description: Bid management
 */

/**
 * @swagger
 * /api/bids:
 *   post:
 *     summary: Place a bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Bid placed successfully
 */
router.post(
  "/",
  Authmiddleware,
  bidLimiter,
  createBid
);

/**
 * @swagger
 * /api/bids:
 *   get:
 *     summary: Get all bids (filterable)
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: auction_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bids
 */
router.get("/", Authmiddleware, getAllBids);

/**
 * @swagger
 * /api/bids/user/{userId}:
 *   get:
 *     summary: Get bids by user
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User bids
 */
router.get("/user/:userId", Authmiddleware, getBidsByUser);

/**
 * @swagger
 * /api/bids/{bidId}:
 *   get:
 *     summary: Get single bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bidId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bid found
 */
router.get("/:bidId", Authmiddleware, getSingleBid);

/**
 * @swagger
 * /api/bids/{bidId}:
 *   put:
 *     summary: Update bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bidId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bid updated
 */
router.put("/:bidId", Authmiddleware, updateBid);

/**
 * @swagger
 * /api/bids/{bidId}:
 *   delete:
 *     summary: Delete bid
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bidId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bid deleted
 */
router.delete("/:bidId", Authmiddleware, deleteBid);

/**
 * @swagger
 * /api/bids/leaderboard/{auctionId}/top:
 *   get:
 *     summary: Get auction leaderboard
 *     tags: [Bids]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: auctionId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Top bids
 */
router.get(
  "/leaderboard/:auctionId/top",
  Authmiddleware,
  LeaderBoard
);

export default router;
