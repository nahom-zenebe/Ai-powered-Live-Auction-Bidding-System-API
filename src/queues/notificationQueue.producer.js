import {getChannel} from '../config/rabbitmq.js'


const QUEUE="notification_queue"



export async function publishNotificationJob(data){
    const channel=getChannel();

    await channel.assertQueue(QUEUE,{durable:true})

    channel.sendToQueue(QUEUE,Buffer.from(JSON>stringiify(data)))
    console.log("📩 Bid job pushed:", data);
}