import Notification from "../models/Notification.model.js";
import  Transcation from "../models/Transaction.model.js"
import { getIo } from "../sockets/io.js";

import { onlineUsers } from "./userTracker.js";


export async function notifyAuctionActivation(auction) {
    const io=getIo();
    const  notificationNamespace = io.of("/notification");


    const saved=await Notification.create({
        user_id:auction.seller_id,
        type: "NEW_AUCTION",
        auction_id:auction._id,
        title: auction.title,
        message: `Auction "${auction.title}" is now active!`
    })

    notificationNamespace.emit("auction_activated",{
        _id: saved._id,
       auctionId: auction._id,
       title: auction.title,
        message: saved.message,
       createdAt: saved.createdAt
    })
}

export async function sendNotificationToUser(io,userId,message){
    const socketId=onlineUsers.get(userId);

    if(!socketId){
        console.log(`User ${userId} not online — notification skipped`);
        return;
    }
    io.of("/notification").to(socketId).emit("notification",{
        message,
        time:new Date
    })
}
export async function TranscationNoficiation(transcation){
    const io=getIo();
    const transactionNamespace = io.of('/transaction');

    const savedtranscation=await Transcation.create({
        user_id:transcation.user_id,
        type: "Transcation",
        auction_id:"",
        title: ` "${transcation.amount}"$ have successfully transfer!`,
        message: ` "${transcation.status}"$ have been did!`
    })
    transactionNamespace.emit("transcation",{
        _id: savedtranscation._id,
        auctionId: savedtranscation._id,
        title: savedtranscation.title,
         message: savedtranscation.message,
        createdAt: savedtranscation.createdAt
    })
}


export async function BidNotification(bid){
    const io=getIo();
    const  notificationNamespace = io.of("/notification");


    const savednotificaiton=await Notification.create({
        user_id:bid.user_id,
        type: "Bid",
        auction_id:bid.auction._id,
        title: ` "${bid.amount}"$ have been did!`,
        message: ` "${bid.amount}"$ have been did!`
    })

    notificationNamespace.emit("Bid_send",{
        _id: savednotificaiton._id,
       auctionId: savednotificaiton._id,
       title: savednotificaiton.title,
        message: savednotificaiton.message,
       createdAt: savednotificaiton.createdAt
    })
}