import express from 'express'
import {createTransaction,updateTransaction,getSingleTransaction,getAllTransactions,deleteTransaction} from '../controllers/Transaction.controller.js'
import {Authmiddleware} from '../middlewares/Auth.middleware.js'

const router=express()


router.post("/",Authmiddleware,createTransaction)
router.get("/",Authmiddleware,getAllTransactions)
router.get('/:TransactionId',Authmiddleware,getSingleTransaction)
router.delete('/:TransactionId',Authmiddleware,deleteTransaction)
router.put('/:TransactionId',Authmiddleware,updateTransaction)



export default router