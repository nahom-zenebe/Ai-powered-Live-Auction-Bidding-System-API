import {getChannel} from '../config/rabbitmq.js'

const QUEUE="notification_queue";



export async function startnotificationConsumer(){
    const channel=getChannel();


    await channel.assertQueue(QUEUE,{durable:true})

    channel.prefetch(1);

    console.log("👷 Bid Worker listening for jobs...");

    try{
        const job=JSON.parse(msg.content.toString());
     //TO do notification 
        channel.ack(msg)

    }

    catch(error){
        console.error(" Bid job failed:", error);
          channel.nack(msg, false, false);
    }
}