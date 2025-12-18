import {AuctionFavoriteNotificaiton} from '../utils/NotificationAuction.js'
import Auction from '../models/Auction.model.js'
import cron from 'node-cron'


export async function AuctionNoifty(){

    cron.schedule("* * * *",async()=>{
        const now=new Date();
        const fiveMinutesFromNow=new Date(now.getTime()+5*60*1000);
    
        const auctionsEndingSoon = await Auction.find({
            end_time: { $gte: now, $lte: fiveMinutesFromNow },
        });
    
        for(const auction of auctionsEndingSoon){
            await AuctionFavoriteNotificaiton(auction);
        }
    
    })
}

