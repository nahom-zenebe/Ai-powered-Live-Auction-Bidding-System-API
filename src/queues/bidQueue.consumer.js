import { getChannel } from "../config/rabbitmq.js";
// import { processBidService } from "../service/";
import {calculatebidder_aggressivenes,calculate_bidder_win_rate} from '../service/Auction_metrics.js'

const QUEUE="bid_queue"


export async function startBidConsumer() {
    const channel = getChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    console.log("👷 Bid Worker listening for jobs...");

    channel.consume(QUEUE, async (msg) => {
        try {
          const job = JSON.parse(msg.content.toString());
       
          // 2 Recalculate bidder win rate
        await calculate_bidder_win_rate(job.user_id);

       //updating the user aggregation
        await calculatebidder_aggressivenes(job.user_id)
       
          channel.ack(msg);
    
        } catch (error) {
          console.error(" Bid job failed:", error);
    
          
          channel.nack(msg, false, false);
        }
      });

}