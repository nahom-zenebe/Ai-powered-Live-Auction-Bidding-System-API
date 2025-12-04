import express from 'express'
import {createTransaction,updateTransaction,getSingleTransaction,getAllTransactions,deleteTransaction} from '../controllers/Auction.controllers.js'


const router=express()


router.post("/",createTransaction)
router.get("/",getAllTransactions)
router.get('/:TransactionId',getSingleTransaction)
router.delete('/:TransactionId',deleteTransaction)
router.put('/:TransactionId',updateTransaction)



export default router