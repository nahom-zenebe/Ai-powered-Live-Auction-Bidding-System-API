import express from 'express'
import {Notification,getAllNotification,getSingleNotification,updateNotification,deleteNotification} from '../controllers/Notification.controller.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router=express()


router.post("/",Authmiddleware,Notification)
router.get("/",Authmiddleware,getAllNotification)
router.get('/:NotifNotificationId',Authmiddleware,getSingleNotification)
router.delete('/:NotifNotificationId',Authmiddleware,deleteNotification)
router.put('/:NotifNotificationId',Authmiddleware,updateNotification)



export default router;