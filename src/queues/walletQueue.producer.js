import {getChannel} from '../config/rabbitmq.js'

const QUEUE="wallet_queue"



export async function publishdata(data){
   try{

    const channel=getChannel()

    channel.asert(QUEUE,{durable:true})

    channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify(data)))
    console.log("📩 Bid job pushed:", data);
   }
   catch(error){
  console.log("error in create wallet producer",error)
   }
}
