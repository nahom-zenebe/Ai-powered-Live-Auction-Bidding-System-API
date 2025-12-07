import Bid from "../models/Bid.model.js";
import CustomError from "../utils/CustomError.js";
import Auction from '../models/Auction.model.js';
import Notification from '../models/Notification.model.js'
import {BidNotification} from '../utils/NotificationAuction.js'
import { createTransactionService } from "../services/transaction.service.js";


import { getIo } from "../sockets/io.js";
// ===============================
// CREATE BID
// ===============================
export async function createBid(req, res, next) {
  try {
    const { user_id, bid_amount } = req.body;
    const { auction_id}=req.params;

    const {limit}=req.query
    limit=parseInt(limit||20)
    const io=getIo()
    const BidNamespace = io.of('/Bid');

   const userAcccount=await Transcation.findById( user_id);

   if(!userAcccount){
   throw new CustomError("User Acccount is not found ")
   }

    const auction = await Auction.findById(auction_id);
    if (!auction) {
      throw new CustomError( "Auction not found" ,404);

    }
    
    if (!auction_id || !user_id || !bid_amount) {
      throw new CustomError("auction_id, user_id, and bid_amount are required", 400);
    }

    

    const Auctions=await Auction.findById(auction_id)
    if(Auctions.end_time<=Date.now()){
         throw new CustomError("the time has ended",400)
    }

    if(userAcccount.balance+0.01< bid_amount){
      throw new CustomError("your balance is not enough",500)
    }

    const newTransaction=await createTransactionService({
      user_id,
      amount:bid_amount,
      transaction_type:"BID_PAYMENT",
      status:"COMPLETED"
    })
    newTransaction.balance-=bid_amount

    await newTransaction.save()

    const bid = new Bid({
      auction_id,
      user_id,
      bid_amount,
    });


    const updatedLeaderBoard=await Bid.find(auction_id).sort({ bid_amount: -1 })
    .limit(limit);



    await bid.save();

    if(bid_amount <= Auction.current_bid|| bid_amount < Auction.min_bid){
      throw new CustomError("Bid too low",400);
    }
    Auction.current_bid = bid_amount;
    Auction.current_winner =  user_id;
    Auction.bids=bid

    BidNamespace.emit("new_bid",bid)
    BidNotification(bid)
    BidNamespace.emit("bid_leaderboard",{
      auctionId: auction_id,
      leader:updatedLeaderBoard
    })

    res.status(201).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    next(error);
  }
}



// ===============================
// GET ALL BIDS (WITH OPTIONAL FILTERS)
// ===============================
export async function getAllBids(req, res, next) {
  try {
    const { auction_id, user_id } = req.query;

    const filter = {};

    if (auction_id) filter.auction_id = auction_id;
    if (user_id) filter.user_id = user_id;

    const bids = await Bid.find(filter)
      .populate("auction_id")
      .populate("user_id");

    res.status(200).json({
      success: true,
      count: bids.length,
      data: bids,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// GET SINGLE BID
// ===============================
export async function getSingleBid(req, res, next) {
  try {
    const { bidId } = req.params;

    if (!bidId) {
      throw new CustomError("Bid ID is required", 400);
    }

    const bid = await Bid.findById(bidId)
      .populate("auction_id")
      .populate("user_id");

    if (!bid) {
      throw new CustomError("Bid not found", 404);
    }

    res.status(200).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// UPDATE BID
// ===============================
export async function updateBid(req, res, next) {
  try {
    const { bidId } = req.params;

    if (!bidId) {
      throw new CustomError("Bid ID is required", 400);
    }

    const updatedBid = await Bid.findByIdAndUpdate(bidId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBid) {
      throw new CustomError("Bid not found", 404);
    }

    res.status(200).json({
      success: true,
      data: updatedBid,
    });
  } catch (error) {
    next(error);
  }
}


export async function LeaderBoard(req, res, next) {
  try {
    let { limit } = req.query;
    const { AuctionId } = req.params;

    limit = parseInt(limit) || 20;

    if (!AuctionId) {
      throw new CustomError("AuctionId is required", 400);
    }

    // Fetch top bids for this auction
    const topBids = await Bid.find({ auctionId: AuctionId })
      .sort({ bid_amount: -1 })
      .limit(limit);

    if (!topBids || topBids.length === 0) {
      throw new CustomError("No bids found for this auction", 404);
    }

    res.status(200).json({
      success: true,
      leaderboard: topBids
    });

  } catch (error) {
    next(error);
  }
}


// ===============================
// DELETE BID
// ===============================
export async function deleteBid(req, res, next) {
  try {
    const { bidId } = req.params;

    if (!bidId) {
      throw new CustomError("Bid ID is required", 400);
    }

    const deletedBid = await Bid.findByIdAndDelete(bidId);

    if (!deletedBid) {
      throw new CustomError("Bid not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Bid deleted successfully",
      data: deletedBid,
    });
  } catch (error) {
    next(error);
  }
}
