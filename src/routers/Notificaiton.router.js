import express from 'express'
import {createNotification,getAllNotification,getSingleNotification,updateNotification,deleteNotification} from '../controllers/Notification.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();


router.post("/",Authmiddleware,createNotification)
router.get("/",Authmiddleware,getAllNotification)
router.get('/:NotifNotificationId',Authmiddleware,getSingleNotification)
router.delete('/:NotifNotificationId',Authmiddleware,deleteNotification)
router.put('/:NotifNotificationId',Authmiddleware,updateNotification)



export default router;