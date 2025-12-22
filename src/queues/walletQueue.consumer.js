import {getChannel} from '../config/rabbitmq.js'

const QUEUE="wallet_queue"



export async function startwalletConsumer(){
    const channel=getChannel;

    await channel.assertQueue(QUEUE,{durable:true})
    console.log("👷 Bid Worker listening for jobs...");


    await channel.prefetch(1);

   channel.consume(QUEUE,async(msg)=>{
    try{
        const job=JSON.parse(msg.content.toString())
        channel.ack(msg);
    }
    catch(error){
        console.error(" Bid job failed:", error);
        channel.nack(msg,false,false)
    }
   })


}