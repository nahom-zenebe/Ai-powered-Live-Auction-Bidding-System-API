import Transaction from "../models/Transaction.model.js";
import CustomError from "../utils/CustomError.js";
import { getIo } from "../sockets/io.js";
import { createTransactionService } from "../services/transaction.service.js";

export async function createTransaction(req, res, next) {
  try {
    const {walletId,user_id,
      type,
      amount,
       auctionId
    }=req.body
        
    if (!walletId||!user_id || !type || !amount) {
      throw new CustomError("user_id, transaction_type, and amount are required", 400);
    }
  
  const transaction = await createTransactionService(req.body);

    res.status(201).json( transaction);

  } catch (error) {
    next(error);
  }
}


// ===============================
// GET ALL TRANSACTIONS (FILTER + PAGINATION)
// ===============================
export async function getAllTransactions(req, res, next) {
  try {
    let { user_id, transaction_type, status, skip = 0, limit = 20 } = req.query;

    const filter = {};

    if (user_id) filter.user_id = user_id;
    if (transaction_type) filter.transaction_type = transaction_type;
    if (status) filter.status = status;

    skip = parseInt(skip);
    limit = parseInt(limit);

    if (isNaN(skip) || isNaN(limit)) {
      throw new CustomError("skip and limit must be numbers", 400);
    }

    const transactions = await Transaction.find(filter)
      .sort({ created_at: -1 })  // latest first
      .skip(skip)
      .limit(limit)
      .populate("user_id");

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });

  } catch (error) {
    next(error);
  }
}


// ===============================
// GET SINGLE TRANSACTION
// ===============================
export async function getSingleTransaction(req, res, next) {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      throw new CustomError("Transaction ID is required", 400);
    }

    const transaction = await Transaction.findById(transactionId)
      .populate("user_id");

    if (!transaction) {
      throw new CustomError("Transaction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    next(error);
  }
}


// ===============================
// UPDATE TRANSACTION
// ===============================
export async function updateTransaction(req, res, next) {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      throw new CustomError("Transaction ID is required", 400);
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      throw new CustomError("Transaction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: updatedTransaction,
    });

  } catch (error) {
    next(error);
  }
}


// ===============================
// DELETE TRANSACTION
// ===============================
export async function deleteTransaction(req, res, next) {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      throw new CustomError("Transaction ID is required", 400);
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      throw new CustomError("Transaction not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });

  } catch (error) {
    next(error);
  }
}
