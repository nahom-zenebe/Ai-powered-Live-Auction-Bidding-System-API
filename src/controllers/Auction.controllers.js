import Auction from "../models/Auction.model.js";
import CustomError from "../utils/CustomError.js";

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

    skip = parseInt(skip, 10);
    limit = parseInt(limit, 10);

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


