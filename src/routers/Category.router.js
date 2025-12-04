import express from 'express'
import {createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory} from '../controllers/Auction.controllers.js'

import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router=express()


router.post("/",Authmiddleware,createCategory)
router.get("/",Authmiddleware,getAllCategories)
router.get('/:CategoryId',Authmiddleware,getSingleCategory)
router.delete('/:CategoryId',Authmiddleware,deleteCategory)
router.put('/:CategoryId',Authmiddleware,updateCategory)



export default router