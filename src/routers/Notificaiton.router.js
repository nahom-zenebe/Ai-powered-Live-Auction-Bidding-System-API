import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByUser,
  updateNotification,
  deleteNotification,
} from "../controllers/Notification.controller.js";
import { Authmiddleware } from "../middlewares/Auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, type, message]
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               auctionId:
 *                 type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post("/", Authmiddleware, createNotification);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications (admin)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get("/", Authmiddleware, getAllNotifications);

/**
 * @swagger
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Get notifications by user
 *     tags: [Notifications]
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
 *         description: User notifications
 */
router.get("/user/:userId", Authmiddleware, getNotificationsByUser);

/**
 * @swagger
 * /api/notifications/{notificationId}:
 *   get:
 *     summary: Get single notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification found
 */
router.get("/:notificationId", Authmiddleware, getNotificationById);

/**
 * @swagger
 * /api/notifications/{notificationId}:
 *   patch:
 *     summary: Update notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification updated
 */
router.patch("/:notificationId", Authmiddleware, updateNotification);

/**
 * @swagger
 * /api/notifications/{notificationId}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted
 */
router.delete("/:notificationId", Authmiddleware, deleteNotification);

export default router;
