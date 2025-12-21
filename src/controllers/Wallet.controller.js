import  {createWalletService,credit,  debit} from '../service/wallet.server.js'
import Wallet from '../models/Wallet.model.js'
import User from '../models/user.model.js'
import {sendNotificationToUser} from '../utils/NotificationAuction.js'
import { getIo } from "../sockets/io.js";
import Stripe from 'stripe';
import Transcation from '../models/Transaction.model.js'
import dotnev from 'dotenv';
import CustomError from "../utils/CustomError.js";

dotnev.config()


const stripe=new Stripe(process.env.STRIPE_API_KEY)



export async function Createwallet(req, res, next) {
  try {
    const { userId } = req.body;
    const io = getIo();

    if (!userId) {
      throw new CustomError("the user id is not known", 404);
    }

    const userwallet = await User.findById(userId);

    if (!userwallet) {
      throw new CustomError("the user is not known", 404);
    }

    if (userwallet.isVerified === false) {
      throw new CustomError(
        "first you have to verify before creating wallet",
        400
      );
    }

    const newwallet = await createWalletService(userId);

    sendNotificationToUser(io, userId, "Your wallet was created");

    res.status(201).json(newwallet);
  } catch (err) {
    next(err);
  }
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




 export async  function Depositmoneyfromstripe(req,res,next){
 try{
  const {amountInToken,userId}=req.body;

  const TOKEN_PRICE=parseInt(process.env.TOKEN_PRICE)

  if(!amountInToken||!userId){
    throw new CustomError("there is no amount or userId",404)
  }
  // 1token=$0.10
  const amountInCents=Math.round(amountInToken *TOKEN_PRICE)

  const paymentIntent=await stripe.paymentIntent.create({
    amount:amountInCents,
    currency:'usd',
    metadata:{userId,amountInToken}
  })
  res.send({ clientSecret: paymentIntent.client_secret });

 }

 catch(error){
  next(error)

 }

 }


 export async function Stripewebhook(req,res,next){
    const sig=req.headers['stripe-signature'];
    let event;

    try{
      event=stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)

    }
    catch(error){
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if(event.type==="payment_intent.succeeded"){
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata.userId;
      const tokensToAdd = parseInt(paymentIntent.metadata.amountInTokens);
      const stripeId=paymentIntent.id
      session.startTransaction();


      const findTranscation=await Transcation.find({metadata:stripeId}).session(session);
     //prevent the stripe to make twice transactions
      if(findTranscation &&findTranscation.status==="SUCCESS"){
        console.log(`⚠️ Transaction ${stripeId} already processed. Skipping.`);
        await session.endSession();
        return res.json({ received: true });

      }


      await Wallet.findOneAndUpdate(
        { userId: userId },
        { $inc: { balance: tokenAmount } },
        { session }
    );

     await createTranscationforstripe([wallet.id,userId,stripeId,tokensToAdd,status="SUCCESS",type="STRIPE_DEPOSIT"],{ session })


     await session.commitTransaction();
     console.log(`✅ Successfully added ${tokenAmount} tokens to User ${userId}`);
      
    }
    res.json({received: true});
 }