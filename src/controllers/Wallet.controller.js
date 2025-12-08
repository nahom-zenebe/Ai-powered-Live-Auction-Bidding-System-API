import  createWalletService from '../service/wallet.server'
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