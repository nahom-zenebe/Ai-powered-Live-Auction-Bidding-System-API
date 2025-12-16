
import Auction from "../models/Auction.model.js";
import Bid from '../models/Bid.model.js'

export async function calculatebidder_aggressivenes(bidder_id){

const findAuction = await Auction.find({ bids: bidder_id }).populate("bids", "bid_amount");
if(!findAuction){
  res.status(404).json("no auction is found")
}


let total = 0;
let count = 0;



findAuction.forEach(auction => {
    auction.bids.forEach(bid => {
      total += bid.bid_amount;
      count++;
    });
  });

const averageBid = count > 0 ? total / count : 0;
const maxTotalBids = await Bid.countDocuments({ user_id: userId }); 
const totalBids=findAuction.bids.length||0

// Simple normalized aggressiveness score
const maxBidAmount = findAuction.current_bid


const aggressiveness = (totalBids / maxTotalBids + averageBid / maxBidAmount) / 2;

await Auction.updateMany({ bidder_id }, { bidder_aggressiveness: aggressiveness });

}



export async function calculate_bidder_win_rate(userId) {
  try {
   
    const totalAuctions = await Auction.countDocuments({ bids: userId });

    if (!totalAuctions) {
      return { message: "No auctions found for this user", bidder_win_rate: 0 };
    }

    
    const totalWins = await Auction.countDocuments({ current_winner: userId, status: "ended" });

    
    const bidder_win_rate = totalWins / totalAuctions;

    
    await Bid.updateMany(
      { user_id: userId },      
      { $set: { bidder_win_rate } }  
    );
    return { bidder_win_rate, totalAuctions, totalWins };

  } catch (err) {
    console.error("Error calculating bidder win rate:", err);
    throw err;
  }
}