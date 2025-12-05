import Notification from "../models/Notification.model.js";
import CustomError from "../utils/CustomError.js";
import { getIo } from "../sockets/io.js";

export async function createNotification(req, res, next) {
  try {
    const { user_id,type,message,auction_id,metadata } = req.body;

    const io=getIo()
    const  notificationNamespace = io.of("/notification");
  

    const notifciation = new Notification({ user_id,type,message,auction_id,metadata });
    await notifciation.save();

    notificationNamespace.emit("create-message", notifciation)
    res.status(201).json(notifciation);
  } catch (error) {
    next(error);
  }
}
export async function getAllNotification(req, res, next) {
  try {
    const limit=req.query.limit
    const skip=req.query.skip
    skip = parseInt(skip, 20);
    limit = parseInt(limit, 20);
    const notification = await Notification.find().limit(limit).skip(skip);

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}


export async function getSingleNotification(req, res, next) {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      throw new CustomError("Notification ID is required", 400);
    }

    const notification = await Notification.findById(categoryId);

    if (!notification) {
      throw new CustomError("Notification not found", 404);
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}


export async function updateNotification(req, res, next) {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      throw new CustomError("Notification ID is required", 400);
    }

    const updatedCategory = await Notification.findByIdAndUpdate(
    notificationId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new CustomError("Notification not found", 404);
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
}


export async function deleteNotification(req, res, next) {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      throw new CustomError("Notification ID is required", 400);
    }

    const deletednotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletednotification) {
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
