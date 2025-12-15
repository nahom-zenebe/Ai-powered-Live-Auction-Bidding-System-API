import mongoose from 'mongoose'



const BidSchema=mongoose.Schema({
    auction_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auction"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bid_amount:{
        type: Number,
        required: true,
        min: 0,
        
    },
    bidder_win_rate:{type:Number},
    bidder_aggressiveness: { type: Number, default: 0 },
    bid:{
        type:Date,
        default:Date.now()
    }
})


const Bid=mongoose.model("Bid",BidSchema)

export default Bid