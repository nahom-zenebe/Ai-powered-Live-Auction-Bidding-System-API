import { getChannel } from "../config/rabbitmq.js";
// import { processBidService } from "../service/";
import {calculatebidder_aggressivenes,calculate_bidder_win_rate} from '../service/Auction_metrics.js'

import { sendEmail} from '../utils/emailservice.js';
import {emailTemplates} from '../utils/emailTemplates.js'


const QUEUE="bid_queue";
const QUEUE_email="bid_queue_email";


export async function startBidConsumer() {
    const channel = getChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    
    channel.prefetch(1);

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

export async function sendemailtobiddersconsumer(){
  const channel=getChannel()

  await channel.assertQueue(QUEUE_email, { durable: true });
    console.log("👷 Bid Worker listening for jobs...");
   //assing one task for the queue channel
    await channel.prefetch(1);

    channel.consume(QUEUE_email,async(msg)=>{
      try{
        const job = JSON.parse(msg.content.toString());
        const { templateType, email, data } = job;

        let template;

        if (templateType === 'bidWinner') {
          template = emailTemplates.bidWinner(data.userName, data.auctionName, data.bidAmount);
      } else if (templateType === 'bidLoser') {
          template = emailTemplates.bidLoser(data.userName, data.auctionName, data.bidAmount);
      }

      if (template) {
        await sendEmail(
            email,
            template.subject,
            template.html,
            template.text
        );
        console.log(`📧 Email sent to ${email} for ${templateType}`);
    }

    channel.ack(msg);

      }
      catch(error){
        console.error(" Bid job failed:", error);
          channel.nack(msg, false, false);

      }
    })



}