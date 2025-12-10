import {getChannel} from '../config/rabbitmq.js'

const QUEUE="bid_queue"

export async function publishBidJob(data){
    const channel=getChannel();

    await channel.assertQueue(QUEUE,{durable:true})

    channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify(data)),{persistent:true})
    console.log("📩 Bid job pushed:", data);
}