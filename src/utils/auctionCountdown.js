import Auction from '../models/Auction.model.js'

//mapping the auctionId=>endTime
const liveAuctions=new Map();



export const addAuctionToCountdown=(auction)=>{
    liveAuctions.set(auction._id.toString(),new Date(auction.end_time))
}


export const startAuctionCountdown=(io)=>{
    setInterval(async()=>{
        const current_time=new Date();

        for(const[auctionId,endTime] of liveAuctions.entries()){
            const timeLeft=Math.max(0,endTime-current_time);

            io.of('/auction').emit("auction_timer_update", { auctionId, timeLeft });

            if(timeLeft<=0){
                await Auction.findByIdAndUpdate(auctionId, { status: "ended" });

                io.of('/auction').emit("auction_ended", { auctionId });

                liveAuctions.delete(auctionId)
            }


        }
    },1000)
}

