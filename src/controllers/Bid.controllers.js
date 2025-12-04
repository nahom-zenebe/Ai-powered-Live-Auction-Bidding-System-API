import Bid from "../models/Bid.model.js";
import CustomError from "../utils/CustomError.js";
import Auction from '../models/Auction.model.js';

// ===============================
// CREATE BID
// ===============================
export async function createBid(req, res, next) {
  try {
    const { auction_id, user_id, bid_amount } = req.body;
    const io=req.io
    if (!auction_id || !user_id || !bid_amount) {
      throw new CustomError("auction_id, user_id, and bid_amount are required", 400);
    }

    const Auctions=await Auction.findById(auction_id)
    if(Auctions.end_time<=Date.now()){
         throw new CustomError("the time has ended",400)
    }

    const bid = new Bid({
      auction_id,
      user_id,
      bid_amount,
    });



    await bid.save();

    if(bid_amount <= Auction.current_bid|| bid_amount < Auction.min_bid){
      throw new CustomError("Bid too low",400);
    }
    Auction.current_bid = bid_amount;
    Auction.current_winner =  user_id;
    Auction.bids=bid

    io.emit("new_bid",bid)

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
