import  {createWalletService,credit,  debit} from '../service/wallet.server.js'
import Wallet from '../models/Wallet.model.js'
import User from '../models/user.model.js'
import {sendNotificationToUser} from '../utils/NotificationAuction.js'
import { getIo } from "../sockets/io.js";




export async function Createwallet(req,res){
    
    const {userId}=req.body;
    const io=getIo()

    if(!userId){
        throw new CustomError("the user id is not known",404);

    }

    const userwallet=await User.findOne({userId})


    if(!userwallet){
         throw new CustomError("the user  is not known",404);
    }

    if( userwallet.isVerified===false){
        throw new CustomError("first you have to verify before creating wallet",400);
    }

    const newwallet=await Wallet.createWalletService(userId);
    sendNotificationToUser(io,userId, "Your wallet was created")
    await newwallet.save()
    
    res.status(201).json(newwallet)



}

export async function creditWallet(req, res, next) {
    try {
      const session=await mongoose.startSession();
      session.startTranscation();

      const { userId, amount, reason } = req.body;
  
      const updatedWallet = await credit(userId, amount, reason).session(session);

      await session.commitTranscation();
      session.endSession();

      sendNotificationToUser(io,userId, "Your wallet was credited")
      return res.status(200).json({
        success: true,
        message: "Wallet credited successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      session.endSession();
      next(err); 
    }
  }


  export async function debitWallet(req, res, next) {
    try {
      const { userId, amount, reason } = req.body;
  
      const updatedWallet = await   debit(userId, amount, reason);
      sendNotificationToUser(io,userId, "Your wallet was debited")
      return res.status(200).json({
        success: true,
        message: "Wallet debit successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      next(err); 
    }
  }


  export async function lockAmountwallet(req, res, next) {
    try {
      const { userId, amount } = req.body;
  
      const updatedWallet = await lockAmount(userId, amount);
      sendNotificationToUser(io,userId, "Your amount lock due to bid ")
      return res.status(200).json({
        success: true,
        message: "Wallet lock Amount successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      next(err); 
    }
  }


  export async function unlockAmountwallet(req, res, next) {
    try {
      const { userId, amount } = req.body;
  
      const updatedWallet = await unlockAmount(userId, amount);
      sendNotificationToUser(io,userId, "Your amount unlock due to bid ")
      return res.status(200).json({
        success: true,
        message: "Wallet unlock Amount successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      next(err); 
    }
  }