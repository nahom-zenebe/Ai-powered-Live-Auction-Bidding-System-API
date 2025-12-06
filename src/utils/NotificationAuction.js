import Notification from "../models/Notification.model.js";
import  Transcation from "../models/Transaction.model.js"
import { getIo } from "../sockets/io.js";




export async function notifyAuctionActivation(auction) {
    const io=getIo();
    const  notificationNamespace = io.of("/notification");


    const saved=await Notification.create({
        user_id:auction.user_id,
        type: "auction",
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