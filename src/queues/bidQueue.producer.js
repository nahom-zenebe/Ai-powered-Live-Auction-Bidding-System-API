import {getChannel} from '../config/rabbitmq.js'

const QUEUE="bid_queue"
const QUEUE_email="bid_queue_email"

export async function publishBidJob(data){
    const channel=getChannel();

    await channel.assertQueue(QUEUE,{durable:true})

    channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify(data)),{persistent:true})
    console.log("📩 Bid job pushed:", data);
}


export async function sendemailtobidders(data){
    const channel=getChannel();


    await channel.assertQueue(QUEUE_email,{durable:true})

    channel.sendToQueue(QUEUE_email,Buffer.from(JSON.stringify(data),{persistent:true}))
    console.log("📩 Bid job pushed:", data)
}