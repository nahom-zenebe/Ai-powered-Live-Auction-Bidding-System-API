import Notification from "../models/Notification.model.js";
import CustomError from "../utils/CustomError.js";
import { getIo } from "../sockets/io.js";

/**
 * Create notification
 */
export async function createNotification(req, res, next) {
  try {
    const { userId, type, message, auctionId, metadata } = req.body;

    if (!userId || !type || !message) {
      throw new CustomError("Missing required fields", 400);
    }

    const notification = await Notification.create({
      userId,
      type,
      message,
      auctionId,
      metadata,
    });

    // Emit real-time event
    const io = getIo();
    io.of("/notification").to(userId.toString()).emit("notification:new", notification);

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
}

/**
 * Get all notifications (admin)
 */
export async function getAllNotifications(req, res, next) {
  try {
    const limit = Number(req.query.limit) || 20;
    const skip = Number(req.query.skip) || 0;

    const notifications = await Notification.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

/**
 * Get notification by ID
 */
export async function getNotificationById(req, res, next) {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      throw new CustomError("Notification not found", 404);
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}

/**
 * Get notifications for a user
 */
export async function getNotificationsByUser(req, res, next) {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
}

/**
 * Update notification
 */
export async function updateNotification(req, res, next) {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!notification) {
      throw new CustomError("Notification not found", 404);
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(req, res, next) {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      throw new CustomError("Notification not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
