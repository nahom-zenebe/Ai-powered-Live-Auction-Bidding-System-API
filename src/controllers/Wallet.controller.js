import  {createWalletService,credit,  debit} from '../service/wallet.server'
import Wallet from '../models/Wallet.model'
import User from '../models/user.model'




export async function Createwallet(req,res){

    const {userId}=req.body;

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

    await newwallet.save()
    
    res.status(201).json(newwallet)



}

export async function creditWallet(req, res, next) {
    try {
      const { userId, amount, reason } = req.body;
  
      const updatedWallet = await credit(userId, amount, reason);
  
      return res.status(200).json({
        success: true,
        message: "Wallet credited successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      next(err); 
    }
  }


  export async function debitWallet(req, res, next) {
    try {
      const { userId, amount, reason } = req.body;
  
      const updatedWallet = await   debit(userId, amount, reason);
  
      return res.status(200).json({
        success: true,
        message: "Wallet debit successfully",
        wallet: updatedWallet,
      });
    } catch (err) {
      next(err); 
    }
  }
