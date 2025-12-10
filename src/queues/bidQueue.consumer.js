import { getChannel } from "../rabbitmq/connection.js";
import { processBidService } from "../services/bid.service.js";


const QUEUE="bid_queue"


export async function startBidConsumer() {
    const channel = getChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    console.log("👷 Bid Worker listening for jobs...");

    channel.consume(QUEUE, async (msg) => {
        try {
          const job = JSON.parse(msg.content.toString());
    
          await processBidService(job);
          channel.ack(msg);
    
        } catch (error) {
          console.error(" Bid job failed:", error);
    
          
          channel.nack(msg, false, false);
        }
      });

}