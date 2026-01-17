import express from 'express'
import {getallActivity,getSingleActivity,getSingleUserActivity} from '../controllers/Activity.controller.js'
import {Authmiddleware} from '../middlewares/Auth.middleware.js'

const router = express.Router();


router.get("/",Authmiddleware,getallActivity)
router.get("/:ActivityId",Authmiddleware,getSingleActivity)
router.get('/:UserId',Authmiddleware,getSingleUserActivity)



export default router;