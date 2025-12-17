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



export async function createTranscationforstripe({walletId,user_id,stripe_id,amount,status}){
  if(!walletId||!user_id||!stripe_id||!amount){
    throw new CustomError("there is no walletid or userid",404)
  }


  const transaction = await Transaction.create({
    walletId,
    userId:user_id,
    amount,
    metadata:stripe_id,
    status:status
  });


  
  await transaction.save()

  const io = getIo();
  const transactionNamespace = io.of("/transaction");

  transactionNamespace.emit("create-transaction", transaction);

}