
import Wallet from '../models/Wallet.model.js'
import CustomError from "../utils/CustomError.js";

export async function createWalletService(user_id){

 if (!user_id ) {
    throw new CustomError("user_id is required", 400);
  }

  const newwallet=await Wallet.create({
    user_id
  })

  return newwallet



}