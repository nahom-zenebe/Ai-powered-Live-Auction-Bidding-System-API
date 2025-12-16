import express from 'express'
import {createNotification,getnotificationbyUserId,getAllNotification,getSingleNotification,updateNotification,deleteNotification} from '../controllers/Notification.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();

router.post("/",Authmiddleware,createNotification)
router.get("/",Authmiddleware,getAllNotification)
router.get("/:user_Id",Authmiddleware,getnotificationbyUserId)
router.get('/:NotifNotificationId',Authmiddleware,getSingleNotification)
router.delete('/:NotifNotificationId',Authmiddleware,deleteNotification)
router.put('/:NotifNotificationId',Authmiddleware,updateNotification)



export default router;