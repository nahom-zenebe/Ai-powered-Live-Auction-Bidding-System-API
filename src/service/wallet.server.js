
import Wallet from '../models/Wallet.model.js'
import CustomError from "../utils/CustomError.js";
import { getIo } from "../socket.js";
export async function createWalletService(user_id){

 if (!user_id ) {
    throw new CustomError("user_id is required", 400);
  }

  const newwallet=await Wallet.create({
    user_id
  })

  return newwallet
}

export async function credit(userId,amount,reason){
    if(!userId||!amount||!reason){
        throw new CustomError("userId,amount,reason are required",400);
    }
    if(amount<=0){
        throw new CustomError("amount should not be null",400)
    }
    const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new CustomError("User wallet not found", 404);
  }
  const previousBalance = wallet.balance;
  wallet.balance += amount;
  await wallet.save();

  const io = getIo();
  const transactionNamespace = io.of("/transaction");
  const walletNamespace=io.of("/wallet")

  walletNamespace.emit("credit-wallet",previousBalance)

  await Transaction.create({
    walletId: wallet._id,
    userId,
    type: "DEPOSIT",
    amount,
    previousBalance,
    newBalance: wallet.balance,
    description: reason,
  });
  transactionNamespace.emit("credit-transaction", transaction);

}


export async function debit(userId, amount, reason){
    if(!userId||!amount||!reason){
        throw new CustomError("userId,amount,reason are required",400);
    }
    if(amount<=0){
        throw new CustomError("amount should not be null",400)
    }
    const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new CustomError("User wallet not found", 404);
  }
  const previousBalance = wallet.balance;
  wallet.balance -= amount;
  await wallet.save();

  const io = getIo();
  const transactionNamespace = io.of("/transaction");
  const walletNamespace=io.of("/wallet")

  walletNamespace.emit("credit-wallet",previousBalance)

  await Transaction.create({
    walletId: wallet._id,
    userId,
    type: "WITHDRAW",
    amount,
    previousBalance,
    newBalance: wallet.balance,
    description: reason,
  });
  transactionNamespace.emit("debit-transaction", transaction);

}