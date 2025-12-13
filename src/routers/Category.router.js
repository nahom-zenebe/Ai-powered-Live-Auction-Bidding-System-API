import express from 'express'
import {createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory} from '../controllers/Category.controllers.js'

import {createcategorySchema} from '../validators/category.schema.js'
import {validatorMiddleware} from '../middlewares/validator.middleware.js'


import {Authmiddleware} from '../middlewares/Auth.middleware.js'
const router = express.Router();


router.post("/",validatorMiddleware(createcategorySchema),createCategory)
router.get("/",getAllCategories)
router.get('/:CategoryId',getSingleCategory)
router.delete('/:CategoryId',deleteCategory)
router.put('/:CategoryId',updateCategory)



export default router;