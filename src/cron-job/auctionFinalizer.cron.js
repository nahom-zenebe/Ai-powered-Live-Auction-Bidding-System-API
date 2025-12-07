import Auction from "../models/Auction.model.js";
import Bid from "../models/Bid.model.js";
import WalletService from "../services/wallet.service.js";
import { createTransactionService } from "../services/transaction.service.js";
import { schedule } from "./scheduler.js";




export async function FinilizeAuction(){
    schedule("*/1 * * * *", async () => {
        const now = new Date();



        const endedAuction=await Auction.find({
            status:"active",
            end_time:{$lte:now}
        })


        for (const auction in endedAuction ){

            try{

                auction.status = "processing";
                await auction.save();

                let WinnerId;
                let WinnerAmount;
            
                if (auction.current_winner) {
                    WinnerId=auction._id


                    const userbid=await Bid.find({auction_id:auction._id})
                    WinnerAmount=userbid.bid_amount


                }
                //fallback logic if the highest bid from the auciton is not get
                else{
                    const highestBid=await Bid.findOne({ auctionId: auction._id }).sort({amount:-1})

                    if (!highestBid) {
                        auction.status = "no_bids";
                        await auction.save();
                        continue;
                      }

                      WinnerId = highestBid.user_id;
                      WinnerAmount = highestBid.amount;
                }

                //Todo
                await WalletService.debit(WinnerId,WinnerAmount)


                await createTransactionService({
                    user_id:  WinnerId,
                    transaction_type: "AUCTION_WIN_PAYMENT",
                    amount: WinnerAmount,
                    status:"COMPLETED",
                    metadata: { auctionId: auction._id }
                })

                //Refund loser
                const LossBider=await Bid.find({
                    auction_id:auction._id,
                    user_id:{$ne: WinnerId}
            })

            for(const bids of LossBider){
                //Todo
                await WalletService.credit(bids.user_id,bids.amount)
                await createTransactionService({
                    user_id:  bids.user_id,
                    transaction_type: "REFUND",
                    amount: bids.amount,
                    status:"COMPLETED",
                    metadata: { bidsId: bids._id }
                })
            }


            auction.status="ended"
            auction.current_winner =winnerId;
            auction.current_bid=WinnerAmount; 
            await auction.save();



            }
            
            catch(error){
                console.error("Auction finalization error:", err);
            }
        }


    }
)
}