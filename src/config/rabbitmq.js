import amqp from "amqplib"


let connection;
let channel;


export async function  connectRabbit(){
    try{
        connection=await amqp.connect("amqp://localhost");
        channel=await connection.createChannel();
        console.log("RabiitMQ Connected.......")

    }
    catch(err) {
        console.error("RabbitMQ Connection Error:", err);
    }
}

export function getChannel() {
    return channel;
}