import express from 'express'
import {createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory} from '../controllers/Auction.controllers.js'


const router=express()


router.post("/",createCategory)
router.get("/",getAllCategories)
router.get('/:CategoryId',getSingleCategory)
router.delete('/:CategoryId',deleteCategory)
router.put('/:CategoryId',updateCategory)



export default router