
import Auction from '../controllers/Auction.controllers'
import Bid from '../controllers/Bid.controllers'

export async function calculatebidder_aggressivenes(bidder_id){

const findAuction = await Auction.find({ bids: bidder_id }).populate("bids", "bid_amount");


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