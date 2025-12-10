import Transaction from "../models/Transaction.model.js";
import { getIo } from "../sockets/io.js";
import CustomError from "../utils/CustomError.js";

export async function createTransactionService({
  user_id,
  transaction_type,
  amount,
  metadata = {} 
}) {

  if (!user_id || !transaction_type || !amount) {
    throw new CustomError("user_id, transaction_type, and amount are required", 400);
  }


  const transaction = await Transaction.create({
    user_id,
    transaction_type,
    amount,
    metadata,
  });


  const io = getIo();
  const transactionNamespace = io.of("/transaction");
  transactionNamespace.emit("create-transaction", transaction);


  return transaction;
}
