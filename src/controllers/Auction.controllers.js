import Auction from "../models/Auction.model.js";
import CustomError from "../utils/CustomError.js";
import User from '../models/user.model.js';
import { startAuctionCountdown, addAuctionToCountdown } from "../utils/auctionCountdown.js";
import {notifyAuctionActivation} from '../utils/NotificationAuction.js'
import { getIo } from "../sockets/io.js";
// ===============================
// CREATE AUCTION
// ===============================
export async function CreateAuction(req, res, next) {
  try {
    const {
      title,
      description,
      start_time,
      end_time,
      images,
      seller_id,
      bids,
      min_bid,
      current_bid,
      category_id,
      status,
      current_winner
    } = req.body;

    const io=getIo()
    const auctionNamespace = io.of("/auction");
  
    if (!title || !description || !start_time || !end_time || !category_id) {
      throw new CustomError("Required fields cannot be empty", 400);
    }

    // Create Auction
    const newAuction = new Auction({
      title,
      description,
      start_time,
      end_time,
      images,
      seller_id,
      bids,
      min_bid,
      current_bid,
      category_id,
      status,
      current_winner,
    });

    await newAuction.save();

    
     addAuctionToCountdown(newAuction)

    auctionNamespace.emit("send-auction",newAuction)

    await  notifyAuctionActivation(newAuction);




    res.status(201).json({
      success: true,
      data: newAuction,
    });

  } catch (error) {
    next(error);
  }
}

// ===============================
// GET ALL AUCTIONS (Pagination)
// ===============================
export async function getAllAuction(req, res, next) {
  try {
    let { skip = 0, limit = 20 } = req.query;

    skip = parseInt(skip, 20);
    limit = parseInt(limit, 20);

    if (isNaN(skip) || isNaN(limit)) {
      return next(new CustomError("skip and limit must be numbers", 400));
    }

    const auctions = await Auction.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      count: auctions.length,
      data: auctions,
    });

  } catch (err) {
    next(err);
  }
}

export async function activateAuction(req,res){
  const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }
    const auction = await Auction.findById(AuctionId);

    auction.status="active";

    await auction.save();

    await  notifyAuctionActivation(auction);


    res.status(200).json(auction)
 
 
}
// ===============================
// GET SINGLE AUCTION
// ===============================
export async function getSingleAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const singleAuction = await Auction.findById(AuctionId);

    if (!singleAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: singleAuction,
    });

  } catch (err) {
    next(err);
  }
}

export async function getAuctionByStatus(req,res,next){
  try{
    const {status}=req.query;
    if(!status){
      throw("no status is found",400)
    }

    const auctions = await Auction.find({ status });

    if(! auctions){
      throw("no Auction is found",400)
    }
    res.status(200).json(auctions)

  }
  catch(error){
    next(error)
  }
}

export async function  VerifyAuction(req,res,next){
  try{
    const {userId,AuctionId}=req.params;

    if(!userId||!AuctionId){
      throw new CustomError("no userId is found",404);
    }
    const user=await User.findById(userId)
    const auction=await Auction.findById(AuctionId)

    if(!user||!auction){
      throw new CustomError("no user is found",404);
    }
    if(user.isVerified=false){
      throw new CustomError("please verify to realse your auction",404);
    }
    if(user.isVerified=true){
      auction.is_verified=true

      res.status(200).json("Auction Authenticated Successfully");


    }

  }
  catch(error){
    next(error)

  }
}


export async function  statsauction(req,res,next){
  try{
    cons 

  }
  catch(error){
    next(error)
  }

}

// ===============================
// UPDATE AUCTION
// ===============================
export async function UpdateAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const updatedAuction = await Auction.findByIdAndUpdate(
      AuctionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      data: updatedAuction,
    });

  } catch (err) {
    next(err);
  }
}

// ===============================
// DELETE AUCTION
// ===============================
export async function DeleteAuction(req, res, next) {
  try {
    const { AuctionId } = req.params;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    const deletedAuction = await Auction.findByIdAndDelete(AuctionId);

    if (!deletedAuction) {
      throw new CustomError("Auction not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
      data: deletedAuction,
    });

  } catch (err) {
    next(err);
  }
}



export async function RatingAuction(req,res,next){
  try{
  const {rating}=req.body;
  const {AuctionId,userId}=req.params;
  

  if(!AuctionId||!rating||!userId){
    throw new CustomError("no AuctionId or Rating",404);
  }
  
  
  const auction=await Auction.findById(AuctionId)

  if(!auction){
    throw new CustomError("no Auction is available",404);
  }
   
  if(auction.rating.has(userId)){
    auction.rating.delete(userId);
  }
  auction.rating.set(userId,rating)
  

  auction.save();


  res.status(200).json("rating successful")

  }
  catch(error){
    next(error)

  }
}
